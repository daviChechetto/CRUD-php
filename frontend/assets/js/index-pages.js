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
	if (status === 'Aprovado') {
		return { label: 'Aprovado', classe: 'status-aprovado' };
	} else if (status === 'Aguardando') {
		return { label: 'Aguardando', classe: 'status-aguardando' };
	} else if (status === 'Publicado') {
		return { label: 'Publicado', classe: 'status-publicado' };
	}
	return { label: 'Rascunho', classe: 'status-rascunho' };
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

			// Roda o laço preenchendo a tabela
			response.pagesList.forEach(function (pagina) {
				statusPagina = obterStatusFormatado(pagina.status)

				const linhaHTML = `
						<ul class="tabela-linha">
							<li><strong>${pagina.title}</strong></li>
							<li>
                                <span class="status-badge ${statusPagina.classe}">
                                    ${statusPagina.label}
                                </span>
                            </li>
							<li>${pagina.modified}</li>
							<li>${pagina.blocks_count} blocos</li>
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
