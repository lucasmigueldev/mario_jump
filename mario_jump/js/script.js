const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const moeda = document.querySelector('.moeda');
const pontosSpan = document.getElementById('pontos');
const moedaSpan = document.getElementById('moedas');

const musicaFundo = document.getElementById('musica-fundo');
const somGameOver = document.getElementById('som-gameover');
const somMoeda = document.getElementById('som-moeda');

// Adiciona esta linha para pré-carregar o som do game over:
somGameOver.load();

let pontos = 0;
let canoJaContado = false;

let moedas = 0;
let moedaColetada = false;

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

const loop = setInterval(() => {

    const moedaPosition = moeda.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (moedaPosition <= 120 && moedaPosition > 0 && marioPosition > 80 && !moedaColetada) {
        moedas++;
        moedaSpan.textContent = moedas;

        /* Adiciona som ao pegar as Moedas */
        somMoeda.currentTime = 0;
        somMoeda.play();

        /* Faz moeda sumir e voltar depois */
        moeda.style.display = "none";
        moedaColetada = true;

        setTimeout(() => {
            moeda.style.display = "block"
            moedaColetada = false
        }, 2000);

    }

    console.log('loop')

    const pipePosition = pipe.offsetLeft;


    if (pipePosition <= 0 && !canoJaContado) {
        pontos++;
        pontosSpan.textContent = pontos;
        canoJaContado = true;
    }

    if (pipePosition > 120 ) {
        canoJaContado = false;
    }


    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = "./img/game-over.png"
        mario.style.width = '75px'
        mario.style.marginLeft = '50px'


        clearInterval(loop);

        pipe.style.animation = 'none';
        pipe.style.left = `${pipe.offsetLeft}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;
        mario.src = "./img/game-over.png";
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        // Pausa música de fundo e toca som do game over
        musicaFundo.pause();
        musicaFundo.currentTime = 0;

        // Garante que o som do game over no início, sem atraso
        somGameOver.pause();
        somGameOver.currentTime = 0;
        somGameOver.play();

        // Exibe tela de Game Over
        document.getElementById('game-over-screen').style.display = 'block';

    }


}, 10);

document.addEventListener('keydown', jump);


function reiniciarJogo() {
    location.reload();
}