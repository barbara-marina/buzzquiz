const URL_POST_CRIAR_QUIZZ = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
let dadosQuizz = {};

function criarQuizzInfoBasicas() {
    //mostrarLoading()
    esconderTela1();
    document.querySelector(".container-tela3").innerHTML = `
        <h1>Comece pelo começo</h1>
        <section class="info-basicas">
            <div class="vazia"></div>
            <div>
                <input type="text" class="titulo" placeholder="Título do quizz">
                <p class="erro escondido">Deve ter no mínimo 20 e no máximo 65 caracteres!</p>
            </div>
            <div>
                <input type="url" class="url-imagem-quizz" placeholder="URL da imagem do seu quizz">
                <p class="erro escondido">Deve ter formato de URL!</p>
            </div>
            <div>
                <input type="text" class="quantidade-perguntas" placeholder="Quantidade de perguntas do quizz">
                <p class="erro escondido">No mínimo 3 perguntas!</p>
            </div>
            <div>
                <input type="text" class="quantidade-niveis" placeholder="Quantidade de níveis do quizz">
                <p class="erro escondido">No mínimo 2 níveis!</p>
            </div>
        </section>
        <button onclick="validarInfoBasicas()">Prosseguir para criar perguntas</button>
    `;
}

function validarInfoBasicas() {
    let infoBasicas = document.querySelector(".container-tela3 .info-basicas");

    let tituloValido = validarTextoEntreVinteESessentaECinco(infoBasicas.children[1].children[0]);
    let urlValida = validarURL(infoBasicas.children[2].children[0]);
    let qtddPerguntasValida = validarPerguntaMaiorQueTres(infoBasicas.children[3].children[0]);
    let qtddNiveisValida= validarNivelMaiorQueDois(infoBasicas.children[4].children[0]);
    
    if (tituloValido && urlValida && qtddPerguntasValida && qtddNiveisValida) {
        dadosQuizz.title = infoBasicas.children[1].children[0].value;
        dadosQuizz.image = infoBasicas.children[2].children[0].value;
        criarQuizzPerguntas(infoBasicas.children[3].children[0].value, infoBasicas.children[4].children[0].value);
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
             <section class="cria-perguntas" data-identifier="question">
                <span>
                    <h2>Pergunta ${i}</h2>
                    <img onclick="expandirPergunta(this, ${i})" src="./assets/editar.png" alt="expandir" data-identifier="expand">
                </span>
                <article class="expancao escondido">
                    <div>
                        <input type="text" class="texto-pergunta" placeholder="Texto da pergunta"> 
                        <p class="erro escondido">Mínimo de 20 caracteres!</p>
                    </div>
                    <div>
                        <input type="text" class="cor-fundo-pergunta" placeholder="Cor de fundo da pergunta">
                        <p class="erro escondido">A cor deve estar no formato hexadecimal! Ex: #FF0000</p>
                    </div>
                    
                    <h2>Resposta correta</h2>
                    <div>
                        <input type="text" class="resposta resposta-correta" placeholder="Resposta correta">
                        <p class="erro escondido">Não pode estar vazio!</p>
                    </div>
                    <div>
                        <input type="url" class="url-imagem" placeholder="URL da imagem">  
                        <p class="erro escondido">Deve ter formato de URL!</p>
                    </div>

                    <h2>Respostas incorretas</h2>
                    <div>
                        <input type="text" class="resposta resposta-incorreta" placeholder="Resposta Incorreta 1">
                        <p class="erro escondido">Não pode estar vazio!</p>
                    </div>
                    <div>
                        <input type="url" class="url-imagem" placeholder="URL da imagem 1"> 
                        <p class="erro escondido">Deve ter formato de URL!</p>
                    </div>
                    <div>
                        <input type="text" class="resposta resposta-incorreta" placeholder="Resposta Incorreta 2"> 
                        <p class="erro escondido">Inválido!</p>
                    </div>
                    <div>
                        <input type="url" class="url-imagem" placeholder="URL da imagem 2"> 
                        <p class="erro escondido">Inválido!</p>
                    </div>
                    <div>
                        <input type="text" class="resposta resposta-incorreta" placeholder="Resposta Incorreta 3"> 
                        <p class="erro escondido">Inválido!</p>
                    </div>
                    <div>
                        <input type="url" class="url-imagem" placeholder="URL da imagem 3">   
                        <p class="erro escondido">Inválido!</p>
                    </div>
                            </article>
                        </section>
        `;
    }
}

function expandirPergunta(botaoExpandir) {
    botaoExpandir.parentNode.parentNode.children[1].classList.remove("escondido");
    botaoExpandir.parentNode.parentNode.children[0].children[1].classList.add("escondido");
}

function validarTextoEntreVinteESessentaECinco(elemento) {
    if (elemento.value.length >= 20 && elemento.value.length <= 65) {
        elemento.parentNode.children[1].classList.add("escondido");
        elemento.classList.remove("erro");
        return true;
    } else {
        elemento.parentNode.children[1].classList.remove("escondido");
        elemento.classList.add("erro");
        return false;
    }
}

function validarPerguntaMaiorQueTres(elemento) {
    if (elemento.value >= 3) {
        elemento.parentNode.children[1].classList.add("escondido");
        elemento.classList.remove("erro");
        return true;
    } else {
        elemento.parentNode.children[1].classList.remove("escondido");
        elemento.classList.add("erro");
        return false;
    }
}

function validarNivelMaiorQueDois(elemento) {
    if (elemento.value >= 2) {
        elemento.parentNode.children[1].classList.add("escondido");
        elemento.classList.remove("erro");
        return true;
    } else {
        elemento.parentNode.children[1].classList.remove("escondido");
        elemento.classList.add("erro");
        return false;
    }
}

function validarTextoMaiorQueDez(elemento) {
    if (elemento.value.length >= 10) {
        elemento.parentNode.children[1].classList.add("escondido");
        elemento.classList.remove("erro");
        return true;
    } else {
        elemento.parentNode.children[1].classList.remove("escondido");
        elemento.classList.add("erro");
        return false;
    }
}

function validarTextoMaiorQueVinte(elemento) {
    if (elemento.value.length >= 20) {
        elemento.parentNode.children[1].classList.add("escondido");
        elemento.classList.remove("erro");
        return true;
    } else {
        elemento.parentNode.children[1].classList.remove("escondido");
        elemento.classList.add("erro");
        return false;
    }
}  

function validarTextoMaiorQueTrinta(elemento) {
    if (elemento.value.length >= 30) {
        elemento.parentNode.children[1].classList.add("escondido");
        elemento.classList.remove("erro");
        return true;
    } else {
        elemento.parentNode.children[1].classList.remove("escondido");
        elemento.classList.add("erro");
        return false;
    }
}

function validarPorcentagemEntreZeroECem(elemento) {
    if (elemento.value.length !== 0 &&
        elemento.value >= 0 && elemento.value <= 100) {
        elemento.parentNode.children[1].classList.add("escondido");
        elemento.classList.remove("erro");
        return true;
    } else {
        elemento.parentNode.children[1].classList.remove("escondido");
        elemento.classList.add("erro");
        return false;
    }
}

function validarPorcentagemZero(elemento) {
    if (elemento.value.length !== 0 && (Number(elemento.value)) === 0) {
        elemento.parentNode.children[1].classList.add("escondido");
        elemento.classList.remove("erro");
        return true;
    } else {
        elemento.parentNode.children[1].classList.remove("escondido");
        elemento.classList.add("erro");
        return false;
    }
}

function validarCorHexadecimal (elemento) {
    if ((/^#[0-9A-F]{6}$/i).test(elemento.value)) {
        elemento.parentNode.children[1].classList.add("escondido");
        elemento.classList.remove("erro");
        return true;
    } else {
        elemento.parentNode.children[1].classList.remove("escondido");
        elemento.classList.add("erro");
        return false;
    }
}

function validarTextoDiferenteDeVazio(elemento) {
    if (elemento.value.length !== 0) {
        elemento.parentNode.children[1].classList.add("escondido");
        elemento.classList.remove("erro");
        return true;
    } else {
        elemento.parentNode.children[1].classList.remove("escondido");
        elemento.classList.add("erro");
        return false;
    }
} 

function validarURL(elemento) {
    if ((/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/).test(elemento.value)) {
        elemento.parentNode.children[1].classList.add("escondido");
        elemento.classList.remove("erro");
        return true;
    } else {
        elemento.parentNode.children[1].classList.remove("escondido");
        elemento.classList.add("erro");
        return false;
    }
}

function validarPerguntas(qtddNiveis) {
    let perguntasValidas = true;   
    dadosQuizz.questions = [];


    const perguntas = document.querySelector(".container-tela3 .perguntas").children;

    for (let i = 0; i < perguntas.length; i++) {
        
        let tituloValido = validarTextoMaiorQueVinte(perguntas[i].children[1].children[0].children[0]);
        let corValida = validarCorHexadecimal(perguntas[i].children[1].children[1].children[0]);

        let corretaValida = validarTextoDiferenteDeVazio(perguntas[i].children[1].children[3].children[0]);
        let urlCorretaValida = validarURL(perguntas[i].children[1].children[4].children[0]);

        let incorreta1Valida = validarTextoDiferenteDeVazio(perguntas[i].children[1].children[6].children[0]);
        let urlIncorreta1Valida = validarURL(perguntas[i].children[1].children[7].children[0]);

        let incorreta2Valida = true;
        if ((incorreta1Valida && urlIncorreta1Valida && perguntas[i].children[1].children[8].children[0].value.length !== 0) || 
            (perguntas[i].children[1].children[8].children[0].value.length === 0 && 
            perguntas[i].children[1].children[9].children[0].value.length === 0))
        {
                perguntas[i].children[1].children[8].children[1].classList.add("escondido");
                perguntas[i].children[1].children[8].children[0].classList.remove("erro");
                incorreta2Valida = incorreta2Valida && true;
        } else {
                perguntas[i].children[1].children[8].children[1].classList.remove("escondido");
                perguntas[i].children[1].children[8].children[0].classList.add("erro");
                incorreta2Valida = incorreta2Valida && false;
        }

        if ((incorreta1Valida &&
            (/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/).test(
            perguntas[i].children[1].children[9].children[0].value)) || 
            (perguntas[i].children[1].children[8].children[0].value.length === 0 && 
            perguntas[i].children[1].children[9].children[0].value.length === 0)) 
        {
            perguntas[i].children[1].children[9].children[1].classList.add("escondido");
            perguntas[i].children[1].children[9].children[0].classList.remove("erro");
            incorreta2Valida = incorreta2Valida && true;
        } else {
            perguntas[i].children[1].children[9].children[1].classList.remove("escondido");
            perguntas[i].children[1].children[9].children[0].classList.add("erro");
            incorreta2Valida = incorreta2Valida && false;
        }

        let incorreta3Valida = true;
        if ((incorreta2Valida && perguntas[i].children[1].children[10].children[0].value.length !== 0) || 
            (perguntas[i].children[1].children[10].children[0].value.length === 0 && 
            perguntas[i].children[1].children[11].children[0].value.length === 0)) 
        {
            perguntas[i].children[1].children[10].children[1].classList.add("escondido");
            perguntas[i].children[1].children[10].children[0].classList.remove("erro");
            incorreta3Valida = incorreta3Valida && true;
        } else {
            perguntas[i].children[1].children[10].children[1].classList.remove("escondido");
            perguntas[i].children[1].children[10].children[0].classList.add("erro");
            incorreta3Valida = incorreta3Valida && false;
        }

        if ((incorreta2Valida &&
            (/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/).test(
            perguntas[i].children[1].children[11].children[0].value)) || 
            (perguntas[i].children[1].children[10].children[0].value.length === 0 && 
            perguntas[i].children[1].children[11].children[0].value.length === 0)) 
        {
            perguntas[i].children[1].children[11].children[1].classList.add("escondido");
            perguntas[i].children[1].children[11].children[0].classList.remove("erro");
            incorreta3Valida = incorreta3Valida && true;
        } else {
            perguntas[i].children[1].children[11].children[1].classList.remove("escondido");
            perguntas[i].children[1].children[11].children[0].classList.add("erro");
            incorreta3Valida = incorreta3Valida && false;
        }


    if (tituloValido && corValida && corretaValida && urlCorretaValida && incorreta1Valida
        && urlIncorreta1Valida && incorreta2Valida && incorreta3Valida) {

            let dadosPerguntas = {}
            dadosPerguntas = {
                title: perguntas[i].children[1].children[0].children[0].value,
                color: perguntas[i].children[1].children[1].children[0].value,
                answers: [
                    {
                        text: perguntas[i].children[1].children[3].children[0].value,
                        image: perguntas[i].children[1].children[4].children[0].value,
                        isCorrectAnswer: true
                    },
                    {
                        text: perguntas[i].children[1].children[6].children[0].value,
                        image: perguntas[i].children[1].children[7].children[0].value,
                        isCorrectAnswer: false
                    }
                ]
            };

            if (perguntas[i].children[1].children[8].children[0].value.length !== 0 &&
                perguntas[i].children[1].children[9].children[0].value.length !== 0){
                dadosPerguntas.answers.push({
                    text: perguntas[i].children[1].children[8].children[0].value,
                    image: perguntas[i].children[1].children[9].children[0].value,
                    isCorrectAnswer: false
                });

            if (perguntas[i].children[1].children[10].children[0].value.length !== 0 &&
                perguntas[i].children[1].children[11].children[0].value.length !== 0){
                    dadosPerguntas.answers.push({
                        text: perguntas[i].children[1].children[10].children[0].value,
                        image: perguntas[i].children[1].children[11].children[0].value,
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
            <section class="cria-niveis" data-identifier="level">
                <span>
                    <h2>Nível ${i}</h2>
                    <img  onclick="expandirNiveis(this, ${i})" src="./assets/editar.png" alt="editar" data-identifier="expand">
                </span>
                <article class="expancao escondido">
                    <div>
                        <input type="text" class="titulo-nivel" placeholder="Título do Nível">
                        <p class="erro escondido"> Mínimo de 10 caracteres!</p>
                    </div>
                    <div class="div-acerto-minimo">
                        <input type="text" class="acerto-minimo" placeholder="% de acerto mínima">
                        <p class="erro escondido">Número entre 0 e 100 e pelo menos um nível tem que ser 0!</p>
                    </div>
                    <div>
                        <input type="url" class="url-imagem-nivel" placeholder="URL da imagem do nível">  
                        <p class="erro escondido">Deve ter formato de URL!</p>
                    </div>
                    <div>
                        <textarea cols="45" rows="10" class="descricao-nivel" placeholder="Descrição do nível"></textarea>
                        <p class="erro escondido">Mínimo de 30 caracteres!</p>
                    </div>
                </article>
            </section>
        `;

    }
}

