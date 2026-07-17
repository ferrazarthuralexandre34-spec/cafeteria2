// ==============================
// COFFEE HOUSE - SCRIPT.JS
// ==============================

// Carrinho (persistido no localStorage do navegador)
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const contador = document.getElementById("contador");
const containerBebidas = document.getElementById("bebidas-cards");
const containerComidas = document.getElementById("comidas-cards");

atualizarContador();
carregarCardapio();

// Busca os produtos na API (backend) e monta o cardápio
async function carregarCardapio() {
    try {
        const [respostaBebidas, respostaComidas] = await Promise.all([
            fetch("/api/bebidas"),
            fetch("/api/comidas")
        ]);

        const bebidas = await respostaBebidas.json();
        const comidas = await respostaComidas.json();

        renderizarCards(bebidas, containerBebidas);
        renderizarCards(comidas, containerComidas);

        ativarBotoesComprar();
        ativarAnimacaoCards();
    } catch (erro) {
        console.error("Erro ao carregar o cardápio:", erro);

        if (containerBebidas) {
            containerBebidas.innerHTML = "<p>Não foi possível carregar as bebidas no momento.</p>";
        }
        if (containerComidas) {
            containerComidas.innerHTML = "<p>Não foi possível carregar as comidas no momento.</p>";
        }
    }
}

function renderizarCards(produtos, container) {
    if (!container) return;

    container.innerHTML = produtos.map(produto => `
        <div class="card">
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p>${produto.descricao}</p>
            <h4>R$ ${Number(produto.preco).toFixed(2).replace(".", ",")}</h4>
            <button class="comprar">Adicionar</button>
        </div>
    `).join("");
}

function ativarBotoesComprar() {
    const botoes = document.querySelectorAll(".comprar");

    botoes.forEach(botao => {
        botao.addEventListener("click", () => {

            const card = botao.parentElement;

            const produto = {
                nome: card.querySelector("h3").textContent,
                preco: card.querySelector("h4").textContent,
                imagem: card.querySelector("img").getAttribute("src")
            };

            carrinho.push(produto);

            localStorage.setItem("carrinho", JSON.stringify(carrinho));

            atualizarContador();

            alert(produto.nome + " adicionado ao carrinho!");
        });
    });
}

function atualizarContador() {
    if (contador) {
        contador.textContent = carrinho.length;
    }
}

// Rolagem suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const destino = document.querySelector(this.getAttribute("href"));

        if (destino) {
            destino.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// Botão "Ver Cardápio"
const botaoMenu = document.querySelector(".texto button");

if (botaoMenu) {
    botaoMenu.addEventListener("click", () => {
        document.querySelector("#menu").scrollIntoView({
            behavior: "smooth"
        });
    });
}

// Animação ao rolar a página (aplicada depois que os cards chegam da API)
function ativarAnimacaoCards() {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(40px)";
        card.style.transition = ".6s";
    });

    function verificarPosicao() {
        cards.forEach(card => {
            const posicao = card.getBoundingClientRect().top;

            if (posicao < window.innerHeight - 100) {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            }
        });
    }

    window.addEventListener("scroll", verificarPosicao);
    verificarPosicao();
}

// Cabeçalho muda de cor ao rolar
const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 100) {
        header.style.background = "#2d1b16";
        header.style.boxShadow = "0 5px 15px rgba(0,0,0,.3)";
    } else {
        header.style.background = "#4E342E";
        header.style.boxShadow = "none";
    }

});

// Pesquisa (ícone da lupa)
const lupa = document.querySelector(".fa-magnifying-glass");

if (lupa) {

    lupa.addEventListener("click", () => {

        const pesquisa = prompt("Digite o nome do café:");

        if (!pesquisa) return;

        const cards = document.querySelectorAll(".card");
        let encontrou = false;

        cards.forEach(card => {

            const nome = card.querySelector("h3").textContent.toLowerCase();

            if (nome.includes(pesquisa.toLowerCase())) {

                card.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

                card.style.border = "3px solid #ffb347";

                setTimeout(() => {
                    card.style.border = "none";
                }, 3000);

                encontrou = true;
            }

        });

        if (!encontrou) {
            alert("Produto não encontrado.");
        }

    });

}

console.log("Coffee House carregado com sucesso!");
