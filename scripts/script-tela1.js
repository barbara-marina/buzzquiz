const URL_BUZZQUIZZ = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
let listaIdQuizzesDoUsuario = [1,2,3,4];
let controleHaQuizzdoUsuario = true;

function inserirQuizzesNaTela(lista){
    let listaDeQuizzes = lista.data;
    let secaoDeTodosOsQuizzes = document.querySelector(".container-tela1 section.todos-os-quizzes");

    secaoDeTodosOsQuizzes.innerHTML="<h3>Todos os Quizzes</h3>";

    for(let i=0; i<listaDeQuizzes.length; i++){
        secaoDeTodosOsQuizzes.innerHTML+=`
            <article onclick="solicitarQuizz(this)">
                <img src="${listaDeQuizzes[i].image}">
                <div class="sombra"></div>   
                <p>${listaDeQuizzes[i].title}</p>              
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
    let containerTela1 = document.querySelector(".container-tela1");
    if (controleHaQuizzdoUsuario === false){
        containerTela1.innerHTML=`
            <button class="criar-quizz escondido" onclick="criarQuizzInfoBasicas()">
                <ion-icon name="add-circle"></ion-icon>
            </button>

            <section class="sem-quizzes-do-usuario">
                <p>Você não criou nenhum quizz ainda :(</p>
                <button onclick="criarQuizzInfoBasicas()">Criar Quizz</button>
            </section>

            <section class="lista-de-quizzes quizzes-do-usuario escondido"></section>

            <section class="lista-de-quizzes todos-os-quizzes"></section>
        `;
    }else {
        containerTela1.innerHTML=`
            <button class="criar-quizz " onclick="criarQuizzInfoBasicas()">
                <ion-icon name="add-circle"></ion-icon>
            </button>

            <section class="sem-quizzes-do-usuario escondido">
                <p>Você não criou nenhum quizz ainda :(</p>
                <button onclick="criarQuizzInfoBasicas()">Criar Quizz</button>
            </section>

            <section class="lista-de-quizzes quizzes-do-usuario escondido"></section>

            <section class="lista-de-quizzes todos-os-quizzes"></section>
        `;
    }
    

    solicitarTodosOsQuizzes()
}

//=====================Funções executadas ao iniciar o programa========================

//carregarLayoutTela1();

/*
<div class="container-tela1">

            <button class="criar-quizz escondido">
                <ion-icon name="add-circle"></ion-icon>
            </button>

            <section class="sem-quizzes-do-usuario">
                <p>Você não criou nenhum quizz ainda :(</p>
                <button>Criar Quizz</button>
            </section>

            <section class="lista-de-quizzes quizzes-do-usuario escondido">
                <h3>Seus Quizzes</h3>
                <article>
                    <img src="" alt="Imagem do quizz">
                    <div class="sombra"></div>   
                    <p>Acerte os personagens corretos dos Simpsons e prove seu amor!</p>              
                </article>
            </section>
            <section class="lista-de-quizzes todos-os-quizzes">
                <h3>Todos os Quizzes</h3>
                <article>
                    <img src="/assets/Imagem-praia-teste.jpg">
                    <div class="sombra"></div>   
                    <p>Acerte os personagens corretos dos Simpsons e prove seu amor!</p>              
                </article>

                <article>
                    <img src="/assets/Imagem-praia-teste.jpg">
                    <div class="sombra"></div>   
                    <p>Acerte os personagens corretos dos Simpsons e prove seu amor!</p>              
                </article>

                <article>
                    <img src="/assets/Imagem-praia-teste.jpg">
                    <div class="sombra"></div>   
                    <p>Acerte os personagens corretos dos Simpsons e prove seu amor!</p>              
                </article>

                <article>
                    <img src="/assets/Imagem-praia-teste.jpg">
                    <div class="sombra"></div>   
                    <p>Acerte os personagens corretos dos Simpsons e prove seu amor!</p>              
                </article>

                <article>
                    <img src="/assets/Imagem-praia-teste.jpg">
                    <div class="sombra"></div>   
                    <p>Acerte os personagens corretos dos Simpsons e prove seu amor!</p>              
                </article>
        
            </section>
        </div>
*/