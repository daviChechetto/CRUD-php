const UI = {
	body: $("body"),
	botaoEntrar: $("#botaoEntrar"),
	loginForm: $("#loginForm"),
	campoUsername: $("#apelido"),
	campoSenha: $("#senha"),

	logo: $('.logo')
}

let contador = 0

function piscar() {
	UI.body.fadeOut(500).fadeIn(100);
	$('html').append("<div class='elemento-piscar'></div>");
}

function userLogin(username, password) {
	const loginData = {
		username: username,
		password: password
	}

	$.ajax({
		url: CONFIG.apiUrl + '/login.json',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(loginData),
		success: function (response) {
			if (response.status === 'sucesso') {
				mostrarMensagem(response.message, response.status);
				piscar();
				setTimeout(function () {
					window.location.href = "index.html";
				}, 1000);
			} else {
				mostrarMensagem(response.message, response.status);
			}
		},
		error: function (xhr) {
			mostrarMensagem(response.message, response.status);
		}
	})
}

UI.loginForm.on('submit', function (e) {
	e.preventDefault()
	const username = UI.campoUsername.val();
	const password = UI.campoSenha.val();

	userLogin(username, password);
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