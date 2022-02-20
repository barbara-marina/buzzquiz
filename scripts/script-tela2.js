let ID_DO_QUIZZ = 0;
let contadorPerguntas = 0;
let contadorAcertos = 0;
let numeroPerguntas = null;
let acertoPercentual = 0;
let niveis = [];
let numeroNiveis = null;

function solicitarQuizz(idQuizzSelecionado){
    ID_DO_QUIZZ = idQuizzSelecionado;
    const promisse = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${ID_DO_QUIZZ}`)

    promisse.then(carregarQuizSelecionado);
    
}

function carregarQuizSelecionado(response){
    esconderTela1();
    esconderTela3();
    contadorAcertos=0;
    contadorPerguntas=0;
    

    let perguntas = response?.data.questions;
    numeroPerguntas = perguntas?.length;

    niveis = response?.data.levels;
    numeroNiveis = niveis?.length   
    
    let container = document.querySelector(".container-tela2") 
    container.innerHTML=`<div class="banner"><p>${response?.data.title}</p></div>`;

    let banner = document.querySelector(".banner");
    banner.style.backgroundImage = `url("${response?.data.image}")`
    banner.scrollIntoView({behavior: 'smooth'})
    
    for (let i=0; i<numeroPerguntas; i++){
      
        document.querySelector(".container-tela2").innerHTML += ` 

        <div class="bloco-perguntas ">
            <div class="pergunta titulo${i}">${perguntas[i]?.title}</div>
            <div class="alternativas">
            ${carregarRespostas(perguntas[i]?.answers, i)}
            </div>
        </div> 
        `
        let pergunta = document.querySelector(`.titulo${i}`);
        pergunta.style.backgroundColor = `${perguntas[i]?.color}`   
    }

}
//  solicitarQuizz(); // Essa linha deve ser excluída quando todos os códigos forem integrados

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
            <img onclick="verificaResposta(this, ${i},${indexPergunta})" class="imagem-pergunta" alt="${answers[i].text}" src="${answers[i].image}" >
            <p><span class="${answers[i].isCorrectAnswer} esconder-resposta" id="${indexPergunta}-${i}-${answers[i].isCorrectAnswer}">${answers[i].text}</span></p>
        </div>
        `
    }

    return respostas
}

function verificaResposta(cartaSelecionada, indiceResposta, indicePergunta){
    let array = cartaSelecionada.parentNode.parentNode.children;
    cartaSelecionada.parentNode.parentNode.children[indiceResposta].classList.add("selecionada")
    contadorPerguntas++;
  
    
    
    for( let i=0; i<array.length; i++){
        array[i].children[1].children[0].classList.remove("esconder-resposta")
        if(array[i].classList.contains("selecionada") == false){
            array[i].classList.add("opacidade") 
            
        }
    }

    contarPontos(array[indiceResposta].children[1].children[0]);
    finalizarQuizz();
   
    let qtdPerguntas = document.querySelectorAll(".pergunta").length

    setTimeout(() => {if (contadorPerguntas<qtdPerguntas){
        document.querySelector(`.titulo${contadorPerguntas}`).scrollIntoView({behavior: 'smooth', top:'300'})
    }
    },2000)


}

function contarPontos(spanSelecionado){
    if (spanSelecionado.classList.contains("true")){
        contadorAcertos++
    }
}

function finalizarQuizz(){
    if(contadorPerguntas == numeroPerguntas){
        let acerto = contadorAcertos/contadorPerguntas
        acertoPercentual = parseInt(acerto*100);
        setTimeout(()=> {
            for (let i=numeroNiveis-1; i>-1; i--){
                if(acertoPercentual>= niveis[i].minValue){
                    let conteudo = document.querySelector(".container-tela2");
                    conteudo.innerHTML+=`
                    <div class="bloco-finalizacao">
                        <div class="percentual-acerto">${acertoPercentual}% de acerto: ${niveis[i]?.title}</div>
                        <div class="divisao">
                            <img class="imagem-finalizacao"  src="${niveis[i]?.image}"/>
                            <div class="texto-finalizacao">
                            ${niveis[i]?.text}
                            </div>
                        </div>    
                    </div>
                    <button class="botao-reiniciar" onclick="reiniciarQuizz()">
                        Reiniciar Quizz
                    </button>
                    <p class="voltar-home" onclick="esconderTela2();chamarTela1()">Voltar pra home</p>
                  `
                  return 
                }
                
        }},500)
        setTimeout(()=>{ document.querySelector(".bloco-finalizacao").scrollIntoView({behavior: 'smooth', top:'300'})

        },2000)
        
    }
}

function reiniciarQuizz(){

    let conteudo = document.querySelector(".container-tela2")
    conteudo.innerHTML="";
    contadorAcertos=0;
    contadorPerguntas=0;
    solicitarQuizz(ID_DO_QUIZZ)
    finalizarQuizz()
    let banner = document.querySelector(".banner")
    banner.scrollIntoView({behavior: 'smooth'})

}
