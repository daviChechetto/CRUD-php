
const UI = {
	botaoRefresh: $('#botaoRefresh'),
	botaoCadastrarUsuario: $('#botaoCadastrarUsuario'),
	botaoSalvar: $('#botaoSalvar'),
	botaoCancelar: $('#btnCancel'),

	corpoTabela: $('#corpoTabela'),
	formularioCadastrarUsuario: $('#formularioCadastrarUsuario'),
	userForm: $('#userForm'),
}

function closeModal() {
	if (UI.formularioCadastrarUsuario.hasClass('mostrar-formulario')) {
		UI.formularioCadastrarUsuario.removeClass('mostrar-formulario');
		UI.userForm.trigger('reset');
		$('#userId').val('');
	}
}


function refresh() {
	$.get(CONFIG.apiUrl, function (data) {
		UI.corpoTabela.empty().append(data.map(user => `
			<a href="view.html?id=${user.id}" class="user-item">
				<div>${user.id}</div>
				<div>${user.name}</div>
				<div>${user.username}</div>
				<div class="status-badge ${user.status === true ? 'status-ativo' : 'status-inativo'}">${user.status === true ? 'Ativo' : 'Inativo'}</div>
			</a>
		`).join(''));
	}).fail(function () {
		console.error('Erro ao carregar os dados da API');
		UI.botaoRefresh.before(`
						<!-- From Uiverse.io by Praashoo7 --> 
						<div class="main_wrapper">
							<div class="main">
								<div class="antenna">
									<div class="antenna_shadow"></div>
									<div class="a1"></div>
									<div class="a1d"></div>
									<div class="a2"></div>
									<div class="a2d"></div>
									<div class="a_base"></div>
								</div>
								<div class="tv">
									<div class="cruve">
										<svg
											class="curve_svg"
											version="1.1"
											xmlns="http://www.w3.org/2000/svg"
											xmlns:xlink="http://www.w3.org/1999/xlink"
											viewBox="0 0 189.929 189.929"
											xml:space="preserve"
										>
											<path
												d="M70.343,70.343c-30.554,30.553-44.806,72.7-39.102,115.635l-29.738,3.951C-5.442,137.659,11.917,86.34,49.129,49.13
										C86.34,11.918,137.664-5.445,189.928,1.502l-3.95,29.738C143.041,25.54,100.895,39.789,70.343,70.343z"
											></path>
										</svg>
									</div>
									<div class="display_div">
										<div class="screen_out">
											<div class="screen_out1">
												<div class="screen">
													<span class="notfound_text"> NOT FOUND</span>
												</div>
												<div class="screenM">
													<span class="notfound_text"> NOT FOUND</span>
												</div>
											</div>
										</div>
									</div>
									<div class="lines">
										<div class="line1"></div>
										<div class="line2"></div>
										<div class="line3"></div>
									</div>
									<div class="buttons_div">
										<div class="b1"><div></div></div>
										<div class="b2"></div>
										<div class="speakers">
											<div class="g1">
												<div class="g11"></div>
												<div class="g12"></div>
												<div class="g13"></div>
											</div>
											<div class="g"></div>
											<div class="g"></div>
										</div>
									</div>
								</div>
								<div class="bottom">
									<div class="base1"></div>
									<div class="base2"></div>
									<div class="base3"></div>
								</div>
							</div>
							<div class="text_404">
								<div class="text_4041">4</div>
								<div class="text_4042">0</div>
								<div class="text_4043">4</div>
							</div>
						</div>

				`);
	});
}

function cadastrarUsuario(userData) {
	$.ajax({
		url: CONFIG.apiUrl,
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(userData),
		success: function (response) {
			console.log("usuário cadastrado com sucesso!", response);
			refresh(); // Atualiza a lista de usuários
			closeModal(); // Fecha o modal de cadastro			
		},
		error: function (error) {
			alert("Ocorreu um erro ao cadastrar o usuário. Por favor, verifique o console.");
			console.error("Erro ao cadastrar usuário:", error.responseText);
		}
	});
}

UI.botaoRefresh.on('click', function () {
	refresh();
});

UI.botaoCadastrarUsuario.on('click', function () {
	UI.formularioCadastrarUsuario.addClass('mostrar-formulario');
});

UI.userForm.on('submit', function (e) {
	e.preventDefault();
	closeModal();
});

UI.botaoSalvar.on('click', function (e) {
	e.preventDefault(); // Impede a tela de recarregar

	// 1. Capturamos os valores dos campos
	const userId = $('#userId').val(); // Vai nos ajudar depois na hora de fazer a Edição

	const userData = {
		name: $("#nome").val(),
		username: $("#apelido").val(),
		password: $("#senha").val(),
		// O checkbox retorna true ou false. Usamos um if ternário (?) para transformar em 1 ou 0
		status: $('#check').prop('checked') ? false : true
	};
	
	cadastrarUsuario(userData);
});

UI.botaoCancelar.on('click', function () {
	closeModal();
});

$(document).on('click', function (e) {
	if (!UI.formularioCadastrarUsuario.hasClass('mostrar-formulario')) {
		return;
	}

	if ($(e.target).closest(UI.userForm).length === 0 && !$(e.target).is('#botaoCadastrarUsuario')) {
		closeModal();
	}
});

function init() {
	refresh();
}

init();