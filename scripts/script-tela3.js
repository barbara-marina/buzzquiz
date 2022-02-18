let dadosQuizz = {};
let perguntasValidas = true;


function criarQuizzInfoBasicas() {
    esconderTela1();
    document.querySelector(".container-tela3").innerHTML = `
        <h1>Comece pelo começo</h1>
        <section class="info-basicas">
            <input type="text" class="titulo" placeholder="Título do quizz">
            <input type="url" class="url-imagem-quizz" placeholder="URL da imagem do seu quizz">
            <input type="text" class="quantidade-perguntas" placeholder="Quantidade de perguntas do quizz">
            <input type="text" class="quantidade-niveis" placeholder="Quantidade de níveis do quizz">  
        </section>
        <button onclick="validarInfoBasicas()">Prosseguir para criar perguntas</button>
    `;
}

function validarInfoBasicas() {
    let tituloQuizz = document.querySelector(".container-tela3 .titulo").value;
    let urlImagem = document.querySelector(".container-tela3 .url-imagem-quizz").value;
    let qtddPerguntas = document.querySelector(".container-tela3 .quantidade-perguntas").value;
    let qtddNiveis = document.querySelector(".container-tela3 .quantidade-niveis").value;

    let validacaoTitulo = (tituloQuizz.length >= 20) && (tituloQuizz.length <= 65);
    let validacaoUrlImagem = (/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/).test(urlImagem);
    let validacaoQtssPerguntas = Number(qtddPerguntas) >=3;
    let validacaoQtssNiveis = Number(qtddNiveis) >= 2;
    
    if (validacaoTitulo && validacaoUrlImagem && validacaoQtssPerguntas && validacaoQtssNiveis) {
        dadosQuizz.title = tituloQuizz;
        dadosQuizz.image = urlImagem;
        criarQuizzPerguntas(qtddPerguntas, qtddNiveis);
    } else {
        alert("Prencha os dados corretamente!");
    }
}

function criarQuizzPerguntas(qtddPerguntas, qtddNiveis) {
    document.querySelector(".container-tela3").innerHTML = `
        <h1>Crie suas perguntas</h1>
        <div class="perguntas"></div>
        <button onclick="validarPerguntas(${qtddNiveis})">Prosseguir para criar níveis</button>
    `;

    for (let i = 1; i <= qtddPerguntas; i++) {
        document.querySelector(".container-tela3 .perguntas").innerHTML += `
             <section class="cria-perguntas">
                <span>
                    <h2>Pergunta ${i}</h2>
                    <img onclick="expandirPergunta(this, ${i})" src="./assets/editar.png" alt="expandir">
                </span>
            </section>
        `;
    }
}

function expandirPergunta(botaoExpandir, numeroPergunta) {
    botaoExpandir.parentNode.parentNode.innerHTML = `
        <h2>Pergunta ${numeroPergunta}</h2>
        <input type="text" class="texto-pergunta" placeholder="Texto da pergunta">
        <input type="text" class="cor-fundo-pergunta" placeholder="Cor de fundo da pergunta">

        <h2>Resposta correta</h2>
        <input type="text" class="resposta resposta-correta" placeholder="Resposta correta">
        <input type="url" class="url-imagem" placeholder="URL da imagem">  

        <h2>Respostas incorretas</h2>
        <input type="text" class="resposta resposta-incorreta" placeholder="Resposta Incorreta 1">
        <input type="url" class="url-imagem" placeholder="URL da imagem 1">  
        <input type="text" class="resposta resposta-incorreta" placeholder="Resposta Incorreta 2">
        <input type="url" class="url-imagem" placeholder="URL da imagem 2">  
        <input type="text" class="resposta resposta-incorreta" placeholder="Resposta Incorreta 3">
        <input type="url" class="url-imagem" placeholder="URL da imagem 3">  
    `;
}

