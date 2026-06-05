(function () {

	const UI = {
		body: $("body"),
		avatarLogado: $("#avatarLogado"),
		listaNavegacao: $('.lista-navegacao'),
		linkAtalho: $('.link-atalho'),
	}

	UI.body.append(`<div id="perseguidor"><div class="circulo"></div></div>`)

	$(window).on('mousemove', (e) => {
		const mouseX = e.clientX;
		const mouseY = e.clientY;

		$("#perseguidor").css({
			'transform': `translate(${mouseX - 9}px, ${mouseY - 9}px)`
		});
	})

	$("a, button").hover(function () {
		$("#perseguidor").addClass('esconder')
	}, function () {
		$("#perseguidor").removeClass('esconder')
	})

	// Adiciona a classe quando o botão do mouse é pressionado
	$(document).on('mousedown', function (e) {
		// e.which === 3 identifica o botão direito do mouse
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
		{ titulo: 'Usuários', href: 'index.html', icone: 'person' },
		{ titulo: 'Páginas', href: 'pages.html', icone: 'auto_stories' }
	]
}

function obterParametroConsulta(parametro) {
	const parametrosUrl = new URLSearchParams(window.location.search);
	return parametrosUrl.get(parametro);
}

function gerarNavegacao() {
	const listaNavegacao = $('.lista-navegacao');
	
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

// tipo de mensagem: "sucesso" e "erro"
function mostrarMensagem(texto, tipo) {
	const mensagem = $('<div class="mensagem ' + tipo + '">' + texto + '</div>');
	UI.body.prepend(mensagem);

	setTimeout(function () {
		mensagem.fadeOut(300, function () {
			$(this).remove();
		});
	}, 4000);
}

$(document).ready(function () {
	// Gera a navegação dinamicamente a partir do CONFIG
	gerarNavegacao();

	// Pega apenas o final da URL (ex: "index.html" ou "pages.html")
	let paginaAtual = window.location.pathname.split("/").pop();

	// Se a pessoa acessar só a pasta raiz (ex: localhost/crud/), assumimos que é o index
	if (paginaAtual === '') {
		paginaAtual = 'index.html';
	}

	// Percorre todos os links dentro da nossa navegação
	$('.lista-navegacao a').each(function () {
		const linkHref = $(this).attr('href');

		// Se o href do botão bater com a URL da página atual...
		if (linkHref === paginaAtual) {
			// Removemos a classe de todos (por precaução)
			$('.lista-navegacao li').removeClass('link-selecionado');

			// E adicionamos a classe apenas no <li> "pai" deste link específico
			$(this).parent('li').addClass('link-selecionado');
		}
	});
});