const IU = {
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
		url: 'http://localhost/crud/backend/users/' + idUsuario + '.json',
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
	IU.formularioEdicao.prepend(mensagem);

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

	IU.avatar.text(inicial);
	IU.nomeUsuario.text(usuario.name);
	IU.distintivoStatus
		.text(textoPessoal)
		.removeClass('ativo inativo')
		.addClass(classePessoal);

	IU.idUsuario.val(usuario.id);
	IU.nomeUsuarioEntrada.val(usuario.name);
	IU.emailUsuario.val(usuario.username);
	IU.statusAlternancia.prop('checked', usuario.status === true);
	IU.textoStatus.text(usuario.status === true ? 'Ativo' : 'Inativo');
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

IU.botaoVoltar.on('click', function (e) {
	e.preventDefault();
	window.history.back();
});

// Atualizar texto de status ao mudar o toggle
IU.statusAlternancia.on('change', function () {
	const novoTexto = $(this).is(':checked') ? 'Ativo' : 'Inativo';
	IU.textoStatus.text(novoTexto);
});

// Salvar alterações
IU.formularioEdicao.on('submit', function (evento) {
	evento.preventDefault();

	const idUsuario = IU.idUsuario.val();
	const dadosAtualizados = {
		id: parseInt(idUsuario),
		name: IU.nomeUsuarioEntrada.val(),
		username: IU.emailUsuario.val(),
		status: IU.statusAlternancia.is(':checked')
	};

	atualizarUsuario(idUsuario, dadosAtualizados);
});

// Cancelar edição
IU.botaoCancelarEdicao.on('click', function () {
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
