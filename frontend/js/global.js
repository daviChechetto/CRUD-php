(function () {

	const UI = {
		body: $("body"),
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
