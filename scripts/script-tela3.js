let dadosQuizz = {};

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

function validarPerguntas(qtddNiveis) {
    dadosQuizz.questions = [];
    let perguntasValidas = true;   

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

            let dadosPerguntas = {}
            dadosPerguntas = {
                title: perguntas[i].children[1].value,
                color: perguntas[i].children[2].value,
                answers: [
                    {
                        text: perguntas[i].children[4].value,
                        image: perguntas[i].children[5].value,
                        isCorrectAnswer: true
                    },
                    {
                        text: perguntas[i].children[7].value,
                        image: perguntas[i].children[8].value,
                        isCorrectAnswer: false
                    }
                ]
            };

            if(perguntas[i].children[9].value.length !== 0 && perguntas[i].children[10].value.length !== 0){
                dadosPerguntas.answers.push({
                    text: perguntas[i].children[9].value,
                    image: perguntas[i].children[10].value,
                    isCorrectAnswer: false
                });

                if(perguntas[i].children[11].value.length !== 0 && perguntas[i].children[12].value.length !== 0){
                    dadosPerguntas.answers.push({
                        text: perguntas[i].children[11].value,
                        image: perguntas[i].children[12].value,
                        isCorrectAnswer: false
                    });
                }
            }

            dadosQuizz.questions.push(dadosPerguntas);

            perguntasValidas = perguntasValidas && true;

        } else {
            perguntasValidas = perguntasValidas && false;
        }
    }

    if(perguntasValidas === false){
        alert("Preenchas os dados corretamente.");
    } else {
        criarQuizzNiveis(qtddNiveis);
    }
}

function criarQuizzNiveis(qtddNiveis) {
    document.querySelector(".container-tela3").innerHTML = `
        <h1>Agora, decida os níveis!</h1>
        <div class="niveis"></div>
        <button onclick="validarNiveis()">Finalizar Quizz</button>
    `;

    for (let i = 1; i <= qtddNiveis; i++) {
        document.querySelector(".container-tela3 .niveis").innerHTML += `
            <section class="cria-niveis">
                <span>
                    <h2>Nível ${i}</h2>
                    <img  onclick="expandirNiveis(this, ${i})" src="./assets/editar.png" alt="editar">
                </span>
            </section>
        `;

    }
}

function expandirNiveis(botaoExpandir, numeroNivel) {
    botaoExpandir.parentNode.parentNode.innerHTML = `
        <h2>Nível ${numeroNivel}</h2>
        <input type="text" class="titulo-nivel" placeholder="Título do Nível">
        <input type="text" class="acerto-minimo" placeholder="% de acerto mínima">
        <input type="url" class="url-imagem-nivel" placeholder="URL da imagem do nível">  
        <textarea cols="45" rows="10" class="descricao-nivel" placeholder="Descrição do nível"></textarea>
    `;
}

function validarNiveis() {
    let niveisValidos = true;

    dadosQuizz.levels = [];

    let porcentagemMinimaZeroArray = [];

    const niveis = document.querySelector(".container-tela3 .niveis").children;

    for (let i = 0; i < niveis.length; i++){
        let tituloNivelValido = (niveis[i].children[1].value.length !== 0) && (niveis[i].children[1].value.length >= 10);
        let porcentagemMinimaValida = (niveis[i].children[2].value.length !== 0) && (niveis[i].children[2].value >= 0) && (niveis[i].children[2].value <=100);
        let porcentagemMinimaZero = niveis[i].children[2].value == 0;
        let urlValida = (niveis[i].children[3].value.length !== 0) && (/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/).test(niveis[i].children[3].value);
        let descricaoValida = (niveis[i].children[4].value.length >= 30) && (niveis[i].children[4].value.length !== 0);
        
        if (tituloNivelValido && porcentagemMinimaValida && urlValida && descricaoValida) {
            let dadosNiveis = {};
            dadosNiveis = {
                title: niveis[i].children[1].value,
                image: niveis[i].children[3].value,
                text: niveis[i].children[4].value,
                minValue: Number(niveis[i].children[2].value)
            };
            
            dadosQuizz.levels.push(dadosNiveis);
            
            niveisValidos = niveisValidos && true;

            porcentagemMinimaZeroArray.push(porcentagemMinimaZero);

        } else {
            niveisValidos = niveisValidos && false;
        }
    }
    if((niveisValidos === false) || (porcentagemMinimaZeroArray.every(elemento => elemento === false))){
        alert("Preenchas os dados corretamente.");
    } else {
        enviarDadosQuizz();
        console.log(dadosQuizz);
    }
}
//testes

// dadosQuizz = {
// 	title: "Título do quizz",
// 	image: "https://http.cat/411.jpg",
// 	questions: [
// 		{
// 			title: "Título da pergunta 1",
// 			color: "#123456",
// 			answers: [
// 				{
// 					text: "Texto da resposta 1",
// 					image: "https://http.cat/411.jpg",
// 					isCorrectAnswer: true
// 				},
// 				{
// 					text: "Texto da resposta 2",
// 					image: "https://http.cat/412.jpg",
// 					isCorrectAnswer: false
// 				}
// 			]
// 		},
// 		{
// 			title: "Título da pergunta 2",
// 			color: "#123456",
// 			answers: [
// 				{
// 					text: "Texto da resposta 1",
// 					image: "https://http.cat/411.jpg",
// 					isCorrectAnswer: true
// 				},
// 				{
// 					text: "Texto da resposta 2",
// 					image: "https://http.cat/412.jpg",
// 					isCorrectAnswer: false
// 				}
// 			]
// 		},
// 		{
// 			title: "Título da pergunta 3",
// 			color: "#123456",
// 			answers: [
// 				{
// 					text: "Texto da resposta 1",
// 					image: "https://http.cat/411.jpg",
// 					isCorrectAnswer: true
// 				},
// 				{
// 					text: "Texto da resposta 2",
// 					image: "https://http.cat/412.jpg",
// 					isCorrectAnswer: false
// 				}
// 			]
// 		}
// 	],
// 	levels: [
// 		{
// 			title: "Título do nível 1",
// 			image: "https://http.cat/411.jpg",
// 			text: "Descrição do nível 1",
// 			minValue: 0
// 		},
// 		{
// 			title: "Título do nível 2",
// 			image: "https://http.cat/412.jpg",
// 			text: "Descrição do nível 2",
// 			minValue: 50
// 		}
// 	]
// };

function enviarDadosQuizz(){
    esconderTela1();
    let promessa = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", dadosQuizz);
    promessa.then(criarQuizzSucesso);
}

function criarQuizzSucesso(resposta) {
    let quizzesUsuario = localStorage.getItem("quizzesUsuario");
    let quizzesUsuariosDeserializados = JSON.parse(quizzesUsuario);
    quizzesUsuariosDeserializados.push(resposta.data.id);
    let quizzesUsuariosSerializadosAtualizado = JSON.stringify(quizzesUsuariosDeserializados);
    localStorage.setItem("quizzesUsuario", quizzesUsuariosSerializadosAtualizado);

    console.log(JSON.parse(localStorage.getItem("quizzesUsuario")));

    document.querySelector(".container-tela3").innerHTML = `
        <h1>Seu quizz está pronto!</h1>
        <section class="sucesso-quizz">
            <img src="${resposta.data.image}" alt="${resposta.data.title}">
            <h3>${resposta.data.title}</h3>
        </section>
        <button onclick="esconderTela3(); chamarTela2(${resposta.data.id})" >Acessar Quizz</button>
        <p onclick="esconderTela3(); chamarTela1()" >Voltar pra home</p>
    `;
}