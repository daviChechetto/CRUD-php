const UI = {
	body: $("body"),
	botaoEntrar: $("#botaoEntrar"),
	loginForm: $("#loginForm"),

	logo: $('.logo')
}

let contador = 0

function piscar() {
	UI.body.fadeOut(500).fadeIn(100);
	$('html').append("<div class='elemento-piscar'></div>");
}

function userLogin(username, password) {

}

UI.loginForm.on('submit', function (e) {
	e.preventDefault()
	const username = $("#username").val();
	const password = $("#password").val();

	userLogin(username, password);

	piscar();

	setTimeout(function () {
		window.location.href = "index.html";
	}, 1000);
})


UI.logo.on('click', function () {
	if (contador == 1) {
		contador = 0
		UI.logo[0].animate([
			{ transform: 'rotate(0deg)' },
			{ transform: 'rotate(360deg)' }
		], {
			duration: 500,         // tempo em ms
			iterations: 1,         // quantas vezes repete
			easing: 'ease-in-out'  // curva de aceleração
		});
	} else {
		contador += 1
	}
})