let ID_DO_QUIZZ = 1;
let contadorPerguntas = 0;
let contadorAcertos = 0;
let numeroPerguntas = null;
let acertoPercentual = 0;
let niveis = [];
let numeroNiveis = null;

function solicitarQuizz(quizzSelecionado){
    /*O parâmetro quizzSelecionado recebe o "this" do quizz que foi escolhido. Se for mais útil para vc, posso filtar o id;
    por enquanto essa informação não está sendo usada aqui no seu código, mas acredito que possa ser útil*/
    const promisse = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${ID_DO_QUIZZ}`)

    promisse.then(carregarQuizSelecionado);

    carregarQuizSelecionado();
}

function carregarQuizSelecionado(response){
    esconderTela1();

    // console.log(response?.data.questions);
    // console.log(response?.data.questions[0].answers);
    
    let perguntas = response?.data.questions;
    numeroPerguntas = perguntas?.length;

    niveis = response?.data.levels;
    numeroNiveis = niveis?.length   
    
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
            <img onclick="verificaResposta(this, ${i},${indexPergunta})" class="imagem-pergunta" src="${answers[i].image}" >
            <p><span class="${answers[i].isCorrectAnswer} esconder-resposta" id="${indexPergunta}-${i}-${answers[i].isCorrectAnswer}">${answers[i].text}</span></p>
        </div>
        `
    }

    return respostas
}

function verificaResposta(cartaSelecionada, indiceResposta, indicePergunta){
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
    // console.log(contadorPerguntas,contadorAcertos)
    
    finalizarQuizz();
    
    // scrollProxima()
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
                    conteudo.innerHTML=`
                    <div class="bloco-finalizacao">
                        <div class="percentual-acerto">${acertoPercentual}% de acerto: ${niveis[i]?.title}</div>
                        <img
                            class="imagem-finalizacao"
                            src="src="${niveis[i]?.image}"
                        />
                        <div class="texto-finalizacao">
                        ${niveis[i]?.text}
                        </div>
                    </div>
                    <button class="botao-reiniciar" onclick="re">
                        Reiniciar Quizz
                    </button>
                    <p class="voltar-home">Voltar pra home</p>
                  `
                 return 
                }
        }},500)
    }
}

// onclick="esconderTela2();chamarTela1()"



// function scrollProxima() {

//     let perguntas = document.querySelectorAll(".bloco-perguntas")

//     perguntas.forEach(window.scroll(0,600)); 
   
//     for (let i=0; i<perguntas.length; i++){
//         console.log("entrei no for")
//         let posicao[i] = 600;
//         window.scroll(0,posicao[i])
//         posicao[i+1]= posicao[i]+600
//         perguntas[i].scrollIntoView({ behavior: 'smooth', block: 'nearest'});
//     }

//     pergunta.scrollIntoView({ behavior: 'smooth', block: 'end'});

   
// }

// setInterval(() => {scrollProxima
    
// }, 2000);




