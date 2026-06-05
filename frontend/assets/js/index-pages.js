const UI = {
    $botaoCriarPagina: $('#botaoCriarPagina'),
    $tabelaPaginasCorpo: $('#tabelaPaginasCorpo'),
};

function formatarDataISO(dataIso) {
    if (!dataIso) {
        return '-';
    }

    const data = new Date(dataIso);
    if (Number.isNaN(data.getTime())) {
        return dataIso;
    }

    return data.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
}

function obterStatusFormatado(status) {
    if (status === true || status === 'Ativo' || status === 'ativo' || status === 'active') {
        return { label: 'Ativo', classe: 'status-ativo' };
    }

    if (status === 'rascunho' || status === 'Rascunho' || status === 'draft') {
        return { label: 'Rascunho', classe: 'status-rascunho' };
    }

    return { label: 'Inativo', classe: 'status-inativo' };
}

function renderizartabelaPaginas() {
    UI.$tabelaPaginasCorpo.empty();
    

    $.ajax({
        url: CONFIG.apiUrl + 'pages', // Ajuste para a sua URL base
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            UI.$tabelaPaginasCorpo.empty(); // Limpa o "Carregando..."

            if (!response.pagesList || response.pagesList.length === 0) {
                UI.$tabelaPaginasCorpo.append('<tr><td colspan="5">Nenhuma página encontrada.</td></tr>');
                return;
            }

            console.log(response.pagesList);
            

            // Roda o laço preenchendo a tabela
            response.pagesList.forEach(function (pagina) {
                const linhaHTML = `
						<ul class="tabela-linha">
							<li><strong>${pagina.title}</strong></li>
							<li>
                                <span class="badge-status">
                                    ${pagina.status}
                                </span>
                            </li>
							<li>${pagina.modified}</li>
							<li>${pagina.block_count} blocos</li>
						</ul>
					`;
                UI.$tabelaPaginasCorpo.append(linhaHTML);
            });
        },
        error: function () {
            UI.$tabelaPaginasCorpo.html('<tr><td colspan="5">Erro ao carregar as páginas.</td></tr>');
        }
    });
}

$(document).ready(function () {
    UI.$botaoCriarPagina.on('click', function () {
        window.location.href = 'pages.html';
    });

    renderizartabelaPaginas();
});
