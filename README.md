# jogo-toupeira-web-js
**Aluna:** Ianna Flayser Garcia Rocha

**Projeto no ar:** https://inanni21.github.io/jogo-toupeira-web-js/

## Mecânica escolhida e tema

**Mecânica:** Acertar a Toupeira — toupeiras aparecem em buracos aleatórios do grid por um tempo curto; o jogador precisa clicar nela antes que escape.

**Tema visual:** simples e lúdico, usando emoji de toupeira (🐹) sobre um grid de "buracos" marrons, com cores fortes e alto contraste.

## Briefing do cliente

**Público-alvo escolhido:** Criança de 6 anos.

Isso exigiu: alvos grandes (buracos ocupam boa parte do grid), ritmo mais lento (toupeira fica visível por pouco mais de 1 segundo), cores fortes e bem contrastadas (verde vibrante para o alvo ativo, marrom escuro para o buraco vazio), e textos simples e diretos na interface ("Pontos", "Vidas", "Tempo").

## Regras do jogo

- O jogador digita o nome e clica em "Jogar" para iniciar.
- Uma toupeira aparece em um buraco aleatório do grid 4x4 por aproximadamente 0,9 segundo.
- Acertar a toupeira ativa: +10 pontos.
- Errar (clicar em buraco vazio) ou deixar a toupeira escapar (não clicar a tempo): perde 1 vida.
- A partida dura 30 segundos.
- O jogo termina quando o tempo chega a 0 ou as vidas chegam a 0, o que acontecer primeiro.
- No final, é exibido o nome do jogador, a pontuação e a opção de jogar novamente, além do ranking dos melhores jogadores.

## Diferencial

**Mecânica original implementada: Sistema de Vidas.**

O jogador começa com 3 vidas (`VIDAS_INICIAIS`). A função `perderVida()` é chamada em dois cenários: quando o jogador clica em um buraco vazio (erro de clique) e quando uma toupeira escapa sem ser clicada dentro do tempo limite (dentro do `setTimeout` em `sortearToupeira()`). Quando as vidas chegam a 0, a função `finalizarJogo()` é acionada automaticamente, mesmo que ainda haja tempo restante na partida — criando uma segunda forma de perder, além do cronômetro, e tornando o jogo mais desafiador.

## Como jogar

1. Acesse o link do projeto publicado.
2. Digite seu nome no campo indicado.
3. Clique em **Jogar**.
4. Clique nas toupeiras (🐹) que aparecem no grid antes que elas escapem.
5. Evite clicar em buracos vazios.
6. Ao acabar o tempo ou as vidas, veja seu resultado e o ranking, e jogue novamente se quiser.

## Como executar

**Opção 1 — Online:** acesse https://inanni21.github.io/jogo-toupeira-web-js/

**Opção 2 — Localmente:**
1. Clone o repositório: `git clone https://github.com/inanni21/jogo-toupeira-web-js.git`
2. Abra a pasta no VS Code (ou outro editor).
3. Abra o arquivo `index.html` com a extensão **Live Server** (ou qualquer servidor local).

## Minhas Decisões

1. **Tamanho e formato do grid:** 4×4 (16 buracos). Escolhi esse tamanho por ser fácil de visualizar inteiro na tela, inclusive no celular, sem precisar rolar a página, e por dar uma quantidade boa de "alvos" para uma criança de 6 anos sem ficar confuso.

2. **Quantidade de cores/elementos:** usei apenas 2 estados visuais (buraco vazio em marrom escuro, buraco ativo em verde vibrante), para manter o alto contraste exigido pelo briefing infantil e facilitar a identificação rápida do alvo.

3. **Fórmula de pontuação:** +10 pontos fixos por acerto, sem multiplicadores ou combos. Optei por algo simples e direto porque o público é uma criança de 6 anos — uma fórmula fácil de entender ("cada toupeira = 10 pontos") ajuda a criança a acompanhar o próprio progresso sem confusão. A dificuldade do jogo já vem de outro lugar (tempo e vidas), não da fórmula de pontos.

4. **Critérios de tempo:** a toupeira fica visível por 1,2 segundo (tempo suficiente para uma criança reagir, sem ser fácil demais) e a partida inteira dura 30 segundos — duração curta o bastante para manter a atenção do público infantil.

5. **Curva de dificuldade:** o jogo não aumenta a velocidade progressivamente (ficaria mais difícil de prever para uma criança); a dificuldade vem da combinação de tempo limitado e vidas limitadas, mantendo o jogo previsível e justo para o público escolhido.

6. **Condição de término:** o jogo termina quando o tempo chega a zero ou quando as vidas chegam a zero — o que ocorrer primeiro. Isso garante que tanto jogadores rápidos (que perdem por errar muito) quanto jogadores lentos (que perdem por tempo) tenham uma experiência justa.

## Reflexão obrigatória

**1. Qual foi o bug mais chato e como resolveu?**

