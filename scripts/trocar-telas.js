function chamarTela1(){
    let containerTela1 = document.querySelector(".container-tela1");
    containerTela1.classList.remove("escondido");
    carregarLayoutTela1();
}
function chamarTela2(idQuizz,htmlQuizz){
    let containerTela1 = document.querySelector(".container-tela2");
    containerTela1.classList.remove("escondido");
    solicitarQuizz(); //idQuizz 
}
function chamarTela3(){
    let containerTela1 = document.querySelector(".container-tela3");
    containerTela1.classList.remove("escondido");
    criarQuizzInfoBasicas();
}

function esconderTela1(){
    let containerTela1 = document.querySelector(".container-tela1");
    containerTela1.classList.add("escondido");
}
function esconderTela2(){
    let containerTela1 = document.querySelector(".container-tela2");
    containerTela1.classList.add("escondido");
}
function esconderTela3(){
    let containerTela1 = document.querySelector(".container-tela3");
    containerTela1.classList.add("escondido");
}