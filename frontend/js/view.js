
const UI = {
    avatar: $("#avatar"),
    userName: $("#userName"),
    userEmail: $("#userEmail"),
    statusBadge: $("#statusBadge"),
    userId: $("#userId"),

    botaoExcluirUsuario: $("#botaoExcluirUsuario"),
    botaoEditarUsuario: $("#botaoEditarUsuario"),
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function loadUserDetails() {
    const userId = getQueryParam('id');
    if (!userId) {
        $('#userDetails').html('<p class="erro">Usuário não encontrado.</p>');
        return;
    }

    $.get(apiUrl, function (data) {
        const user = data.find(u => u.id == userId);
        if (!user) {
            $('#userDetails').html('<p class="erro">Usuário não encontrado.</p>');
            return;
        }

        const initial = user.name.charAt(0).toUpperCase();
        const statusClass = user.status === true ? 'status-ativo' : 'status-inativo';
        const statusText = user.status === true ? 'Ativo' : 'Inativo';

        // $('#userDetails').html(``);
        UI.userId.text(user.id);
        UI.avatar.text(initial);
        UI.userName.text(user.name);
        UI.userEmail.text(user.username);
        UI.statusBadge.text(statusText).removeClass('status-ativo status-inativo').addClass(statusClass);

        // Adicionar eventos aos botões
        UI.botaoEditarUsuario.on('click', function () {
            alert('Funcionalidade de editar será implementada.');
        });

        UI.botaoExcluirUsuario.on('click', function () {
            if (confirm('Tem certeza que deseja excluir este usuário?')) {
                $.ajax({
                    url: apiUrl,
                    type: "DELETE",
                    contentType: "application/json",
                    data: JSON.stringify(userData),
                    success: function (response) {
                        console.log("usuário excluído com sucesso!", response);
                        refresh(); // Atualiza a lista de usuários
                    },
                    error: function (error) {
                        alert("Ocorreu um erro ao excluir o usuário. Por favor, verifique o console.");
                        console.error("Erro ao excluir usuário:", error.responseText);
                    }
                })
            }
        });
    }).fail(function () {
        console.error('Erro ao carregar os dados da API');
        $('#userDetails').html('<p class="erro">Erro ao carregar dados do usuário.</p>');
    });
}

$(document).ready(function () {
    loadUserDetails();
});