function validarPerguntas() {
    const perguntas = document.querySelector(".container-tela3 .perguntas").children;

    for (let i = 0; i < perguntas.length; i++) {
        let tituloValido = perguntas[i].children[1].value.length >= 20;
        let corFundoValida = (/^#[0-9A-F]{6}$/i).test(perguntas[i].children[2].value);
    
        let respostaCorretaValida = perguntas[i].children[4].value.length !== 0;
        let urlImagemCorretaValida = (perguntas[i].children[5].value.length !== 0) && (/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/).test(perguntas[i].children[5].value);
        
        let respostaIncorreta1Valida = perguntas[i].children[7].value.length !== 0;
        let urlImagemIncorreta1Valida = (perguntas[i].children[8].value.length !== 0) && (/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/).test(perguntas[i].children[8].value);
        let incorreta1Valida = respostaIncorreta1Valida && urlImagemIncorreta1Valida;
    
        let respostaIncorreta2Valida = (incorreta1Valida && perguntas[i].children[9].value.length !== 0) || (perguntas[i].children[9].value.length === 0 && perguntas[i].children[10].value.length === 0);
        let urlImagemIncorreta2Valida = ((/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/).test(perguntas[i].children[10].value) && (perguntas[i].children[10].value.length !== 0) && (perguntas[i].children[9].value.length !== 0) && incorreta1Valida) || (perguntas[i].children[9].value.length === 0 && perguntas[i].children[10].value.length === 0);
        let incorreta2Valida = respostaIncorreta2Valida && urlImagemIncorreta2Valida;
    
        let respostaIncorreta3Valida = (incorreta2Valida && perguntas[i].children[11].value.length !== 0) || (perguntas[i].children[11].value.length === 0 && perguntas[i].children[12].value.length === 0);
        let urlImagemIncorreta3Valida = ((/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/).test(perguntas[i].children[12].value) && (perguntas[i].children[12].value.length !== 0) && (perguntas[i].children[11].value.length !== 0) && incorreta2Valida) || (perguntas[i].children[11].value.length === 0 && perguntas[i].children[12].value.length === 0);
        let incorreta3Valida = respostaIncorreta3Valida && urlImagemIncorreta3Valida; 
    
        if (tituloValido && corFundoValida && respostaCorretaValida && urlImagemCorretaValida && incorreta1Valida && incorreta2Valida && incorreta3Valida) {
            perguntasValidas = perguntasValidas && true;
        } else {
            perguntasValidas = perguntasValidas && false;
        }
        console.log(perguntasValidas);
    }

    if(perguntasValidas === false){
        alert("Preenchas os dados corretamente.");
    } else {
        criarQuizzNiveis();
    }
}

function criarQuizzNiveis(qtddNiveis) {
    document.querySelector(".container-tela3").innerHTML = `
        <h1>Agora, decida os níveis!</h1>
        <section class="cria-niveis">
            <h2>Nível X</h2>
            <input type="text" class="titulo-nivel" placeholder="Título do Nível">
            <input type="text" class="acerto-minimo" placeholder="% de acerto mínima">
            <input type="url" class="url-imagem-nivel" placeholder="URL da imagem do nível">  
            <textarea cols="45" rows="10" class="descricao-nivel" placeholder="Descrição do nível"></textarea>
            
        </section>

        <section class="cria-niveis">
            <span>
                <h2>Nível X</h2>
                <img src="./assets/editar.png" alt="editar">
            </span>
        </section>

        <section class="cria-niveis">
            <span>
                <h2>Nível X</h2>
                <img src="./assets/editar.png" alt="editar">
            </span>
        </section>

        <button onclick="criarQuizzSucesso()">Finalizar Quizz</button>
    `;
}

function expandirNiveis() {
    
}

function criarQuizzSucesso() {
    document.querySelector(".container-tela3").innerHTML = `
        <h1>Seu quizz está pronto!</h1>
        <section class="sucesso-quizz">
            <h3>O quão Potterhead é você?</h3>
        </section>
        <button>Acessar Quizz</button>
        <p>Voltar pra home</p>
    `;
}