function expandirNiveis(botaoExpandir) {
    botaoExpandir.parentNode.parentNode.children[1].classList.remove("escondido");
    botaoExpandir.parentNode.parentNode.children[0].children[1].classList.add("escondido");
}

function validarNiveis() {
    let niveisValidos = true;

    dadosQuizz.levels = [];

    let porcentagemZeroArray = [];

    const niveis = document.querySelector(".container-tela3 .niveis").children;

    for (let i = 0; i < niveis.length; i++){

        let tituloValido = validarTextoMaiorQueDez(niveis[i].children[1].children[0].children[0]); 
        let porcentagemValida = validarPorcentagemEntreZeroECem(niveis[i].children[1].children[1].children[0]);
        let porcentagemZero = validarPorcentagemZero(niveis[i].children[1].children[1].children[0]);
        let urlValida = validarURL(niveis[i].children[1].children[2].children[0]);
        let descricaoValida = validarTextoMaiorQueTrinta(niveis[i].children[1].children[3].children[0]);

        porcentagemZeroArray.push(porcentagemZero);

        if (tituloValido && porcentagemValida && urlValida && descricaoValida) {
            let dadosNiveis = {};
            dadosNiveis = {
                title: niveis[i].children[1].children[0].children[0].value,
                image: niveis[i].children[1].children[2].children[0].value,
                text: niveis[i].children[1].children[3].children[0].value,
                minValue: Number(niveis[i].children[1].children[1].children[0].value)
            };
            
            dadosQuizz.levels.push(dadosNiveis);
            
            niveisValidos = niveisValidos && true;

        } else {
            niveisValidos = niveisValidos && false;
        }

        if((niveisValidos === false) || (porcentagemZeroArray.every(elemento => elemento === false))){
            if ((porcentagemZeroArray.every(elemento => elemento === false))){
                for (let i = 0; i < document.querySelectorAll(".div-acerto-minimo").length; i++){
                    document.querySelectorAll(".div-acerto-minimo")[0].children[1].classList.remove("escondido"); 
                }
            } else if ((porcentagemZeroArray.some(elemento => elemento === true))){
                for (let i = 0; i < document.querySelectorAll(".div-acerto-minimo").length; i++){
                    niveis[i].children[1].children[1].children[1].classList.add("escondido");
                    porcentagemValida = validarPorcentagemEntreZeroECem(niveis[i].children[1].children[1].children[0]);

                }
            }
        } else {
            if ((porcentagemZeroArray.some(elemento => elemento === true))){
                for (let i = 0; i < document.querySelectorAll(".div-acerto-minimo").length; i++){
                    niveis[i].children[1].children[1].children[1].classList.add("escondido"); 
                }
            }
            enviarDadosQuizz();
        }
    }

}

function enviarDadosQuizz(){
    let promessa = axios.post(URL_POST_CRIAR_QUIZZ, dadosQuizz);
    promessa.then(criarQuizzSucesso);
}

function atualizarChaveLocalStorage(resposta) {
    let quizzesUsuario = localStorage.getItem("quizzesUsuario");
    let quizzesUsuariosDeserializados = JSON.parse(quizzesUsuario);
    quizzesUsuariosDeserializados.push(resposta.data);//.id
    let quizzesUsuariosSerializadosAtualizado = JSON.stringify(quizzesUsuariosDeserializados);
    localStorage.setItem("quizzesUsuario", quizzesUsuariosSerializadosAtualizado);
}

function criarQuizzSucesso(resposta) {
   
    atualizarChaveLocalStorage(resposta);
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

