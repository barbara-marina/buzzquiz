let ID_DO_QUIZZ = 5134;
let contadorPerguntas = 0;
let contadorAcertos = 0;
let numeroPerguntas = null;

function solicitarQuizz(quizzSelecionado){
    ID_DO_QUIZZ = quizzSelecionado;
    const promisse = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${ID_DO_QUIZZ}`)

    promisse.then(carregarQuizSelecionado);
    
}


function carregarQuizSelecionado(response){
    esconderTela1();

    console.log(response?.data.questions);
    console.log(response?.data.questions[0].answers);
    
    let perguntas = response?.data.questions;
    numeroPerguntas = perguntas?.length;
    
    let container = document.querySelector(".container-tela2") 
    container.innerHTML=`<div class="banner"><p>${response?.data.title}</p></div>`;

    let banner = document.querySelector(".banner");
    banner.style.backgroundImage = `url("${response?.data.image}")`
    
    for (let i=0; i<numeroPerguntas; i++){
      
    document.querySelector(".container-tela2").innerHTML += ` 

        <div class="bloco-perguntas">
            <div class="pergunta">${perguntas[i]?.title}</div>
            <div class="alternativas">
            ${carregarRespostas(perguntas[i]?.answers, i)}
            </div>
        </div> 
        ` 
    }

}

// solicitarQuizz(); // Essa linha deve ser excluída quando todos os códigos forem integrados

function comparador() { 
	return Math.random() - 0.5; 
}

function carregarRespostas(answers, indexPergunta){

let arrayRespostas = answers;

arrayRespostas.sort(comparador);

let respostas ="";

for (let i=0; i<arrayRespostas.length; i++){
    respostas  +=`
    <div>
        <img onclick="verificaResposta(this, ${i})" class="imagem-pergunta" src="${answers[i].image}" >
        <p><span class="${answers[i].isCorrectAnswer} esconder-resposta" id="${indexPergunta}-${i}-${answers[i].isCorrectAnswer}">${answers[i].text}</span></p>
    </div>
    `
}

    return respostas
}



function verificaResposta(cartaSelecionada, indiceResposta){
    let array = cartaSelecionada.parentNode.parentNode.children;
    // console.log("antes da função",cartaSelecionada.parentNode.parentNode.children);
    cartaSelecionada.parentNode.parentNode.children[indiceResposta].classList.add("selecionada")
    contadorPerguntas++;
  
    

    for( let i=0; i<array.length; i++){

        // console.log("entrei no for", array[i])

        array[i].children[1].children[0].classList.remove("esconder-resposta")

        if(array[i].classList.contains("selecionada") == false){
            array[i].classList.add("opacidade") 
    }
}

    contarPontos(array[indiceResposta].children[1].children[0]);
    console.log(contadorPerguntas,contadorAcertos)
    finalizarQuizz();
}

    


function contarPontos(spanSelecionado){

    if (spanSelecionado.classList.contains("true")){
        contadorAcertos++
    }
}


function finalizarQuizz(){

    if(contadorPerguntas == numeroPerguntas){
        let percentualAcerto
    
    }

}