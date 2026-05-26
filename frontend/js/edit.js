const UI = {
	avatar: $("#avatar"),
	nomeUsuario: $("#nomeUsuario"),
	distintivoStatus: $("#distintivo-status"),
	idUsuario: $("#idUsuario"),
	nomeUsuarioEntrada: $("#nomeUsuarioEntrada"),
	emailUsuario: $("#emailUsuario"),
	funcao: $("#funcao"),
	statusAlternancia: $("#statusAlternancia"),
	textoStatus: $("#textoStatus"),
	formularioEdicao: $("#formulario-edicao"),
	
	botaoVoltar: $(".botao-voltar"),
	botaoCancelarEdicao: $("#botaoCancelarEdicao"),
}

function buscarUsuarioPorId(idUsuario) {
	return $.get(CONFIG.apiUrl)
		.then(function (dados) {
			return dados.find(u => u.id == idUsuario);
		})
		.fail(function () {
			console.error('Erro ao carregar os dados da API');
			mostrarMensagem('Erro ao carregar dados do usuário.', 'erro');
		});
}

function atualizarUsuario(idUsuario, dados) {
	return $.ajax({
		url: CONFIG.apiUrl + '/' + idUsuario + '.json',
		type: "PUT",
		contentType: 'application/json',
		data: JSON.stringify(dados),
		success: function (resposta) {
			console.log("usuário atualizado com sucesso!", resposta);
			mostrarMensagem('Usuário atualizado com sucesso!', 'sucesso');
			setTimeout(function () {
				window.location.href = 'view.html?id=' + idUsuario;
			}, 500);
		},
		error: function (erro) {
			console.error("Erro ao atualizar usuário:", erro.responseText);
			mostrarMensagem('Erro ao atualizar usuário. Verifique o console.', 'erro');
		}
	});
}

function mostrarMensagem(texto, tipo) {
	const mensagem = $('<div class="mensagem ' + tipo + '">' + texto + '</div>');
	UI.formularioEdicao.prepend(mensagem);

	setTimeout(function () {
		mensagem.fadeOut(300, function () {
			$(this).remove();
		});
	}, 4000);
}

function preencherFormulario(usuario) {
	if (!usuario) {
		$('#detalhesUsuario').html('<p class="erro">Usuário não encontrado.</p>');
		return;
	}

	const inicial = usuario.name.charAt(0).toUpperCase();
	const classePessoal = usuario.status === true ? 'ativo' : 'inativo';
	const textoPessoal = usuario.status === true ? 'Ativo' : 'Inativo';

	UI.avatar.text(inicial);
	UI.nomeUsuario.text(usuario.name);
	UI.distintivoStatus
		.text(textoPessoal)
		.removeClass('ativo inativo')
		.addClass(classePessoal);

	UI.idUsuario.val(usuario.id);
	UI.nomeUsuarioEntrada.val(usuario.name);
	UI.emailUsuario.val(usuario.username);
	UI.statusAlternancia.prop('checked', usuario.status === true);
	UI.textoStatus.text(usuario.status === true ? 'Ativo' : 'Inativo');
}

function carregarEdicaoUsuario() {
	const idUsuario = obterParametroConsulta('id');

	if (!idUsuario) {
		$('#detalhesUsuario').html('<p class="erro">Usuário não encontrado.</p>');
		return;
	}

	buscarUsuarioPorId(idUsuario).then(function (usuario) {
		preencherFormulario(usuario);
	});
}

UI.botaoVoltar.on('click', function (e) {
	e.preventDefault();
	window.history.back();
});

// Atualizar texto de status ao mudar o toggle
UI.statusAlternancia.on('change', function () {
	const novoTexto = $(this).is(':checked') ? 'Ativo' : 'Inativo';
	UI.textoStatus.text(novoTexto);
});

// Salvar alterações
UI.formularioEdicao.on('submit', function (evento) {
	evento.preventDefault();

	const idUsuario = UI.idUsuario.val();
	const dadosAtualizados = {
		id: parseInt(idUsuario),
		name: UI.nomeUsuarioEntrada.val(),
		username: UI.emailUsuario.val(),
		status: UI.statusAlternancia.is(':checked')
	};

	atualizarUsuario(idUsuario, dadosAtualizados);
});

// Cancelar edição
UI.botaoCancelarEdicao.on('click', function () {
	const idUsuario = obterParametroConsulta('id');
	if (idUsuario) {
		window.location.href = 'view.html?id=' + idUsuario;
	} else {
		window.location.href = 'index.html';
	}
});

$(document).ready(function () {
	carregarEdicaoUsuario();
});
