let dadosQuizz = {};

function criarQuizzInfoBasicas() {
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
        <button onclick="validarPerguntas()">Prosseguir para criar níveis</button>
    `;

    for (let i = 1; i <= qtddPerguntas; i++) {
        document.querySelector(".container-tela3 .perguntas").innerHTML += `
             <section class="cria-perguntas">
                <span>
                    <h2>Pergunta ${i}</h2>
                    <img onclick="expandirPergunta(this, ${i}, ${qtddNiveis})" src="./assets/editar.png" alt="expandir">
                </span>
            </section>
        `;
    }
}

function expandirPergunta(botaoExpandir, numeroPergunta, qtddNiveis) {
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
    let perguntasValidas = true;
}

function criarQuizzNiveis() {
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