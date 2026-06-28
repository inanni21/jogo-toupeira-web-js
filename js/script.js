// ===== Configurações do jogo =====
// Defino aqui os parâmetros principais, assim fica fácil ajustar sem caçar número espalhado pelo código.
const QUANTIDADE_COLUNAS = 4;
const QUANTIDADE_LINHAS = 4;
const QUANTIDADE_BURACOS = QUANTIDADE_COLUNAS * QUANTIDADE_LINHAS;
const TEMPO_TOUPEIRA_ATIVA_MS = 900; // quanto tempo a toupeira fica visível antes de esconder
const PONTOS_POR_ACERTO = 10;
const VIDAS_INICIAIS = 3;
const TEMPO_PARTIDA_SEGUNDOS = 30;

// ===== Estado do jogo =====
// Guardo o estado em um único objeto para não espalhar variáveis globais soltas.
const estadoJogo = {
  nomeJogador: '',
  pontuacao: 0,
  vidas: VIDAS_INICIAIS,
  tempoRestante: TEMPO_PARTIDA_SEGUNDOS,
  buracoAtivoAtual: null,   // referência do elemento que está com a toupeira "ativa" no momento
  intervaloSorteio: null,   // guarda o id do setInterval do sorteio, para poder cancelar depois
  intervaloCronometro: null // guarda o id do setInterval do tempo, para poder cancelar depois
};

// ===== Referências dos elementos da tela =====
const telaInicial = document.getElementById('telaInicial');
const telaJogo = document.getElementById('telaJogo');
const telaFinal = document.getElementById('telaFinal');

const inputNomeJogador = document.getElementById('inputNomeJogador');
const botaoJogar = document.getElementById('botaoJogar');
const gridToupeiras = document.getElementById('gridToupeiras');
const textoPontuacao = document.getElementById('textoPontuacao');
const textoVidas = document.getElementById('textoVidas');
const textoTempo = document.getElementById('textoTempo');
const botaoJogarNovamente = document.getElementById('botaoJogarNovamente');
const textoResultadoNome = document.getElementById('textoResultadoNome');
const textoResultadoPontuacao = document.getElementById('textoResultadoPontuacao');

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

  // Depois de um tempo, se o jogador não clicou, a toupeira escapa e custa uma vida.
  setTimeout(() => {
    // Só processa se essa ainda for a toupeira ativa (evita conflito se o jogador já clicou e outra apareceu).
    if (estadoJogo.buracoAtivoAtual === buracoEscolhido) {
      buracoEscolhido.classList.remove('buracoAtivo');
      buracoEscolhido.textContent = '';
      estadoJogo.buracoAtivoAtual = null;
      perderVida(); // toupeira escapou sem ser clicada
    }
  }, TEMPO_TOUPEIRA_ATIVA_MS);
}

// ===== Funções de pontuação =====
// Fórmula escolhida: +10 pontos por acerto, fixo. Optei por um valor fixo (sem combo ou
// penalidade na pontuação) porque o briefing é "criança de 6 anos" — uma fórmula simples
// é mais fácil da criança entender o próprio progresso. A dificuldade já vem do tempo e das vidas.
function atualizarPontuacao(pontos) {
  estadoJogo.pontuacao += pontos;
  textoPontuacao.textContent = `Pontos: ${estadoJogo.pontuacao}`;
}

// ===== Funções de vidas =====
// Função única responsável por descontar e checar o fim de jogo por vidas.
function perderVida() {
  estadoJogo.vidas -= 1;
  textoVidas.textContent = `Vidas: ${estadoJogo.vidas}`;

  if (estadoJogo.vidas <= 0) {
    finalizarJogo();
  }
}

// ===== Funções de tempo =====
// Conta o tempo restante da partida e finaliza o jogo quando chega a zero.
function iniciarCronometro() {
  estadoJogo.intervaloCronometro = setInterval(() => {
    estadoJogo.tempoRestante -= 1;
    textoTempo.textContent = `Tempo: ${estadoJogo.tempoRestante}`;

    if (estadoJogo.tempoRestante <= 0) {
      finalizarJogo();
    }
  }, 1000);
}

// ===== Tratamento de clique =====
// Decide o que acontece quando o jogador clica em um buraco do grid.
function tratarCliqueNoBuraco(buracoClicado) {
  const acertou = buracoClicado.classList.contains('buracoAtivo');

  if (acertou) {
    atualizarPontuacao(PONTOS_POR_ACERTO);
    buracoClicado.classList.remove('buracoAtivo');
    buracoClicado.textContent = '';
    estadoJogo.buracoAtivoAtual = null;
  } else {
    // Clicou em um buraco vazio: conta como erro e custa uma vida.
    perderVida();
  }
}

// ===== Fim de jogo =====
// Função única responsável por parar os timers e exibir a tela final.
// Condição de término: vidas chegam a 0 OU o tempo da partida acaba (o que ocorrer primeiro).
function finalizarJogo() {
  clearInterval(estadoJogo.intervaloSorteio);
  clearInterval(estadoJogo.intervaloCronometro);

  textoResultadoNome.textContent = `Jogador: ${estadoJogo.nomeJogador}`;
  textoResultadoPontuacao.textContent = `Pontuação final: ${estadoJogo.pontuacao}`;

  mostrarTela(telaFinal);
}

// ===== Início do jogo =====
function iniciarJogo() {
  // Cancelo qualquer intervalo de uma partida anterior antes de começar uma nova,
  // para não acumular sorteios e cronômetros rodando ao mesmo tempo.
  clearInterval(estadoJogo.intervaloSorteio);
  clearInterval(estadoJogo.intervaloCronometro);

  estadoJogo.nomeJogador = inputNomeJogador.value.trim() || 'Jogador';
  estadoJogo.pontuacao = 0;
  estadoJogo.vidas = VIDAS_INICIAIS;
  estadoJogo.tempoRestante = TEMPO_PARTIDA_SEGUNDOS;
  estadoJogo.buracoAtivoAtual = null;

  textoPontuacao.textContent = 'Pontos: 0';
  textoVidas.textContent = `Vidas: ${VIDAS_INICIAIS}`;
  textoTempo.textContent = `Tempo: ${TEMPO_PARTIDA_SEGUNDOS}`;

  gerarGrid();
  mostrarTela(telaJogo);

  estadoJogo.intervaloSorteio = setInterval(sortearToupeira, TEMPO_TOUPEIRA_ATIVA_MS + 200);
  iniciarCronometro();
}

// ===== Eventos =====
botaoJogar.addEventListener('click', iniciarJogo);
botaoJogarNovamente.addEventListener('click', () => mostrarTela(telaInicial));