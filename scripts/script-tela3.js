function criarQuizzInfoBasicas() {
    document.querySelector(".container-tela3").innerHTML = `
        <h1>Comece pelo começo</h1>
        <section class="info-basicas">
            <input type="text" class="titulo" placeholder="Título do quizz">
            <input type="url" class="url-imagem-quizz" placeholder="URL da imagem do seu quizz">
            <input type="text" class="quantidade-perguntas" placeholder="Quantidade de perguntas do quizz">
            <input type="text" class="quantidade-niveis" placeholder="Quantidade de níveis do quizz">  
        </section>
        <button onclick="criarQuizzPerguntas()">Prosseguir para criar perguntas</button>
    `;
}

function criarQuizzPerguntas() {
    document.querySelector(".container-tela3").innerHTML = `
        <h1>Crie suas perguntas</h1>
        <section class="cria-perguntas">
            <h2>Pergunta X</h2>
            <input type="text" class="texto-pergunta" placeholder="Texto da pergunta">
            <input type="text" class="cor-fundo-pergunta" placeholder="Cor de fundo da pergunta">

            <h2>Resposta correta</h2>
            <input type="text" class="resposta resposta-correta" placeholder="Resposta correta">
            <input type="url" class="url-imagem" placeholder="URL da imagem">  

            <h2>Respostas incorretas</h2>
            <input type="text" class="resposta resposta-incorreta" placeholder="Resposta Incorreta X">
            <input type="url" class="url-imagem" placeholder="URL da imagem X">  
            <input type="text" class="resposta resposta-incorreta" placeholder="Resposta Incorreta X">
            <input type="url" class="url-imagem" placeholder="URL da imagem X">  
            <input type="text" class="resposta resposta-incorreta" placeholder="Resposta Incorreta X">
            <input type="url" class="url-imagem" placeholder="URL da imagem X">  
        </section>

        <section class="cria-perguntas">
            <span>
                <h2>Pergunta X</h2>
                <img src="./assets/editar.png" alt="editar">
            </span>
        </section>

        <section class="cria-perguntas">
            <span>
                <h2>Pergunta X</h2>
                <img src="./assets/editar.png" alt="editar">
            </span>
        </section>

        <button onclick="criarQuizzNiveis()">Prosseguir para criar níveis</button>
    `;
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
            <img src="./assets/teste.png" alt="imagem de fundo">
            <h3>O quão Potterhead é você?</h3>
        </section>
        <button>Acessar Quizz</button>
        <p>Voltar pra home</p>
    `;
}