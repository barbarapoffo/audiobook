// constante que busca o elemento pelo ID no HTML, utilizando o id "play-pause" //

const botaoPlayPause = document.getElementById("play-pause"); 

// constante que busca no HTML o botão de avançar, utilizando o id "proximo" //

const botaoAvançar = document.getElementById("proximo");

// constante que busca no HTML o botão de avançar, utilizando o id "anterior" //

const botaoAnterior = document.getElementById("anterior");

// constante que busca no HTML o capítulo, utilizando o id "audio-capitulo" //

const audioCapitulo = document.getElementById("audio-capitulo"); 

// constante que busca no HTML o nome do capítulo, utilizando o id "capitulo" //

const nomeCapitulo = document.getElementById("capitulo");

// variável que pode ter ser valor alterado, que uso para saber se está tocando ou não; inicia com false pois começa sem estar tocando //

let taTocando = false;

// variável para saber qual é o capítulo que está tocando //

let capituloAtual = 1;

const totalCapitulos = 40;

// função para dar play; utilizo a const audioCapitulo e coloco o .play (função própria do js) e transformo o "taTocando" para true //
// nessa mesma função, removo a classe do elemento (no caso é o ícone que estou usando para representar o "play") e adiciono uma nova (ícone de pause) //

function tocarAudio () {

  audioCapitulo.play();
  taTocando = true;
  botaoPlayPause.classList.remove ("bi-play-circle-fill");
  botaoPlayPause.classList.add ("bi-pause-circle-fill");  
}

// função para pausar o áudio, utilizando a const de audioCapitulo também, e o .pause, que tb é uma função própria do js, transformo novamente o "taTocando" em false //
// nessa mesma função, removo a classe do elemento (no caso é o ícone que estou usando para representar o "pause") e adiciono uma nova (ícone de play) //

function pausarAudio () {

  audioCapitulo.pause();
  taTocando = false;
  botaoPlayPause.classList.remove ("bi-pause-circle-fill");
  botaoPlayPause.classList.add ("bi-play-circle-fill");  
}

// função para saber se pausa ou da play; utilizo as funções anteriores "pausarAudio" e "tocarAudio" e a condicional; se estiver tocando (true), ele pausa, se não, ele toca //

function tocarOuPausar () {

  if (taTocando === true) {
    pausarAudio();  
  } else {
    tocarAudio();
  }
}

// função para trocar o nome do capitulo que aparece na tela, aqui pego a variavel "nomeCapitulo", que recebe o valor do id "capitulo", e substituo seu texto (utilizando a função 'innerText', que busca o texto no HTML) pelo valor do capitulo atual //

function trocarNomeCapitulo () {

  nomeCapitulo.innerText = "Capítulo " + capituloAtual;
}

// aqui incremento um capítulo no capituloAtual até chegar no capitulo final. SE o capitulo atual for igual ao total de capitulos, ou seja, se estiver no ultimo capitulo, ele retorna ao capitulo inicial. SE NAO, ele incrementa e vai passando para o proximo //
// nessa mesma função, após definir se troco a faixa ou reseto para o início, faço a alteraçao do numero do capitulo, fazendo a variavel que busca o capitulo (audioCapitulo) modificar o seu caminho (src) acrescentando o numero do capitulo atualizado //
// também chamo a funçao tocarAudio, para quando passar a faixa ele ja iniciar tocando e nao no pause; acrescento o "taTocando = true" pq mesmo que ao passar faixa ele estivesse pausado (false), eu quero que se torne verdadeiro e inicie o play //
// chamo tb a função trocarNomeCapitulo para poder atualizar o nome que aparece na tela //

function proximaFaixa () {

  if (capituloAtual === totalCapitulos) {
    capituloAtual = 1;
  } else {
    capituloAtual++;
  }

  audioCapitulo.src="./assets/book/" + capituloAtual + ".mp3";
  tocarAudio();
  taTocando = true;
  trocarNomeCapitulo();
}

// função para retornar faixa anterior, bem parecida com a de passar faixa, porém a condição é SE o capitulo atual for igual ao primeiro capitulo, ele retorna para o último capitulo, se não, ele diminui um capitulo; o restante é igual (toca audio, define como verdadeiro e troca o valor do src) //
// chamo tb a função trocarNomeCapitulo para poder atualizar o nome que aparece na tela //

function faixaAnterior () {

  if (capituloAtual === 1) {
    capituloAtual = totalCapitulos;
  } else {
    capituloAtual = capituloAtual - 1;
  }

  audioCapitulo.src="./assets/book/" + capituloAtual + ".mp3";
  tocarAudio();
  taTocando = true;
  trocarNomeCapitulo();
}

// aqui estou adicionando um evento para a variável "botaoPlayPause"; o parametro para iniciar esse evento é receber um click, e sua ação será tocarOuPausar //

botaoPlayPause.addEventListener("click", tocarOuPausar);

// adiciono evento para o clique do botão "proximo", executando a função proximaFaixa //

botaoAvançar.addEventListener("click", proximaFaixa);

// adiciono evento para o clique do botão "anterior", executando a função faixaAnterior //

botaoAnterior.addEventListener("click", faixaAnterior);