O bug mais chato foi o CSS não carregar de jeito nenhum, mesmo com o conteúdo certo no arquivo. A página aparecia toda sem estilo, com as 3 telas (inicial, jogo e final) sobrepostas e visíveis ao mesmo tempo, porque a classe `.escondida` (que depende do CSS) não existia para o navegador. Depois de revisar o nome do arquivo, descobri que ele estava salvo como `styless.css` (com uma letra "s" extra) enquanto o `index.html` apontava para `styles.css`. Corrigi renomeando o arquivo para o nome exato esperado.

**2. Por que escolheu essa fórmula de pontuação?**

Escolhi pontuação fixa (+10 por acerto) porque o briefing do cliente é uma criança de 6 anos. Fórmulas com combo, multiplicador ou penalidade na pontuação (em vez de só nas vidas) tornariam mais difícil para a criança entender por que a pontuação subiu daquele jeito. Mantive a complexidade do jogo nas vidas e no tempo, e deixei a pontuação como uma contagem simples e direta.

**3. Como o briefing do cliente mudou suas decisões?**

O briefing de "criança de 6 anos" influenciou diretamente o tamanho dos alvos (grandes e redondos, fáceis de acertar mesmo com pouca precisão motora), o tempo que a toupeira fica visível (pouco mais que 1 segundo, mais lento do que seria para um público adulto), as cores (contraste bem alto entre buraco vazio e ativo) e a simplicidade da fórmula de pontuação e das mensagens na tela.

**4. Se tivesse mais uma semana, o que mudaria?**

Eu implementaria **níveis de dificuldade progressivos** — por exemplo, a cada X acertos, o tempo que a toupeira fica visível diminuiria um pouco, tornando o jogo gradualmente mais desafiador dentro da mesma partida, em vez de manter um ritmo fixo do início ao fim. Assim, o jogo poderia ser mais interessante para jogadores com idades maiores que 6 anos

**5. Aponte uma função sua que ficou boa e explique o que ela faz.**

A função `sortearToupeira()` ficou boa porque concentra toda a lógica de uma "rodada" de forma organizada: ela primeiro desativa a toupeira anterior (se houver), sorteia um novo buraco aleatório, ativa visualmente esse buraco, guarda a referência no estado do jogo, e programa um `setTimeout` que verifica — antes de agir — se aquela ainda é a toupeira ativa, evitando conflito caso o jogador já tenha clicado nela antes do tempo acabar. Essa checagem (`estadoJogo.buracoAtivoAtual === buracoEscolhido`) foi importante para evitar um bug sutil de descontar vida indevidamente quando o jogador já tinha acertado a toupeira.

## Declaração de uso de IA

Usei o Claude como apoio durante o desenvolvimento, principalmente para:
- Estruturar o planejamento e dividir a atividade em etapas dentro do prazo.
- Tirar dúvidas sobre organização de funções em JavaScript, sobre como persistir dados com `localStorage` e outras partes em que tive dificuldade de desenvolver o código.
- Identificar e entender a causa de bugs (como o erro de nome do arquivo CSS e o de múltiplos `setInterval` acumulando).
- Revisar a clareza visual da interface (contraste entre estados do grid).
- Criar a licença.

## Bônus

1. **Mecânica original (Sistema de Vidas):** descrita na seção "Seu diferencial" acima. Implementada através da função `perderVida()`, acionada tanto em cliques errados quanto em toupeiras que escapam sem serem clicadas.

2. **Ranking dos melhores jogadores:** critério escolhido foi **maior pontuação primeiro**. Os resultados são salvos no `localStorage` (chave `rankingAcerteAToupeira`) como uma lista de objetos `{nome, pontuacao}`. A cada fim de partida, a função `salvarResultadoNoRanking()` adiciona o novo resultado, reordena a lista do maior para o menor, mantém apenas os 5 melhores, e salva de volta no `localStorage` como texto JSON. A função `exibirRanking()` desenha essa lista na tela pelo DOM.

3. **Jogo responsivo:** o layout usa CSS Grid/Flexbox com `aspect-ratio` nos buracos (mantendo proporção quadrada em qualquer tamanho de tela) e uma media query (`@media (max-width: 480px)`) que ajusta tamanhos de fonte e espaçamentos para telas de celular. Testado e funcionando tanto no modo responsivo do DevTools quanto em proporções de tela pequenas.

## Créditos

- Emojis (🐹, 🏆, etc.) são caracteres Unicode padrão, sem necessidade de licenciamento.
- Nenhuma biblioteca, framework ou recurso externo (imagem, som, fonte) foi utilizado. Todo o projeto é HTML, CSS e JavaScript puro.
- Apoio de IA (Claude, da Anthropic) conforme descrito na Declaração de uso de IA.
- Ianna Flayser, aluna que pensou no jogo.

## Licença

Este projeto está licenciado sob a licença MIT.
