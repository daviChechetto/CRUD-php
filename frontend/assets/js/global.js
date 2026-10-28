(function () {

	const UI = {
		body: $("body"),
		avatarLogado: $("#avatarLogado"),
		listaNavegacao: $('.lista-navegacao'),
		linkAtalho: $('.link-atalho'),
	}

<<<<<<< HEAD
	UI.body.append(`<div id="perseguidor"><div class="circulo"></div></div>`)
=======
	UI.body.append(`<div id="perseguidor"><div class="circulo"></div></div>`);
>>>>>>> feature/davi-pages

	$(window).on('mousemove', (e) => {
		const mouseX = e.clientX;
		const mouseY = e.clientY;

		$("#perseguidor").css({
			'transform': `translate(${mouseX - 9}px, ${mouseY - 9}px)`
		});
<<<<<<< HEAD
	})

	$("a, button, input").hover(function () {
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
=======
	});

	$("a, button").hover(function () {
		$("#perseguidor").toggleClass('esconder');
>>>>>>> feature/davi-pages
	});
})();

// A URL base da nossa API no backend
<<<<<<< HEAD

const CONFIG = {
	apiUrl: 'http://localhost/crud/backend/',
	navegacao: [
		{ titulo: 'Início', href: '/', icone: 'home' },
		{ titulo: 'Páginas', href: '/paginas', icone: 'auto_stories' },
		{ titulo: 'Usuários', href: '/lista-usuarios', icone: 'person' },
	]
}
=======
const CONFIG = {
	apiUrl: 'http://localhost/crud/backend/users'
};
>>>>>>> feature/davi-pages

function obterParametroConsulta(parametro) {
	const parametrosUrl = new URLSearchParams(window.location.search);
	return parametrosUrl.get(parametro);
}

<<<<<<< HEAD
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
=======
// tipo de mensagem: "sucesso" e "erro"
function mostrarMensagem(texto, tipo) {
	const mensagem = $('<div class="mensagem ' + tipo + '">' + texto + '</div>');
	$('body').prepend(mensagem);
>>>>>>> feature/davi-pages

	setTimeout(function () {
		mensagem.fadeOut(300, function () {
			$(this).remove();
		});
	}, 4000);
}

<<<<<<< HEAD
$(document).ready(function () {
	// Gera a navegação dinamicamente a partir do CONFIG
	gerarNavegacao();

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
=======
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
>>>>>>> feature/davi-pages
