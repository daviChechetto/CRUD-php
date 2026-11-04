$(document).ready(function () {

	// Centraliza os seletores da lista
	const UI = {
		$tabelaBody: $('#tabelaPaginasBody')
	};

	function carregarListaDePaginas() {
		$.ajax({
			url: CONFIG.apiUrl + 'pages', // Mantém o padrão de rota configurado no global
			type: 'GET',
			dataType: 'json',
			success: function (response) {
				UI.$tabelaBody.empty(); // Remove o feedback de carregamento

				if (!response.pages || response.pages.length === 0) {
					UI.$tabelaBody.append(`
						<tr>
							<td colspan="5" style="padding: 40px; text-align: center; color: var(--cor-fonte-secundario);">
								Nenhuma página institucional encontrada no momento.
							</td>
						</tr>
					`);
					return;
				}

				// Renderiza linha por linha
				response.pages.forEach(function (pagina) {
					
					// Estilização dinâmica para o badge de status
					const badgeStyle = pagina.status === 'publicado' 
						? 'background: #28a74520; color: #28a745; border: 1px solid #28a74540;' 
						: 'background: #ffc10720; color: #ffc107; border: 1px solid #ffc10740;';

					const linhaHTML = `
						<tr class="linha-tabela" style="border-bottom: 1px solid var(--cor-fundo-contraste, #333); transition: background .2s linear;">
							<td style="padding: 18px 20px; color: var(--cor-fonte); font-weight: 500;">
								${pagina.title}
							</td>
							<td style="padding: 18px 20px;">
								<span style="display: inline-block; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: 600; text-transform: uppercase; ${badgeStyle}">
									${pagina.status}
								</span>
							</td>
							<td style="padding: 18px 20px; color: var(--cor-fonte-secundario); font-size: 14px;">
								${pagina.modified}
							</td>
							<td style="padding: 18px 20px; color: var(--cor-fonte-secundario); font-size: 14px;">
								<span class="material-symbols-rounded" style="font-size: 16px; vertical-align: middle; margin-right: 5px; color: #888;">layers</span>
								${pagina.block_count} ${pagina.block_count === 1 ? 'bloco estrutural' : 'blocos estruturais'}
							</td>
							<td style="padding: 18px 20px; text-align: center;">
								<button class="btn-editar-pagina" data-id="${pagina.id}" style="background: none; border: none; color: var(--cor-fonte-secundario); cursor: pointer; padding: 5px; border-radius: 4px; transition: all .2s;" title="Editar Conteúdo">
									<span class="material-symbols-rounded" style="font-size: 20px; vertical-align: middle;">edit</span>
								</button>
							</td>
						</tr>
					`;
					
					UI.$tabelaBody.append(linhaHTML);
				});
			},
			error: function () {
				UI.$tabelaBody.html(`
					<tr>
						<td colspan="5" style="padding: 40px; text-align: center; color: #ff4c4c;">
							<span class="material-symbols-rounded" style="vertical-align: middle; margin-right: 5px;">error</span>
							Falha crítica ao carregar listagem do servidor backend.
						</td>
					</tr>
				`);
			}
		});
	}

	// Inicializa a busca de dados se o container estiver ativo na tela
	if (UI.$tabelaBody.length > 0) {
		carregarListaDePaginas();
	}

	// Ouvinte para capturar o clique no botão de edição (Preparação para a próxima etapa)
	UI.$tabelaBody.on('click', '.btn-editar-pagina', function () {
		const idPagina = $(this).data('id');
		// Redireciona para o construtor passando o ID via Query String
		window.location.href = `pages-add.html?id=${idPagina}`;
	});
});