function chamarTela1(){
    let containerTela1 = document.querySelector(".container-tela1");
    containerTela1.classList.remove("escondido");
    carregarLayoutTela1();
}
function chamarTela2(idQuizz){
    let containerTela1 = document.querySelector(".container-tela2");
    containerTela1.classList.remove("escondido");
    solicitarQuizz(idQuizz); 
}
function chamarTela3(){
    
    let containerTela3 = document.querySelector(".container-tela3");
    containerTela3.classList.remove("escondido");
    enviarDadosQuizz();
}

function esconderTela1(){
    let containerTela1 = document.querySelector(".container-tela1");
    containerTela1.classList.add("escondido");
}
function esconderTela2(){
    let containerTela2 = document.querySelector(".container-tela2");
    containerTela2.classList.add("escondido");
}
function esconderTela3(){
    let containerTela3 = document.querySelector(".container-tela3");
    containerTela3.classList.add("escondido");
}