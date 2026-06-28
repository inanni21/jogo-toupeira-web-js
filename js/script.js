// ===== Configurações do jogo =====
// Defino aqui os parâmetros principais, assim fica fácil ajustar sem caçar número espalhado pelo código.
const QUANTIDADE_COLUNAS = 4;
const QUANTIDADE_LINHAS = 4;
const QUANTIDADE_BURACOS = QUANTIDADE_COLUNAS * QUANTIDADE_LINHAS;
const TEMPO_TOUPEIRA_ATIVA_MS = 900; // quanto tempo a toupeira fica visível antes de esconder

// ===== Estado do jogo =====
// Guardo o estado em um único objeto para não espalhar variáveis globais soltas.
const estadoJogo = {
  nomeJogador: '',
  pontuacao: 0,
  buracoAtivoAtual: null, // referência do elemento que está com a toupeira "ativa" no momento
  intervaloSorteio: null  // guarda o id do setInterval para poder parar o jogo depois
};

// ===== Referências dos elementos da tela =====
const telaInicial = document.getElementById('telaInicial');
const telaJogo = document.getElementById('telaJogo');
const telaFinal = document.getElementById('telaFinal');

const inputNomeJogador = document.getElementById('inputNomeJogador');
const botaoJogar = document.getElementById('botaoJogar');
const gridToupeiras = document.getElementById('gridToupeiras');
const textoPontuacao = document.getElementById('textoPontuacao');

// Defino a quantidade de colunas no CSS via variável, assim o grid se ajusta automaticamente
document.documentElement.style.setProperty('--colunas', QUANTIDADE_COLUNAS);

// ===== Funções de controle de tela =====
// Função única responsável por trocar qual tela está visível.
function mostrarTela(telaParaMostrar) {
  [telaInicial, telaJogo, telaFinal].forEach((tela) => {
    tela.classList.add('escondida');
  });
  telaParaMostrar.classList.remove('escondida');
}

// ===== Funções do grid =====
// Cria os elementos do grid pelo DOM (sem innerHTML), como exigido na atividade.
function gerarGrid() {
  gridToupeiras.innerHTML = ''; // limpo o grid de uma partida anterior antes de gerar um novo

  for (let i = 0; i < QUANTIDADE_BURACOS; i++) {
    const buraco = document.createElement('div');
    buraco.classList.add('buraco');
    buraco.dataset.indice = i; // uso dataset aqui para identificar cada buraco sem depender de id único por elemento

    buraco.addEventListener('click', () => tratarCliqueNoBuraco(buraco));

    gridToupeiras.appendChild(buraco);
  }
}

// Sorteia um buraco aleatório do grid e marca como "ativo" (com a toupeira aparecendo).
function sortearToupeira() {
  // Se já existir uma toupeira ativa de antes, removo o estado dela primeiro.
  if (estadoJogo.buracoAtivoAtual) {
    estadoJogo.buracoAtivoAtual.classList.remove('buracoAtivo');
  }

  const buracos = gridToupeiras.querySelectorAll('.buraco');
  const indiceSorteado = Math.floor(Math.random() * buracos.length);
  const buracoEscolhido = buracos[indiceSorteado];

  buracoEscolhido.classList.add('buracoAtivo');
  buracoEscolhido.textContent = '🐹';

  estadoJogo.buracoAtivoAtual = buracoEscolhido;

  // Depois de um tempo, se o jogador não clicou, a toupeira esconde sozinha.
  setTimeout(() => {
    // Só esconde se essa ainda for a toupeira ativa (evita conflito se o jogador já clicou e outra apareceu).
    if (estadoJogo.buracoAtivoAtual === buracoEscolhido) {
      buracoEscolhido.classList.remove('buracoAtivo');
      buracoEscolhido.textContent = '';
      estadoJogo.buracoAtivoAtual = null;
    }
  }, TEMPO_TOUPEIRA_ATIVA_MS);
}

// ===== Funções de pontuação =====
// Função única responsável por atualizar a pontuação, tanto no estado quanto na tela.
function atualizarPontuacao(pontos) {
  estadoJogo.pontuacao += pontos;
  textoPontuacao.textContent = `Pontos: ${estadoJogo.pontuacao}`;
}

// ===== Tratamento de clique =====
// Decide o que acontece quando o jogador clica em um buraco do grid.
function tratarCliqueNoBuraco(buracoClicado) {
  const acertou = buracoClicado.classList.contains('buracoAtivo');

  if (acertou) {
    atualizarPontuacao(10); // valor provisório, vou definir a fórmula final na próxima etapa
    buracoClicado.classList.remove('buracoAtivo');
    buracoClicado.textContent = '';
    estadoJogo.buracoAtivoAtual = null;
  }
  // Se clicou errado (buraco vazio), por enquanto não faço nada aqui.
  // Na próxima etapa vou ligar isso ao sistema de vidas.
}

// ===== Início do jogo =====
function iniciarJogo() {
  estadoJogo.nomeJogador = inputNomeJogador.value.trim() || 'Jogador';
  estadoJogo.pontuacao = 0;

  textoPontuacao.textContent = 'Pontos: 0';

  gerarGrid();
  mostrarTela(telaJogo);

  // A cada intervalo de tempo, uma nova toupeira é sorteada no grid.
  estadoJogo.intervaloSorteio = setInterval(sortearToupeira, TEMPO_TOUPEIRA_ATIVA_MS + 200);
}

// ===== Eventos =====
botaoJogar.addEventListener('click', iniciarJogo);