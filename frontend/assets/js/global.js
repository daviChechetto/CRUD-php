(function () {

	const UI = {
		body: $("body"),
		avatarLogado: $("#avatarLogado"),
		listaNavegacao: $('.lista-navegacao'),
		linkAtalho: $('.link-atalho'),
	}

	UI.body.append(`<div id="perseguidor"><div class="circulo"></div></div>`);

	$(window).on('mousemove', (e) => {
		const mouseX = e.clientX;
		const mouseY = e.clientY;

		$("#perseguidor").css({
			'transform': `translate(${mouseX - 9}px, ${mouseY - 9}px)`
		});
	});

	$("a, button").hover(function () {
		$("#perseguidor").toggleClass('esconder');
	});
})();

// A URL base da nossa API no backend
const CONFIG = {
	apiUrl: 'http://localhost/crud/backend/users'
};

function obterParametroConsulta(parametro) {
	const parametrosUrl = new URLSearchParams(window.location.search);
	return parametrosUrl.get(parametro);
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

$(document).ready(function() {
    const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
    let paginaAtual = pathname.split('/').pop();

    if (!paginaAtual || paginaAtual === '') {
        paginaAtual = 'paginas';
    }

    // Percorre todos os links dentro da navegação
    $('.lista-navegacao a').each(function() {
        const linkHref = $(this).attr('href');
        if (!linkHref) return;

        const normalizado = linkHref.replace(/\/+$/, '') || '/';
        const linkBase = normalizado.split('/').pop();

        // Se o href do botão bater com a rota atual
        if (pathname === normalizado || 
            (paginaAtual && (paginaAtual === linkBase || 
             (paginaAtual === 'lista-de-usuarios' && linkBase === 'index.html') ||
             (paginaAtual === 'paginas' && linkBase === 'pages.html')))) {
            $('.lista-navegacao li').removeClass('link-selecionado');
            $(this).parent('li').addClass('link-selecionado');
        }
    });
});
