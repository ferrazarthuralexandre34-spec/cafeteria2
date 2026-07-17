// URL base da API (altere se o backend estiver em outro endereço)
const API_URL = 'https://profound-grace-production-3789.up.railway.app/api';

const listaComidas = document.getElementById('lista-comidas');
const listaBebidas = document.getElementById('lista-bebidas');
const form = document.getElementById('form-item');
const tipoItem = document.getElementById('tipo-item');
const campoMl = document.getElementById('ml');
const inputFoto = document.getElementById('foto');
const previewFoto = document.getElementById('preview-foto');

let fotoBase64 = null;

// ==============================================
// NAVEGAÇÃO ENTRE SEÇÕES (Home / Sobre / Cardápio / Adicionar)
// ==============================================
const botoesNav = document.querySelectorAll('[data-target]');
const paginas = document.querySelectorAll('.page');

function irParaSecao(id) {
    paginas.forEach((pagina) => pagina.classList.remove('ativa'));
    document.getElementById(id).classList.add('ativa');

    document.querySelectorAll('.nav-btn').forEach((botao) => {
        botao.classList.toggle('active', botao.dataset.target === id);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

botoesNav.forEach((botao) => {
    botao.addEventListener('click', () => irParaSecao(botao.dataset.target));
});

// ==============================================
// MOSTRAR/ESCONDER CAMPO "ML" (só para bebida)
// ==============================================
function atualizarCampoMl() {
    if (tipoItem.value === 'bebidas') {
        campoMl.classList.remove('oculto');
        campoMl.required = true;
    } else {
        campoMl.classList.add('oculto');
        campoMl.required = false;
        campoMl.value = '';
    }
}

tipoItem.addEventListener('change', atualizarCampoMl);
atualizarCampoMl();

// ==============================================
// PRÉ-VISUALIZAÇÃO DA FOTO (convertida para base64)
// ==============================================
inputFoto.addEventListener('change', () => {
    const arquivo = inputFoto.files[0];

    if (!arquivo) {
        fotoBase64 = null;
        previewFoto.classList.add('oculto');
        return;
    }

    const leitor = new FileReader();
    leitor.onload = () => {
        fotoBase64 = leitor.result;
        previewFoto.src = fotoBase64;
        previewFoto.classList.remove('oculto');
    };
    leitor.readAsDataURL(arquivo);
});

// ==============================================
// CARREGAR DADOS DO BANCO
// ==============================================
async function carregarComidas() {
    try {
        const resposta = await fetch(`${API_URL}/comidas`);
        const dados = await resposta.json();
        renderizarItens(dados, listaComidas, 'comidas');
    } catch (erro) {
        listaComidas.innerHTML = '<p>Não foi possível carregar as comidas. Verifique se o servidor está rodando.</p>';
    }
}

async function carregarBebidas() {
    try {
        const resposta = await fetch(`${API_URL}/bebidas`);
        const dados = await resposta.json();
        renderizarItens(dados, listaBebidas, 'bebidas');
    } catch (erro) {
        listaBebidas.innerHTML = '<p>Não foi possível carregar as bebidas. Verifique se o servidor está rodando.</p>';
    }
}

// ==============================================
// RENDERIZAR CARDS NA TELA
// ==============================================
function renderizarItens(itens, container, tipo) {
    container.innerHTML = '';

    if (itens.length === 0) {
        container.innerHTML = '<p>Nenhum item cadastrado ainda.</p>';
        return;
    }

    itens.forEach((item) => {
        const card = document.createElement('div');
        card.classList.add('card');

        const tagExtra = tipo === 'comidas' ? item.categoria : item.tamanho;

        const blocoFoto = item.imagem
            ? `<img class="card-foto" src="${item.imagem}" alt="Foto de ${item.nome}">`
            : `<div class="card-foto-vazia">${tipo === 'comidas' ? '🍽️' : '🥤'}</div>`;

        const infoExtra = tipo === 'bebidas'
            ? `<span>${item.ml ? item.ml + ' ml' : ''}</span><span>Estoque: ${item.quantidade ?? 0}</span>`
            : `<span>Estoque: ${item.quantidade ?? 0}</span>`;

        card.innerHTML = `
            ${blocoFoto}
            <div class="card-corpo">
                <div class="linha-info">
                    <h3>${item.nome}</h3>
                    <span class="tag">${tagExtra}</span>
                </div>
                <p class="descricao">${item.descricao}</p>
                <div class="linha-info">
                    <span class="preco">R$ ${Number(item.preco).toFixed(2)}</span>
                </div>
                <div class="info-extra">${infoExtra}</div>
                <button class="btn-excluir" data-id="${item.id}" data-tipo="${tipo}">Excluir</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// ==============================================
// CADASTRAR NOVO ITEM
// ==============================================
form.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const tipo = tipoItem.value;
    const nome = document.getElementById('nome').value.trim();
    const descricao = document.getElementById('descricao').value.trim();
    const preco = document.getElementById('preco').value;
    const extra = document.getElementById('extra').value.trim();
    const quantidade = document.getElementById('quantidade').value;

    const corpo = tipo === 'comidas'
        ? { nome, descricao, preco, categoria: extra, quantidade, imagem: fotoBase64 }
        : { nome, descricao, preco, tamanho: extra, quantidade, ml: campoMl.value, imagem: fotoBase64 };

    try {
        const resposta = await fetch(`${API_URL}/${tipo}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(corpo)
        });

        if (!resposta.ok) throw new Error('Erro ao cadastrar item.');

        // reset do formulário e da pré-visualização de foto
        form.reset();
        fotoBase64 = null;
        previewFoto.classList.add('oculto');
        atualizarCampoMl();

        // atualiza a lista em tempo real
        tipo === 'comidas' ? carregarComidas() : carregarBebidas();

        irParaSecao('cardapio');
    } catch (erro) {
        alert('Erro ao cadastrar o item. Verifique os dados e tente novamente.');
    }
});

// ==============================================
// EXCLUIR ITEM (delegação de evento)
// ==============================================
document.addEventListener('click', async (evento) => {
    if (evento.target.classList.contains('btn-excluir')) {
        const id = evento.target.dataset.id;
        const tipo = evento.target.dataset.tipo;

        if (!confirm('Tem certeza que deseja excluir este item?')) return;

        try {
            const resposta = await fetch(`${API_URL}/${tipo}/${id}`, { method: 'DELETE' });
            if (!resposta.ok) throw new Error('Erro ao excluir item.');

            tipo === 'comidas' ? carregarComidas() : carregarBebidas();
        } catch (erro) {
            alert('Erro ao excluir o item.');
        }
    }
});

// ==============================================
// INICIALIZAÇÃO
// ==============================================
carregarComidas();
carregarBebidas();
