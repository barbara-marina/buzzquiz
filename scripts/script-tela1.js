const URL_BUZZQUIZZ = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
let listaQuizzesDoUsuario;
let arraylistaQuizzesDoUsuario;
let idsQuizzesDoUsuario = [];
let controleHaQuizzdoUsuario;
let listaDeQuizzes=[];


function verificarQuizzesDoUsuarioLocalStorage(){
    if(localStorage.getItem("quizzesUsuario") === null){
        let quizzesUsuarios = [];
        let quizzesUsuariosSerializados = JSON.stringify(quizzesUsuarios);
        localStorage.setItem("quizzesUsuario", quizzesUsuariosSerializados);
    }
    listaQuizzesDoUsuario = localStorage.getItem("quizzesUsuario");
    arraylistaQuizzesDoUsuario = JSON.parse(listaQuizzesDoUsuario);
    coletarIdsQuizzesDoUsuario();
    
}

function coletarIdsQuizzesDoUsuario(){
    idsQuizzesDoUsuario = [];

    for (let i=0; i< arraylistaQuizzesDoUsuario.length; i++){
        idsQuizzesDoUsuario.push(arraylistaQuizzesDoUsuario[i].id);
    }
}

function inserirQuizzesNaTela(lista){
    listaDeQuizzes = lista.data;
    console.log(`tamanho = ${listaDeQuizzes.length}`);
    let containerQuizzes = document.querySelector(".container-tela1 section.todos-os-quizzes div.container-quizzes");

    containerQuizzes.innerHTML="";
    if(controleHaQuizzdoUsuario === true ){
        for(let i=0; i<listaDeQuizzes.length; i++){
            console.log(idsQuizzesDoUsuario.includes(listaDeQuizzes[i].id));

            if(idsQuizzesDoUsuario.includes(listaDeQuizzes[i].id)){
                console.log("achei um quizz do usuário");
                console.log(listaDeQuizzes[i].id);
            }else{
                containerQuizzes.innerHTML+=`
                <article onclick="chamarTela2(${listaDeQuizzes[i].id})" data-identifier="quizz-card">
                    <img src="${listaDeQuizzes[i].image}" alt="miniatura do quizz">
                    <div class="sombra"></div>   
                    <p>${listaDeQuizzes[i].title}</p>              
                </article>
            `;
            }
        }
    }else{
        for(let i=0; i<listaDeQuizzes.length; i++){
            containerQuizzes.innerHTML+=`
                    <article onclick="chamarTela2(${listaDeQuizzes[i].id})" data-identifier="quizz-card">
                        <img src="${listaDeQuizzes[i].image}" alt="miniatura do quizz">
                        <div class="sombra"></div>   
                        <p>${listaDeQuizzes[i].title}</p>              
                    </article>
                `;
        }

    }
}

function inserirQuizzesDoUsuarioNaTela(){
    
    let containerQuizzes = document.querySelector(".container-tela1 section.quizzes-do-usuario div.container-quizzes");

    containerQuizzes.innerHTML="";
    
        for(let i=0; i< idsQuizzesDoUsuario.length; i++){
            
                containerQuizzes.innerHTML+=`
                    <article onclick="chamarTela2(${arraylistaQuizzesDoUsuario[i].id})" data-identifier="quizz-card"> 
                        <img src="${arraylistaQuizzesDoUsuario[i].image}" alt="miniatura do quizz">
                        <div class="sombra"></div>   
                        <p>${arraylistaQuizzesDoUsuario[i].title}</p>              
                    </article>
                `;
            
    
        }   
}

function solicitarTodosOsQuizzes(){
    let requisicao = axios.get(URL_BUZZQUIZZ);

    requisicao.then(inserirQuizzesNaTela);
    requisicao.catch(
        ()=> console.log("Erro ao solitar lista de quizzes")
    );
}

function carregarLayoutTela1(){
    let containerTela1 = document.querySelector(".container-tela1 div.capsula");
    listaQuizzesDoUsuario = localStorage.getItem("quizzesUsuario");
    arraylistaQuizzesDoUsuario = JSON.parse(listaQuizzesDoUsuario);
    coletarIdsQuizzesDoUsuario();
       
    if (listaQuizzesDoUsuario === null|| arraylistaQuizzesDoUsuario.length === 0){
        controleHaQuizzdoUsuario = false;
        containerTela1.innerHTML = `

            <section class="sem-quizzes-do-usuario">
                <p>Você não criou nenhum quizz ainda :(</p>
                <button onclick="chamarTela3()" data-identifier="create-quizz">Criar Quizz</button>
            </section>

            <section class="lista-de-quizzes quizzes-do-usuario" escondido data-identifier="user-quizzes"></section>

            <section class="lista-de-quizzes todos-os-quizzes" data-identifier="general-quizzes">
                <h3>Todos os Quizzes</h3>
                <div class="container-quizzes"></div>
            </section>
        `;

        solicitarTodosOsQuizzes();

    }else {
        
        controleHaQuizzdoUsuario = true;
        containerTela1.innerHTML  = `
            <section class="lista-de-quizzes quizzes-do-usuario data-identifier="user-quizzes"">
                <h3> Seus Quizzes
                    <button class="criar-quizz " onclick="chamarTela3()" data-identifier="create-quizz">
                        <ion-icon name="add-circle"></ion-icon>
                    </button>
                </h3>
                <div class="container-quizzes"></div>
            </section>

            <section class="lista-de-quizzes todos-os-quizzes" data-identifier="general-quizzes">
                <h3>Todos os Quizzes</h3>
                <div class="container-quizzes"></div>
            </section>
        `;

        solicitarTodosOsQuizzes();
        inserirQuizzesDoUsuarioNaTela();
    }
}

//=====================Funções executadas ao iniciar o programa========================

verificarQuizzesDoUsuarioLocalStorage();
carregarLayoutTela1();
