const UI = {
	body: $("body"),
	botaoEntrar: $("#botaoEntrar"),
	loginForm: $("#loginForm"),
	campoUsername: $("#apelido"),
	campoSenha: $("#senha"),

	logo: $('.logo')
};

let contador = 0;

function piscar() {
	UI.body.fadeOut(500).fadeIn(100);
	$('html').append("<div class='elemento-piscar'></div>");
}

function userLogin(username, password) {
	const loginData = {
		username: username,
		password: password
	};

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
					window.location.href = "/lista-de-usuarios";
				}, 1000);
			} else {
				mostrarMensagem(response.message || 'Erro ao realizar login.', response.status || 'erro');
			}
		},
		error: function (xhr) {
			const msg = (xhr.responseJSON && xhr.responseJSON.message)
				? xhr.responseJSON.message
				: 'Falha ao autenticar. Verifique o console ou a conexão com o servidor.';
			mostrarMensagem(msg, 'erro');
		}
	});
}

UI.loginForm.on('submit', function (e) {
	e.preventDefault();
	const username = UI.campoUsername.val();
	const password = UI.campoSenha.val();

	userLogin(username, password);
});

UI.logo.on('click', function () {
	if (contador === 1) {
		contador = 0;
		UI.logo[0].animate([
			{ transform: 'rotate(0deg)' },
			{ transform: 'rotate(360deg)' }
		], {
			duration: 500,
			iterations: 1,
			easing: 'ease-in-out'
		});
	} else {
		contador += 1;
	}
});
