const URL_BUZZQUIZZ = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
let listaIdQuizzesDoUsuario = [5215,2];
let controleHaQuizzdoUsuario = true;


function esconderTela1(){
    let containerTela1 = document.querySelector(".container-tela1");
    containerTela1.classList.add("escondido");
}

function inserirQuizzesNaTela(lista){
    let listaDeQuizzes = lista.data;
    let containerQuizzes = document.querySelector(".container-tela1 section.todos-os-quizzes div.container-quizzes");

    containerQuizzes.innerHTML="";

    for(let i=0; i<listaDeQuizzes.length; i++){
        for(let j=0; j< listaIdQuizzesDoUsuario.length; i++){
            if(listaIdQuizzesDoUsuario[j]===listaDeQuizzes[i].id){
            }else{
                containerQuizzes.innerHTML+=`
                <article onclick="solicitarQuizz(this)">
                    <img src="${listaDeQuizzes[i].image}">
                    <div class="sombra"></div>   
                    <p>${listaDeQuizzes[i].title}</p>              
                </article>
            `;
            }
        }
        
    }
}

function inserirQuizzesDoUsuarioNaTela(lista){
    let listaDeQuizzes = lista.data;
    let containerQuizzes = document.querySelector(".container-tela1 section.quizzes-do-usuario div.container-quizzes");

    containerQuizzes.innerHTML="";
 
    for(let i=0; i<listaDeQuizzes.length; i++){
        for(let j=0; j< listaIdQuizzesDoUsuario.length; i++){
            if(listaIdQuizzesDoUsuario[j]===listaDeQuizzes[i].id){
                containerQuizzes.innerHTML+=`
                    <article onclick="solicitarQuizz(this)"> 
                        <img src="${listaDeQuizzes[i].image}">
                        <div class="sombra"></div>   
                        <p>${listaDeQuizzes[i].title}</p>              
                    </article>
                `;
            }
    
        }
    }
}

function solicitarTodosOsQuizzes(){
    let requisicao = axios.get(URL_BUZZQUIZZ);

    requisicao.then(inserirQuizzesNaTela);
    requisicao.catch(
        ()=> console.log("Erro ao solitar lista de quizzes")
    );
}

function solicitarQuizzesDoUsuario(){
    let requisicao = axios.get(URL_BUZZQUIZZ); //mudar essa lógica depois que for capaz de filtrar quizzes do usuario

    requisicao.then(inserirQuizzesDoUsuarioNaTela);
    requisicao.catch(
        ()=> console.log("Erro ao solitar lista de quizzes")
    );
}

function carregarLayoutTela1(){
    let containerTela1 = document.querySelector(".container-tela1 div.capsula");
    if (controleHaQuizzdoUsuario === false){
        containerTela1.innerHTML=`

            <section class="sem-quizzes-do-usuario">
                <p>Você não criou nenhum quizz ainda :(</p>
                <button onclick="criarQuizzInfoBasicas()">Criar Quizz</button>
            </section>

            <section class="lista-de-quizzes quizzes-do-usuario escondido"></section>

            <section class="lista-de-quizzes todos-os-quizzes">
                <h3>Todos os Quizzes</h3>
                <div class="container-quizzes"></div>
            </section>
        `;

        solicitarTodosOsQuizzes()

    }else {
        containerTela1.innerHTML=`
            <section class="lista-de-quizzes quizzes-do-usuario ">
                <h3> Seus Quizzes
                    <button class="criar-quizz " onclick="criarQuizzInfoBasicas()">
                        <ion-icon name="add-circle"></ion-icon>
                    </button>
                </h3>
                <div class="container-quizzes"></div>
            </section>

            <section class="lista-de-quizzes todos-os-quizzes">
                <h3>Todos os Quizzes</h3>
                <div class="container-quizzes"></div>
            </section>
        `;

        solicitarQuizzesDoUsuario();
        solicitarTodosOsQuizzes();

    }
    
}

function chamarTela1(){
    let containerTela1 = document.querySelector(".container-tela1");
    containerTela1.classList.remove("escondido");
    carregarLayoutTela1();
}

//=====================Funções executadas ao iniciar o programa========================

carregarLayoutTela1();

/*
<div class="container-tela1">

    <div class="capsula">
    
        <section class="sem-quizzes-do-usuario">
            <p>Você não criou nenhum quizz ainda :(</p>
            <button>Criar Quizz</button>
        </section>

        <section class="lista-de-quizzes quizzes-do-usuario escondido">
            <h3>Seus Quizzes
                <button class="criar-quizz escondido">
                    <ion-icon name="add-circle"></ion-icon>
                </button>
            </h3>

            <div class="container-quizzes">
                <article>
                    <img src="" alt="Imagem do quizz">
                    <div class="sombra"></div>   
                    <p>Acerte os personagens corretos dos Simpsons e prove seu amor!</p>              
                </article>
            </div>
            
        </section>
        <section class="lista-de-quizzes todos-os-quizzes">
            <h3>Todos os Quizzes</h3>
            <article>
                <img src="/assets/Imagem-praia-teste.jpg">
                <div class="sombra"></div>   
                <p>Acerte os personagens corretos dos Simpsons e prove seu amor!</p>              
            </article>
    
        </section>
    </div>
</div>
*/