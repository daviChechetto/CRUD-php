
const UI = {
	avatar: $("#avatar"),
	userName: $("#userName"),
	userEmail: $("#userEmail"),
	statusBadge: $("#statusBadge"),
	userId: $("#userId"),

	botaoExcluirUsuario: $("#botaoExcluirUsuario"),
	botaoEditarUsuario: $("#botaoEditarUsuario"),
}

function deletarUsuario(userId) {
	$.ajax({
		url: CONFIG.apiUrl + '/' + userId + '.json',
		type: "DELETE",
		success: function (response) {
			console.log("usuário excluído com sucesso!", response);
			window.location.href = 'index.html'; // Redireciona para a página de listagem após exclusão
		},
		error: function (error) {
			alert("Ocorreu um erro ao excluir o usuário. Por favor, verifique o console.");
			console.error("Erro ao excluir usuário:", error.responseText);
		}
	});

};

function buscarUsuario(userId) {
	return $.get(CONFIG.apiUrl)
		.then(function (data) {
			return data.find(u => u.id == userId);
		})
		.fail(function () {
			console.error('Erro ao carregar os dados da API');
			$('#userDetails').html('<p class="erro">Erro ao carregar dados do usuário.</p>');
		});
}

function visualizarUsuario() {
	const userId = obterParametroConsulta('id');

	if (!userId) {
		$('#userDetails').html('<p class="erro">Usuário não encontrado.</p>');
		return;
	}

	buscarUsuario(userId).then(function (user) {
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

// Adicionar eventos aos botões
UI.botaoEditarUsuario.on('click', function () {
	window.location.href = `edit.html?id=${UI.userId.text()}`; // Redireciona para a página de edição com o ID do usuário
});

UI.botaoExcluirUsuario.on('click', function () {
	if (confirm('Tem certeza que deseja excluir este usuário?')) {
		const userId = obterParametroConsulta('id');
		deletarUsuario(userId);
	}
});

$(document).ready(function () {
	visualizarUsuario();
});