$(document).ready(function () {

	const UI = {
		elementoCanvas: document.getElementById('construtorCanva'),

		$elementoCanvas: $('#construtorCanva'),
		$botaoAdicionarElemento: $('.botao-adicionar-bloco'),
		$botaoSalvarPagina: $('#botaoSalvarPagina'),
		$inputTituloPagina: $('#pageTitle'),

		$nomeDaPagina: $('#nomeDaPagina'),

		$botaoVerPrevia: $('#botaoVerPrevia'),
		$modalPrevia: $('#modalPrevia'),
		$areaDeRenderizacao: $('#areaDeRenderizacao'),
		$botaoFecharPrevia: $('#botaoFecharPrevia'),
	}


	// INICIALIZAR O SORTABLE JS
	// O Sortable precisa do elemento nativo do DOM (por isso usamos document.getElementById)
	new Sortable(UI.elementoCanvas, {
		animation: 150, // Milissegundos de animação ao trocar de lugar
		handle: '.drag-handle', // OBRIGATÓRIO: O usuário só consegue arrastar se clicar na "alça"
		ghostClass: 'sortable-ghost', // Classe aplicada ao elemento que está sendo arrastado
	});


	// TEMPLATES DE BLOCOS
	// Essa função devolve o HTML do bloco dependendo de qual botão foi clicado
	function gerarTemplateDoBloco(tipo) {
		let conteudoHTML = '';
		const id = Date.now() + Math.floor(Math.random() * 1000); // ID único para amarrar Label/Input

		if (tipo === 'titulo-1' || tipo === 'titulo-2' || tipo === 'titulo-3') {
			const labelTexto = tipo === 'titulo-1' ? 'Título Principal' : (tipo === 'titulo-2' ? 'Título Secundário' : 'Título Terciário');
			conteudoHTML = `
				<div class="form-group">
					<input type="text" id="${tipo}${id}" class="campo-texto input-conteudo" required>
					<label for="${tipo}${id}" class="user-label">${labelTexto}</label>
				</div>`;
		} else if (tipo === 'paragrafo' || tipo === 'aviso') {
			const labelTexto = tipo === 'paragrafo' ? 'Parágrafo' : 'Aviso';
			conteudoHTML = `
				<div class="form-group">
					<textarea id="${tipo}${id}" class="campo-texto input-conteudo" rows="4" required></textarea>
					<label for="${tipo}${id}" class="user-label">${labelTexto}</label>
				</div>`;
		} else if (tipo === 'lista' || tipo === 'passo-a-passo' || tipo === 'anexos') {
			const labelTexto = tipo === 'lista' ? 'Lista' : (tipo === 'passo-a-passo' ? 'Passo a Passo' : 'Anexos');
			conteudoHTML = `
				<div class="form-group">
					<textarea id="${tipo}${id}" class="campo-texto input-conteudo" rows="4" required></textarea>
					<label for="${tipo}${id}" class="user-label">${labelTexto}</label>
					<small class="texto-dica">Coloque um item por linha</small>
				</div>`;
		} else if (tipo === 'imagem' || tipo === 'banner') {
			const labelTexto = tipo === 'imagem' ? 'uma imagem' : 'um banner';
			conteudoHTML = `
				<div class="upload-group">
					<label for="arquivoInput${id}" class="custum-file-upload">
						<div class="icon">
							<svg viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" fill=""></path></svg>
						</div>
						<div class="text">
							<span>Clique para carregar ${labelTexto}</span>
						</div>
						<img id="previewImage${id}" class="preview-image" src="" alt="Miniatura da imagem">
						<input id="arquivoInput${id}" class="input-arquivo" type="file" accept="image/*" onchange="carregarMiniatura(event, '${id}')">
					</label>
				</div>
				<div class="form-group">
					<input type="text" id="alt${id}" class="campo-texto input-alt" required>
					<label for="alt${id}" class="user-label">Texto alternativo (Acessibilidade)</label>
				</div>`;
		}

		return `
			<div class="bloco-item" data-type="${tipo}">
				<div class="bloco-cabecalho">
					<div>
						<span class="material-symbols-rounded drag-handle">drag_indicator</span>
						<strong style="text-transform: uppercase; font-size: 0.9em; color: var(--text-color);">${tipo.replace(/-/g, ' ')}</strong>
					</div>
					<button aria-label="Delete item" class="botao-excluir">
						<svg class="trash-svg" viewBox="0 -10 64 74" xmlns="http://www.w3.org/2000/svg">
							<g id="trash-can">
							<rect x="16" y="24" width="32" height="30" rx="3" ry="3" fill="#f1f1f1"></rect>

							<g transform-origin="12 18" id="lid-group">
								<rect x="12" y="12" width="40" height="6" rx="2" ry="2" fill="#ffffff"></rect>
								<rect x="26" y="8" width="12" height="4" rx="2" ry="2" fill="#e7e7e7"></rect>
							</g>
							</g>
						</svg>
					</button>
				</div>
				<div class="bloco-item-conteudo">
					${conteudoHTML}
				</div>
			</div>
		`;
	}

	// ADICIONAR BLOCOS NA TELA
	UI.$botaoAdicionarElemento.on('click', function () {
		const tipo = $(this).data('type'); // Pega se é paragrafo, imagem ou lista
		const htmlDoBloco = gerarTemplateDoBloco(tipo);

		// Remove a mensagem de "Quadro Vazio" se ela ainda estiver lá
		UI.$elementoCanvas.find('.campo-vazio').remove();

		// Injeta o bloco no final do quadro
		UI.$elementoCanvas.append(htmlDoBloco);
	});

	// REMOVER BLOCOS
	UI.$elementoCanvas.on('click', '.botao-excluir', function () {
		if (confirm('Tem certeza que deseja remover este bloco?')) {
			$(this).closest('.bloco-item').remove(); // Apaga a div inteira do bloco

			// Se o quadro ficar vazio de novo, devolve a mensagem inicial
			if (UI.$elementoCanvas.children('.bloco-item').length === 0) {
				UI.$elementoCanvas.html(`
					<div class="campo-vazio">
						<p>Clique em um bloco ao lado para começar a construir sua página.</p>
					</div>
				`);
			}
		}
	});

	// ENVIAR DADOS PARA O BACKEND (FORM DATA)
	UI.$botaoSalvarPagina.on('click', function (e) {
		e.preventDefault();

		const tituloPagina = UI.$inputTituloPagina.val().trim();
		if (!tituloPagina) {
			alert('Por favor, preencha o título da página.');
			UI.$inputTituloPagina.focus();
			return;
		}

		const $blocos = UI.$elementoCanvas.children('.bloco-item');
		if ($blocos.length === 0) {
			alert('Adicione pelo menos um bloco antes de salvar.');
			return;
		}

		// Cria o container do FormData especializado em lidar com arquivos físicos
		let formData = new FormData();

		// Dados da tabela 'pages'
		formData.append('title', tituloPagina);
		formData.append('status', 'rascunho'); // Valor provisório fixado conforme combinado

		// Percorre os blocos na ordem exata em que estão renderizados na tela
		$blocos.each(function (index, elemento) {
			const $bloco = $(elemento);
			const tipo = $bloco.data('type');
			const sortOrder = index + 1; // Posição atual baseada na árvore do HTML

			// Monta a estrutura da associação 'page_blocks' que o CakePHP espera receber
			formData.append(`page_blocks[${index}][tipo]`, tipo);
			formData.append(`page_blocks[${index}][sort_order]`, sortOrder);

			if (tipo === 'imagem' || tipo === 'banner') {
				const inputArquivo = $bloco.find('.input-arquivo')[0];
				const altText = $bloco.find('.input-alt').val().trim();

				// Anexa o arquivo físico da imagem/banner se ele existir
				if (inputArquivo && inputArquivo.files.length > 0) {
					formData.append(`page_blocks[${index}][uploaded_file]`, inputArquivo.files[0]);
				}
				// Anexa o texto alternativo de acessibilidade
				formData.append(`page_blocks[${index}][alt_text]`, altText);
			} else {
				// Para blocos normais de texto, pega o valor digitado no campo
				const textoConteudo = $bloco.find('.input-conteudo').val();
				formData.append(`page_blocks[${index}][conteudo]`, textoConteudo);
			}
		});

		// Dispara a requisição AJAX para salvar tudo em cascata
		$.ajax({
			url: CONFIG.apiUrl + 'pages/add',
			type: 'POST',
			data: formData,
			processData: false, // OBRIGATÓRIO para FormData: impede o jQuery de converter o objeto em string
			contentType: false, // OBRIGATÓRIO para FormData: diz ao servidor que vai um arquivo multipart/form-data
			success: function (response) {
				if (response.status === 'sucesso') {
					alert('Página e blocos salvos com sucesso!');
					// Opcional: redirecionar ou limpar o construtor aqui
				} else {
					console.log("Resposta Completa do Servidor:", response);
					alert('Erro: ' + response.errors);
				}
			},
			error: function () {
				alert('Erro crítico de comunicação com o servidor backend.');
			}
		});
	});

	UI.$botaoVerPrevia.on('click', function () {
		UI.$areaDeRenderizacao.empty(); // Limpa a prévia anterior

		// 1. Pega o Título Principal da Página
		const tituloPagina = UI.$inputTituloPagina.val() || 'Sem Título';
		UI.$nomeDaPagina.text(`Prévia da Página: ${tituloPagina}`);

		// 2. Percorre todos os blocos do construtor
		UI.$elementoCanvas.children('.bloco-item').each(function () {
			const $bloco = $(this);
			const tipo = $bloco.data('type');

			if (tipo.startsWith('titulo-')) {
				const nivel = tipo.split('-')[1]; // Pega o número 1, 2 ou 3

				if (nivel == 1) {
					nomeClasse = "principal";
				} else if (nivel == 2) {
					nomeClasse = "secundario";
				} else {
					nomeClasse = "terciario";
				}
				const texto = $bloco.find('.input-conteudo').val() || '[ espaço reservado para título ]';
				UI.$areaDeRenderizacao.append(`<h${parseInt(nivel) + 1} class="titulo-${nomeClasse}">${texto}</h${parseInt(nivel) + 1}>`);

			} else if (tipo === 'paragrafo' || tipo === 'aviso') {
				const texto = $bloco.find('.input-conteudo').val() || '[ espaço reservado para parágrafo ]';
				// Troca quebras de linha reais por <br> no HTML
				const textoFormatado = texto.replace(/\n/g, '<br>');

				if (tipo === 'aviso') {
					UI.$areaDeRenderizacao.append(`<div class="aviso-atencao"><p>${textoFormatado}</p></div>`);
				} else {
					UI.$areaDeRenderizacao.append(`<p class="paragrafo">${textoFormatado}</p>`);
				}

			} else if (tipo === 'lista' || tipo === 'passo-a-passo' || tipo === 'anexos') {
				const texto = $bloco.find('.input-conteudo').val() || '[ espaço reservado para lista ]';
				const itens = texto.split('\n').filter(item => item.trim() !== '');

				if (itens.length > 0) {
					const tagLista = tipo === 'passo-a-passo' ? 'ol' : 'ul';
					let htmlLista = `<${tagLista} class="${tipo === 'anexos' ? 'lista-anexos' : 'lista'}">`;
					itens.forEach(item => { htmlLista += `<li>${item}</li>`; });
					htmlLista += `</${tagLista}>`;
					UI.$areaDeRenderizacao.append(htmlLista);
				}

			} else if (tipo === 'imagem' || tipo === 'banner') {
				const inputArquivo = $bloco.find('.input-arquivo')[0];
				const altText = $bloco.find('.input-alt').val() || 'Imagem sem descrição';

				if (inputArquivo && inputArquivo.files.length > 0) {
					// MÁGICA: Renderiza a imagem localmente antes de enviar pro servidor
					const urlImagem = URL.createObjectURL(inputArquivo.files[0]);
					UI.$areaDeRenderizacao.append(`<img src="${urlImagem}" alt="${altText}" class="imagem">`);
				} else {
					UI.$areaDeRenderizacao.append(`<div class="banner">[ Espaço reservado para ${tipo} ]</div>`);
				}
			}
		});

		// Mostra o Modal com um efeito de Fade
		UI.$modalPrevia.fadeIn(200);
	});

	// Fechar o Modal
	UI.$botaoFecharPrevia.on('click', function () {
		UI.$modalPrevia.fadeOut(200);
	});
});


function carregarMiniatura(event, id) {
	const input = event.target;

	// Verifica se o usuário selecionou algum arquivo
	if (input.files && input.files[0]) {
		const file = input.files[0];

		// Cria uma URL temporária para a imagem na memória do navegador
		const imageURL = URL.createObjectURL(file);

		// Captura os elementos do DOM usando o ID dinâmico
		const imgElement = document.getElementById(`previewImage${id}`);
		const $contentElement = $(`#arquivoInput${id}`).parent();

		// Aplica a URL na tag img e a torna visível
		imgElement.src = imageURL;
		imgElement.style.display = 'block';

		// Oculta o ícone de upload e o texto
		if ($contentElement) {
			$contentElement.addClass('tem-imagem');
		}

		// Libera a memória após o carregamento da imagem (boa prática)
		imgElement.onload = function () {
			URL.revokeObjectURL(imageURL);
		};
	}
}