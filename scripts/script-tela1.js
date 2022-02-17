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