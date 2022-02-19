let ID_DO_QUIZZ = 2;

function solicitarQuizz(quizzSelecionado){
    /*O parâmetro quizzSelecionado recebe o "this" do quizz que foi escolhido. Se for mais útil para vc, posso filtar o id;
    por enquanto essa informação não está sendo usada aqui no seu código, mas acredito que possa ser útil*/
    const promisse = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${ID_DO_QUIZZ}`)

    promisse.then(carregarQuizSelecionado);
    
    carregarQuizSelecionado();
}


function carregarQuizSelecionado(response){
    esconderTela1();
    console.log(response?.data.questions);

    let perguntas = response?.data.questions;
    let numeroPerguntas = perguntas?.length;
    
    let container = document.querySelector(".container-tela2") 
    container.innerHTML=`<div class="banner"><p>${response.data.title}</p></div>`;

    let banner = document.querySelector(".banner");
    banner.style.backgroundimage = `url("${response?.data.image}")`
    
    for (let i=0; i<=numeroPerguntas; i++){
    document.querySelector(".container-tela2").innerHTML += ` 

            <div class="bloco-perguntas">
                <div class="pergunta">${perguntas[i].title}</div>
                <div class="alternativas">
              ${carregarRespostas(perguntas[i].answers)}
                </div>
            </div> 
            ` 
    }

}

solicitarQuizz(); // Essa linha deve ser excluída quando todos os códigos forem integrados

function carregarRespostas(answers){

let respostas ="";

for (let i=0; i<answers.length; i++){
respostas  +=`
<div class="alternativa-1 ">
    <img class="imagem-pergunta" src="${answers[i].image}" >
    <p class="${answers[i].isCorrectAnswer}">${answers[i].text}</p>
</div>

`

}

return respostas
}

//     <div class="alternativas">
//     <div class="alternativa-esquerda">
//         <div class="alternativa-1 ${perguntas[i].answers[j].isCorrectAnswer}">
//             <img class="imagem-pergunta" src="${perguntas[i].answers[j].imagem}" >
//             <p>${perguntas[i].answers[j].text}</p>
//         </div>
//         <div class="alternativa-2 ${perguntas[i].answers[i].isCorrectAnswer}">
//             <img class="imagem-pergunta" src="${perguntas[i].answers[j].imagem}" >
//             <p>${perguntas[i].answers[i].text}</p>
//         </div>
//     </div>
//     <div class="alternativa-direita">
//         <div class="alternativa-3 ${perguntas[i].answers[i].isCorrectAnswer}">
//             <img class="imagem-pergunta" src="${perguntas[i].answers[j].imagem}" >
//             <p>${perguntas[i].answers[i].text}</p>
//         </div>
//         <div class="alternativa-4 ${perguntas[i].answers[i+3].isCorrectAnswer}">
//             <img class="imagem-pergunta" src="${perguntas[i].answers[j].imagem}" >
//             <p>${perguntas[i].answers[j].text}</p>
//         </div>
//     </div>
// </div>
// }

// function quizSelecionado(){
//     document.querySelector(".container-tela2").innerHTML = ` 

//     <div class="banner"><p>${response.title}</p></div>
            
//             <div class="bloco-perguntas">
//                 <div class="pergunta">Pergunta 1</div>
//                 <div class="alternativas">
//                     <div class="alternativa-esquerda">
//                         <div class="alternativa-1">
//                             <img class="imagem-pergunta" src="https://p2.trrsf.com/image/fget/cf/648/0/images.terra.com/2020/08/14/o-gatinho-de-cada-signo-15721.jpeg" >
//                             <p>Alternativa 1</p>
//                         </div>
//                         <div class="alternativa-2">
//                             <img class="imagem-pergunta" src="https://p2.trrsf.com/image/fget/cf/648/0/images.terra.com/2020/08/14/o-gatinho-de-cada-signo-15721.jpeg" >
//                             <p>Alternativa 2</p>
//                         </div>
//                     </div>
//                     <div class="alternativa-direita">
//                         <div class="alternativa-3">
//                             <img class="imagem-pergunta" src="https://p2.trrsf.com/image/fget/cf/648/0/images.terra.com/2020/08/14/o-gatinho-de-cada-signo-15721.jpeg" >
//                             <p>Alternativa 3</p>
//                         </div>
//                         <div class="alternativa-4">
//                             <img class="imagem-pergunta" src="https://p2.trrsf.com/image/fget/cf/648/0/images.terra.com/2020/08/14/o-gatinho-de-cada-signo-15721.jpeg" >
//                             <p>Alternativa 4</p>
//                         </div>
//                     </div>
//                 </div>  

            
//             </div>
//             <div class="bloco-perguntas">
//                 <div class="pergunta">Pergunta 1</div>
//                 <div class="alternativas">
//                     <div class="alternativa-esquerda">
//                         <div class="alternativa-1">
//                             <img class="imagem-pergunta" src="https://p2.trrsf.com/image/fget/cf/648/0/images.terra.com/2020/08/14/o-gatinho-de-cada-signo-15721.jpeg" >
//                             <p>Alternativa 1</p>
//                         </div>
//                         <div class="alternativa-2">
//                             <img class="imagem-pergunta" src="https://p2.trrsf.com/image/fget/cf/648/0/images.terra.com/2020/08/14/o-gatinho-de-cada-signo-15721.jpeg" >
//                             <p>Alternativa 2</p>
//                         </div>
//                     </div>
//                     <div class="alternativa-direita">
//                         <div class="alternativa-3">
//                             <img class="imagem-pergunta" src="https://p2.trrsf.com/image/fget/cf/648/0/images.terra.com/2020/08/14/o-gatinho-de-cada-signo-15721.jpeg" >
//                             <p>Alternativa 3</p>
//                         </div>
//                         <div class="alternativa-4">
//                             <img class="imagem-pergunta" src="https://p2.trrsf.com/image/fget/cf/648/0/images.terra.com/2020/08/14/o-gatinho-de-cada-signo-15721.jpeg" >
//                             <p>Alternativa 4</p>
//                         </div>
//                     </div>
//                 </div>  

            
//             </div>  
//             <div class="bloco-perguntas">
//                 <div class="pergunta">Pergunta 1</div>
//                 <div class="alternativas">
//                     <div class="alternativa-esquerda">
//                         <div class="alternativa-1">
//                             <img class="imagem-pergunta" src="https://p2.trrsf.com/image/fget/cf/648/0/images.terra.com/2020/08/14/o-gatinho-de-cada-signo-15721.jpeg" >
//                             <p>Alternativa 1</p>
//                         </div>
//                         <div class="alternativa-2">
//                             <img class="imagem-pergunta" src="https://p2.trrsf.com/image/fget/cf/648/0/images.terra.com/2020/08/14/o-gatinho-de-cada-signo-15721.jpeg" >
//                             <p>Alternativa 2</p>
//                         </div>
//                     </div>
//                     <div class="alternativa-direita">
//                         <div class="alternativa-3">
//                             <img class="imagem-pergunta" src="https://p2.trrsf.com/image/fget/cf/648/0/images.terra.com/2020/08/14/o-gatinho-de-cada-signo-15721.jpeg" >
//                             <p>Alternativa 3</p>
//                         </div>
//                         <div class="alternativa-4">
//                             <img class="imagem-pergunta" src="https://p2.trrsf.com/image/fget/cf/648/0/images.terra.com/2020/08/14/o-gatinho-de-cada-signo-15721.jpeg" >
//                             <p>Alternativa 4</p>
//                         </div>
//                     </div>
//                 </div>  

            
//             </div> 
    
//     `
// }

