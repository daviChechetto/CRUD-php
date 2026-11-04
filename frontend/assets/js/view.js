const UI = {
	avatar: $("#avatar"),
	userName: $("#userName"),
	userEmail: $("#userEmail"),
	statusBadge: $("#statusBadge"),
	userId: $("#userId"),

	botaoExcluirUsuario: $("#botaoExcluirUsuario"),
	botaoEditarUsuario: $("#botaoEditarUsuario"),
};

function deletarUsuario(userId) {
	$.ajax({
		url: CONFIG.apiUrl + 'users/' + userId + '.json',
		type: "DELETE",
		success: function (response) {
			console.log("usuário excluído com sucesso!", response);
			window.location.href = '/lista-de-usuarios';
		},
		error: function (error) {
			alert("Ocorreu um erro ao excluir o usuário. Por favor, verifique o console.");
			console.error("Erro ao excluir usuário:", error.responseText);
		}
	});
}

function buscarUsuario(identificador) {
	return $.get(CONFIG.apiUrl + 'users/')
		.then(function (data) {
			return data.find(u => 
				String(u.id) === String(identificador) ||
				window.UtilitariosGlobais.gerarSlug(u.name) === identificador ||
				window.UtilitariosGlobais.gerarSlug(u.username) === identificador
			);
		})
		.fail(function () {
			console.error('Erro ao carregar os dados da API');
			$('#userDetails').html('<p class="erro">Erro ao carregar dados do usuário.</p>');
		});
}

function visualizarUsuario() {
	const identificador = window.UtilitariosGlobais.obterIdentificadorUrl();

	if (!identificador) {
		$('#userDetails').html('<p class="erro">Usuário não encontrado.</p>');
		return;
	}

	buscarUsuario(identificador).then(function (user) {
		if (!user) {
			$('#userDetails').html('<p class="erro">Usuário não encontrado.</p>');
			return;
		}

		const initial = user.name.charAt(0).toUpperCase();
		const statusClass = user.status === true ? 'status-ativo' : 'status-inativo';
		const statusText = user.status === true ? 'Ativo' : 'Inativo';

		UI.userId.text(user.id);
		UI.avatar.text(initial);
		UI.userName.text(user.name);
		UI.userEmail.text(user.username);
		UI.statusBadge.text(statusText).removeClass('status-ativo status-inativo').addClass(statusClass);
	});
}

// Eventos de botões
UI.botaoEditarUsuario.on('click', function () {
	const slug = window.UtilitariosGlobais.gerarSlug(UI.userName.text()) || UI.userId.text();
	window.location.href = `/editar-usuario/${slug}`;
});

UI.botaoExcluirUsuario.on('click', function () {
	if (confirm('Tem certeza que deseja excluir este usuário?')) {
		const userId = UI.userId.text();
		deletarUsuario(userId);
	}
});

$(function () {
	visualizarUsuario();
});
