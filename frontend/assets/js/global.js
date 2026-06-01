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
		$("#perseguidor").toggleClass('esconder')
	})
})();

// A URL base da nossa API no backend

const CONFIG = {
	apiUrl: 'http://localhost/crud/backend/users'
}

function obterParametroConsulta(parametro) {
	const parametrosUrl = new URLSearchParams(window.location.search);
	return parametrosUrl.get(parametro);
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

$(document).ready(function() {
    // Pega apenas o final da URL (ex: "index.html" ou "pages.html")
    let paginaAtual = window.location.pathname.split("/").pop();

    // Se a pessoa acessar só a pasta raiz (ex: localhost/crud/), assumimos que é o index
    if (paginaAtual === '') {
        paginaAtual = 'index.html';
    }

    // Percorre todos os links dentro da nossa navegação
    $('.lista-navegacao a').each(function() {
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