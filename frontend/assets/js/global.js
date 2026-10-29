(function () {

	const UI = {
		body: $("body"),
		avatarLogado: $("#avatarLogado"),
		listaNavegacao: $('.lista-navegacao'),
		linkAtalho: $('.link-atalho'),
	};

	UI.body.append(`<div id="perseguidor"><div class="circulo"></div></div>`);

	$(window).on('mousemove', (e) => {
		const mouseX = e.clientX;
		const mouseY = e.clientY;

		$("#perseguidor").css({
			'transform': `translate(${mouseX - 9}px, ${mouseY - 9}px)`
		});
	});

	$("a, button, input").hover(function () {
		$("#perseguidor").addClass('esconder');
	}, function () {
		$("#perseguidor").removeClass('esconder');
	});

	// Adiciona a classe quando o botão do mouse é pressionado
	$(document).on('mousedown', function (e) {
		if (e.which === 1) {
			$("#perseguidor").addClass('esconder');
		}
	});

	// Remove a classe quando o botão do mouse é solto
	$(document).on('mouseup', function (e) {
		if (e.which === 1) {
			$("#perseguidor").removeClass('esconder');
		}
	});
})();

// A URL base da nossa API no backend
const CONFIG = {
	apiUrl: 'http://localhost/crud/backend/',
	navegacao: [
		{ titulo: 'Início', href: '/', icone: 'home' },
		{ titulo: 'Páginas', href: '/paginas', icone: 'auto_stories' },
		{ titulo: 'Usuários', href: '/lista-de-usuarios', icone: 'person' },
	]
};

function obterParametroConsulta(parametro) {
	const parametrosUrl = new URLSearchParams(window.location.search);
	return parametrosUrl.get(parametro);
}

function gerarNavegacao() {
	const listaNavegacao = $('.lista-navegacao');
	if (listaNavegacao.length && listaNavegacao.children().length === 0) {
		CONFIG.navegacao.forEach(link => {
			const item = $(`
				<li>
					<a href="${link.href}">
						<span class="material-symbols-rounded">${link.icone}</span>
						<h3>${link.titulo}</h3>
					</a>
				</li>
			`);
			listaNavegacao.append(item);
		});
	}
}

// tipo de mensagem: "sucesso" e "erro"
function mostrarMensagem(texto, tipo) {
	const mensagem = $('<div class="mensagem ' + tipo + '">' + texto + '</div>');
	$('body').prepend(mensagem);

	setTimeout(function () {
		mensagem.fadeOut(300, function () {
			$(this).remove();
		});
	}, 4000);
}

$(function () {
	// Gera a navegação dinamicamente a partir do CONFIG caso não exista
	gerarNavegacao();

	const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
	let paginaAtual = pathname.split('/').pop();

	if (!paginaAtual || paginaAtual === '') {
		paginaAtual = 'home';
	}

	// Percorre todos os links dentro da nossa navegação
	$('.lista-navegacao a').each(function () {
		const linkHref = $(this).attr('href');
		if (!linkHref) return;

		const normalizado = linkHref.replace(/\/+$/, '') || '/';
		const linkBase = normalizado.split('/').pop();

		// Se o href do botão bater com a rota atual
		if (pathname === normalizado ||
			(linkHref === '/' && (pathname === '/' || pathname === '/home')) ||
			(paginaAtual && (paginaAtual === linkBase ||
				(paginaAtual === 'lista-de-usuarios' && (linkBase === 'lista-usuarios' || linkBase === 'index.html')) ||
				(paginaAtual === 'lista-usuarios' && (linkBase === 'lista-de-usuarios' || linkBase === 'index.html')) ||
				(paginaAtual === 'paginas' && (linkBase === 'pages.html' || linkBase === 'pages'))))) {
			$('.lista-navegacao li').removeClass('link-selecionado');
			$(this).parent('li').addClass('link-selecionado');
		}
	});
});
