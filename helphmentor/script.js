// Dados de produtos
const produtos = [
    {
        nome: 'Maçã',
        categoria: 'organico',
        descricao: 'Fruta rica em fibras e vitaminas.',
        preco: 5,
        imagem: 'https://cdn.pixabay.com/photo/2018/08/02/13/02/apple-3580502_1280.jpg',
        info: 'A maçã é rica em fibras, vitaminas e antioxidantes. Ajuda na digestão e promove a saúde do coração.'
    },
    {
        nome: 'Laranja',
        categoria: 'organico',
        descricao: 'Rica em vitamina C, ajuda na imunidade.',
        preco: 4,
        imagem: 'https://cdn.pixabay.com/photo/2017/01/20/15/06/oranges-1995056_1280.jpg',
        info: 'A laranja fortalece o sistema imunológico e melhora a saúde da pele.'
    },
    {
        nome: 'Pão sem glúten',
        categoria: 'sem-gluten',
        descricao: 'Produto sem glúten ideal para celíacos.',
        preco: 10,
        imagem: 'https://cdn.pixabay.com/photo/2016/11/19/12/53/bread-1839602_1280.jpg',
        info: 'Feito com farinhas alternativas, ideal para dietas sem glúten.'
    },
    {
        nome: 'Queijo sem lactose',
        categoria: 'sem-lactose',
        descricao: 'Queijo ideal para intolerantes à lactose.',
        preco: 15,
        imagem: 'https://cdn.pixabay.com/photo/2016/03/05/19/02/cheese-1238395_1280.jpg',
        info: 'Feito com tecnologias de remoção de lactose.'
    },
    {
        nome: 'Leite de soja',
        categoria: 'vegano',
        descricao: 'Leite vegetal indicado para veganos.',
        preco: 6,
        imagem: 'https://cdn.pixabay.com/photo/2018/07/23/17/21/soya-bean-3554207_1280.jpg',
        info: 'Leite 100% vegetal, rico em proteínas e isento de lactose.'
    }
];

// Cria card de produto
function criarProduto(produto) {
    const div = document.createElement('div');
    div.className = 'produto';

    div.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}" />
        <h3>${produto.nome}</h3>
        <p>${produto.descricao}</p>
        <p><strong>Preço:</strong> R$ ${produto.preco.toFixed(2)}</p>
        <button onclick='mostrarInformacoes(${JSON.stringify(produto)})'>Mais Informações</button>
    `;

    return div;
}

// Renderiza produtos com filtro
function gerarProdutos(categoria = 'todos') {
    const grid = document.getElementById('produtos-grid');
    grid.innerHTML = '';
    const filtrados = categoria === 'todos'
        ? produtos
        : produtos.filter(p => p.categoria === categoria);

    filtrados.forEach(p => grid.appendChild(criarProduto(p)));
}

function filtrarProdutosPorCategoria() {
    const categoria = document.getElementById('categoria').value;
    gerarProdutos(categoria);
}

// Modal de detalhes
function mostrarInformacoes(produto) {
    document.getElementById('modal-titulo').textContent = produto.nome;
    document.getElementById('modal-descricao').textContent = produto.descricao;
    document.getElementById('modal-preco').textContent = `Preço: R$ ${produto.preco.toFixed(2)}`;
    document.getElementById('modal-info').textContent = produto.info;
    document.getElementById('modal').style.display = 'flex';
}

function fecharModal() {
    document.getElementById('modal').style.display = 'none';
}

// Alterna abas
function mostrarAba(id) {
    const abas = document.querySelectorAll('.aba');
    abas.forEach(aba => aba.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

// Envio do perfil
document.getElementById('perfil-form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Perfil salvo com sucesso!');
});

// Chatbot simples
function enviarMensagem() {
    const input = document.getElementById('chat-input');
    const mensagens = document.getElementById('chat-mensagens');

    const texto = input.value.trim();
    if (!texto) return;

    const userMsg = document.createElement('div');
    userMsg.innerHTML = `<strong>Você:</strong> ${texto}`;
    mensagens.appendChild(userMsg);

    const botMsg = document.createElement('div');
    botMsg.innerHTML = `<strong>Bot:</strong> ${gerarRespostaBot(texto)}`;
    mensagens.appendChild(botMsg);

    mensagens.scrollTop = mensagens.scrollHeight;
    input.value = '';
}

// Resposta básica de IA fake
function gerarRespostaBot(msg) {
    const lower = msg.toLowerCase();
    if (lower.includes('produto') || lower.includes('dica')) return 'Você pode conferir a aba de Produtos para mais informações!';
    if (lower.includes('perfil') || lower.includes('salvar')) return 'Preencha a aba de Perfil com suas informações pessoais.';
    return 'Desculpe, ainda estou aprendendo! Tente novamente com outra pergunta.';
}

// Inicia com a aba "sobre"
mostrarAba('sobre');
gerarProdutos();
