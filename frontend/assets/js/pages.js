$(document).ready(function () {

	const UI = {
		elementoCanvas: document.getElementById('construtorCanva'),

		$elementoCanvas: $('#construtorCanva'),
		$botaoAdicionarElemento: $('.botao-adicionar-bloco')
	}


	// 1. INICIALIZAR O SORTABLE JS
	// O Sortable precisa do elemento nativo do DOM (por isso usamos document.getElementById)
	new Sortable(UI.elementoCanvas, {
		animation: 150, // Milissegundos de animação ao trocar de lugar
		handle: '.drag-handle', // OBRIGATÓRIO: O usuário só consegue arrastar se clicar na "alça"
		ghostClass: 'sortable-ghost', // Classe aplicada ao elemento que está sendo arrastado
	});

	// 2. TEMPLATES DE BLOCOS
	// Essa função devolve o HTML do bloco dependendo de qual botão foi clicado
	function gerarTemplateDoBloco(id, tipo) {
		let conteudoHTML = '';

		if (tipo === 'titulo-1') {
			conteudoHTML = `
				<div class="form-group">
					<input id="titiloPrincipal${id}" class="campo-texto input-conteudo" placeholder="Digite seu texto aqui..." required></input>
				</div>`;
		} else if (tipo === 'titulo-2') {
			conteudoHTML = `
				<div class="form-group">
					<input id="titiloSecundario${id}" class="campo-texto input-conteudo" placeholder="Digite seu texto aqui..." required></input>
				</div>`;
		} else if (tipo === 'titulo-3') {
			conteudoHTML = `
				<div class="form-group">
					<input id="titiloTerciario${id}" class="campo-texto input-conteudo" placeholder="Digite seu texto aqui..." required></input>
				</div>`;
		} else if (tipo === 'paragrafo') {
			conteudoHTML = `
				<div class="form-group">
					<textarea class="campo-texto input-conteudo" placeholder="Digite seu texto aqui..." rows="4"></textarea>
				</div>`;
		} else if (tipo === 'aviso') {
			conteudoHTML = `
				<div class="form-group">
					<textarea class="campo-texto input-conteudo" placeholder="Digite seu texto aqui..." rows="4"></textarea>
				</div>`;
		} else if (tipo === 'lista') {
			conteudoHTML = `
				<div class="form-group">
					<textarea class="campo-texto input-conteudo" placeholder="Item 1\nItem 2\nItem 3" rows="4"></textarea>
					<small class="texto-dica">Coloque um item por linha</small>
				</div>`;
		} else if (tipo === 'passo-a-passo') {
			conteudoHTML = `
				<div class="form-group">
					<textarea class="campo-texto input-conteudo" placeholder="Item 1\nItem 2\nItem 3" rows="4"></textarea>
					<small class="texto-dica">Coloque um item por linha</small>
				</div>`;
		} else if (tipo === 'anexos') {
			conteudoHTML = `
				<div class="form-group">
					<textarea class="campo-texto input-conteudo" placeholder="Item 1\nItem 2\nItem 3" rows="4"></textarea>
					<small class="texto-dica">Coloque um item por linha</small>
				</div>`;
		} else if (tipo === 'imagem') {
			// Note que o input de arquivo ganha uma classe específica (input-arquivo) para o salvamento depois
			conteudoHTML = `
				<div class="form-group">
					<label class="user-label">Escolha uma imagem:</label>
					<input type="file" class="input-arquivo" accept="image/*">
				</div>
				<div class="form-group">
					<input type="text" class="campo-texto input-alt" placeholder="Texto alternativo (acessibilidade)...">
				</div>`;
		} else if (tipo === 'banner') {
			// Note que o input de arquivo ganha uma classe específica (input-arquivo) para o salvamento depois
			conteudoHTML = `
				<div class="form-group">
					<label class="user-label">Escolha uma imagem:</label>
					<input type="file" class="input-arquivo" accept="image/*">
				</div>
				<div class="form-group">
					<input type="text" class="campo-texto input-alt" placeholder="Texto alternativo (acessibilidade)...">
				</div>`;
		}

		// O HTML da "casca" do bloco, igual para todos
		return `
			<div class="bloco-item" data-type="${tipo}">
				<div class="bloco-header">
					<div>
						<span class="material-symbols-rounded drag-handle">drag_indicator</span>
						<strong style="text-transform: uppercase; font-size: 0.9em; color: var(--text-color);">${tipo}</strong>
					</div>
					<span class="material-symbols-rounded btn-remover" style="cursor: pointer; color: #ff4c4c;">delete</span>
				</div>
				<div class="bloco-conteudo">
					${conteudoHTML}
				</div>
			</div>
		`;
	}

	// 3. ADICIONAR BLOCOS NA TELA
	UI.$botaoAdicionarElemento.on('click', function () {
		const tipo = $(this).data('type'); // Pega se é paragrafo, imagem ou lista
		const id = Date.now(); // Gera um ID único baseado no timestamp atual
		const htmlDoBloco = gerarTemplateDoBloco(id, tipo);

		// Remove a mensagem de "Quadro Vazio" se ela ainda estiver lá
		UI.$elementoCanvas.find('.campo-vazio').remove();

		// Injeta o bloco no final do quadro
		UI.$elementoCanvas.append(htmlDoBloco);
	});

	// 4. REMOVER BLOCOS
	UI.$elementoCanvas.on('click', '.btn-remover', function () {
		if (confirm('Tem certeza que deseja remover este bloco?')) {
			$(this).closest('.bloco-item').remove(); // Apaga a div inteira do bloco

			// Se o quadro ficar vazio de novo, devolve a mensagem inicial
			if (UI.$elementoCanvas.children('.bloco-item').length === 0) {
				UI.$elementoCanvas.html(`
					<div class="campo-vazio">
						<p>Clique em um bloco ao lado para começar a construir sua página.</p>
					</div>
				`);
			}
		}
	});
});