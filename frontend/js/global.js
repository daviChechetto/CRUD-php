// A URL base da nossa API no backend

const CONFIG = {
	apiUrl: 'http://localhost/crud/backend/users'
}

$('body').append(`<div id="perseguidor"><div class="circulo"></div></div>`)

function obterParametroConsulta(parametro) {
	const parametrosUrl = new URLSearchParams(window.location.search);
	return parametrosUrl.get(parametro);
}

$(window).on('mousemove', (e) => {
	const mouseX = e.clientX;
	const mouseY = e.clientY;

	$("#perseguidor").css({
		'transform': `translate(${mouseX - 9}px, ${mouseY - 9}px)`
	});
})

$("a, button").hover( function(){
	$("#perseguidor").toggleClass('esconder')
})


// O código jQuery vai começar aqui!