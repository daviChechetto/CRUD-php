(() => {
	window.CONFIG = {
		apiUrl: 'http://localhost/crud/backend/',
		navegacao: [
			{ titulo: 'Início', href: '/', icone: 'home' },
			{ titulo: 'Páginas', href: '/paginas', icone: 'auto_stories' },
			{ titulo: 'Usuários', href: '/lista-de-usuarios', icone: 'person' },
		]
	};

	const UI = {
		body: document.body,
		listaNavegacao: document.querySelector('.lista-navegacao'),
		containerDoPerfil: document.getElementById('ligacaoPerfilUsuario'),
	};

	/**
	 * Módulo de Utilitários Globais (Expostos para toda a aplicação)
	 */
	window.UtilitariosGlobais = {
		obterParametroConsulta: (parametro) => {
			return new URLSearchParams(window.location.search).get(parametro);
		},

		/**
		 * Converte um texto ou nome em um slug amigável para URL.
		 * Exemplo: "Davi Westphal" -> "davi-westphal"
		 */
		gerarSlug: (texto) => {
			if (!texto) return '';
			return texto
				.toString()
				.toLowerCase()
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '') // remove acentuação
				.replace(/[^a-z0-9]+/g, '-')     // caracteres especiais viram hífen
				.replace(/^-+|-+$/g, '');        // remove hífens das extremidades
		},

		/**
		 * Obtém o identificador (slug ou ID) da URL.
		 * Funciona tanto em rotas amigáveis (/visualizar-usuario/davi-westphal)
		 * quanto em query params (?id=1 ou ?slug=...)
		 */
		obterIdentificadorUrl: () => {
			const partes = window.location.pathname.split('/').filter(Boolean);
			const ultimo = partes[partes.length - 1];
			const rotasBase = ['visualizar-usuario', 'editar-usuario', 'view.html', 'edit.html'];

			
			if (ultimo && !rotasBase.includes(ultimo)) {
				return decodeURIComponent(ultimo);
			}

			const params = new URLSearchParams(window.location.search);
			return params.get('id') || params.get('user') || params.get('slug');
		},

		mostrarMensagem: (texto, tipo) => {
			const mensagem = document.createElement('div');
			mensagem.className = `mensagem ${tipo}`;
			mensagem.textContent = texto;

			// Estado inicial para animação nativa
			mensagem.style.opacity = '0';
			mensagem.style.transition = 'opacity 0.3s ease';

			document.body.prepend(mensagem);

			// Fade in
			requestAnimationFrame(() => mensagem.style.opacity = '1');

			// Fade out e remoção após 4 segundos
			setTimeout(() => {
				mensagem.style.opacity = '0';
				setTimeout(() => mensagem.remove(), 300);
			}, 4000);
		}
	};

	/**
	 * Módulo do Cursor Personalizado (Otimizado para 60fps)
	 */
	const CursorPersonalizado = (() => {
		let perseguidor = null;
		let mouseX = 0, mouseY = 0;
		let cursorAtivo = false;

		const renderizarCursor = () => {
			if (perseguidor) {
				perseguidor.style.transform = `translate(${mouseX - 9}px, ${mouseY - 9}px)`;
			}
			if (cursorAtivo) requestAnimationFrame(renderizarCursor);
		};

		return {
			inicializar: () => {
				UI.body.insertAdjacentHTML('beforeend', '<div id="perseguidor"><div class="circulo"></div></div>');
				perseguidor = document.getElementById("perseguidor");
				cursorAtivo = true;

				// Atualiza as coordenadas sem forçar a renderização imediata do DOM
				window.addEventListener('mousemove', (e) => {
					mouseX = e.clientX;
					mouseY = e.clientY;
				}, { passive: true });

				requestAnimationFrame(renderizarCursor);

				// Delegação de Eventos: Verifica hovers interativos sem sobrecarregar a memória
				document.addEventListener('mouseover', (e) => {
					if (e.target.closest('a, button, input')) perseguidor.classList.add('esconder');
				});

				document.addEventListener('mouseout', (e) => {
					if (e.target.closest('a, button, input')) perseguidor.classList.remove('esconder');
				});

				// Eventos de clique
				document.addEventListener('mousedown', (e) => {
					if (e.button === 0) perseguidor.classList.add('esconder');
				});

				document.addEventListener('mouseup', (e) => {
					if (e.button === 0) perseguidor.classList.remove('esconder');
				});
			}
		};
	})();

	/**
	 * Módulo de Navegação e Roteamento Visual
	 */
	const GerenciadorNavegacao = (() => {
		const construirMenu = () => {
			if (!UI.listaNavegacao || UI.listaNavegacao.children.length > 0) return;

			const htmlNavegacao = window.CONFIG.navegacao.map(link => `
				<li>
					<a href="${link.href}">
						<span class="material-symbols-rounded">${link.icone}</span>
						<h3>${link.titulo}</h3>
					</a>
				</li>
			`).join('');

			UI.listaNavegacao.innerHTML = htmlNavegacao;
		};

		const atualizarLinkAtivo = () => {
			if (!UI.listaNavegacao) return;

			const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
			const paginaAtual = pathname.split('/').pop() || 'home';

			// Dicionário limpo de rotas alternativas (aliases)
			const rotasAlternativas = {
				'lista-de-usuarios': ['lista-usuarios', 'index.html'],
				'paginas': ['pages.html', 'pages']
			};

			const links = UI.listaNavegacao.querySelectorAll('a');

			links.forEach(link => {
				const linkHref = link.getAttribute('href');
				const normalizado = linkHref.replace(/\/+$/, '') || '/';
				const linkBase = normalizado.split('/').pop();

				const ehRotaRaiz = (pathname === '/' || pathname === '/home') && linkHref === '/';
				const ehRotaExata = pathname === normalizado;
				const ehMesmaPagina = paginaAtual === linkBase;

				let ehAlias = false;
				if (rotasAlternativas[linkBase]?.includes(paginaAtual)) ehAlias = true;
				if (rotasAlternativas[paginaAtual]?.includes(linkBase)) ehAlias = true;

				if (ehRotaRaiz || ehRotaExata || ehMesmaPagina || ehAlias) {
					link.parentElement.classList.add('link-selecionado');
				} else {
					link.parentElement.classList.remove('link-selecionado');
				}
			});
		};

		return {
			inicializar: () => {
				construirMenu();
				atualizarLinkAtivo();
			}
		};
	})();

	/**
	 * Módulo de Autenticação e Perfil de Utilizador
	 */
	const Autenticacao = (() => {
		return {
			inicializar: () => {
				const usuarioSalvo = localStorage.getItem('usuarioLogado');
				if (!usuarioSalvo || !UI.containerDoPerfil) return;

				try {
					const dadosUsuario = JSON.parse(usuarioSalvo);

					if (dadosUsuario?.name) {
						const primeiraLetra = dadosUsuario.name.charAt(0).toUpperCase();

						UI.containerDoPerfil.innerHTML = `<div id="avatarLogado" class="avatar">${primeiraLetra}</div>`;
						UI.containerDoPerfil.href = '/visualizar-usuario/' + (dadosUsuario.slug || dadosUsuario.id);

						// Fade In com Vanilla JS
						UI.containerDoPerfil.style.opacity = '0';
						UI.containerDoPerfil.style.display = 'block';

						requestAnimationFrame(() => {
							UI.containerDoPerfil.style.transition = 'opacity 0.4s ease';
							UI.containerDoPerfil.style.opacity = '1';
						});
					}
				} catch (erro) {
					console.error("Falha ao analisar dados do utilizador autenticado:", erro);
				}
			}
		};
	})();

	/**
	 * Orquestrador de Inicialização
	 */
	document.addEventListener("DOMContentLoaded", () => {
		CursorPersonalizado.inicializar();
		GerenciadorNavegacao.inicializar();
		Autenticacao.inicializar();
	});

})();