const URL_BUZZQUIZZ = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"

function inserirQuizzesNaTela(lista){
let listaDeQuizzes = lista.data;
let secaoDeTodosOsQuizzes = document.querySelector(".container-tela1 section.todos-os-quizzes");

secaoDeTodosOsQuizzes.innerHTML="<h3>Todos os Quizzes</h3>"

for(let i=0; i<listaDeQuizzes.length; i++){
    secaoDeTodosOsQuizzes.innerHTML+=`
        <article>
            <img src="${listaDeQuizzes[i].image}">
            <div class="sombra"></div>   
            <a>${listaDeQuizzes[i].title}</a>              
        </article>
    `
}

}

function solicitarTodosOsQuizzes(){
let requisicao = axios.get(URL_BUZZQUIZZ);

requisicao.then(inserirQuizzesNaTela);
requisicao.catch(
    ()=> console.log("Erro ao solitar lista de quizzes")
);

}

//=====================Funções executadas ao iniciar o programa========================
solicitarTodosOsQuizzes()

/*
<div class="container-tela1">

            <button class="criar-quizz escondido">
                <ion-icon name="add-circle"></ion-icon>
            </button>

            <section class="sem-quizzes-do-usuario">
                <a>Você não criou nenhum quizz ainda :(</a>
                <button>Criar Quizz</button>
            </section>

            <section class="lista-de-quizzes quizzes-do-usuario escondido">
                <h3>Seus Quizzes</h3>
                <article>
                    <img src="" alt="Imagem do quizz">
                    <div class="sombra"></div>   
                    <a>Acerte os personagens corretos dos Simpsons e prove seu amor!</a>              
                </article>
            </section>
            <section class="lista-de-quizzes todos-os-quizzes">
                <h3>Todos os Quizzes</h3>
                <article>
                    <img src="/assets/Imagem-praia-teste.jpg">
                    <div class="sombra"></div>   
                    <a>Acerte os personagens corretos dos Simpsons e prove seu amor!</a>              
                </article>

                <article>
                    <img src="/assets/Imagem-praia-teste.jpg">
                    <div class="sombra"></div>   
                    <a>Acerte os personagens corretos dos Simpsons e prove seu amor!</a>              
                </article>

                <article>
                    <img src="/assets/Imagem-praia-teste.jpg">
                    <div class="sombra"></div>   
                    <a>Acerte os personagens corretos dos Simpsons e prove seu amor!</a>              
                </article>

                <article>
                    <img src="/assets/Imagem-praia-teste.jpg">
                    <div class="sombra"></div>   
                    <a>Acerte os personagens corretos dos Simpsons e prove seu amor!</a>              
                </article>

                <article>
                    <img src="/assets/Imagem-praia-teste.jpg">
                    <div class="sombra"></div>   
                    <a>Acerte os personagens corretos dos Simpsons e prove seu amor!</a>              
                </article>
        
            </section>
        </div>
*/