const URL_BUZZQUIZZ = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
let listaIdQuizzesDoUsuario;
let arrayListaIdQuizzesDoUsuario;
let controleHaQuizzdoUsuario;
let listaDeQuizzes=[];

/*#LEGENDA#
Se "resposta" é o retorno de uma requisição para obter um quizz, então resposta.data.id (.image .title) é a forma de extrair as informações do objeto
Se "listaDeQuizzes[x]" é um índice de um array contendo os objetos .data retornados pela requisição da lista de quizzes
, então listaDeQuizzes[0].id (.title .image) é a forma de extrair as informações desses objetos

*/

// let primeiraRequisicao = axios.get(URL_BUZZQUIZZ);
// let teste = axios.get(`${URL_BUZZQUIZZ}/6037`);
// teste.then( (resposta) => {
//     let objeto= {};
//     objeto = resposta.object;
//     console.log(`resposta = ${resposta.data.id}`);
// }
// );
// teste.catch(
//     ()=>{
//         console.log("erro na requisição do quizz");
//     }
// );

// primeiraRequisicao.then((lista) => {
//     listaDeQuizzes = lista.data;
//     console.log(`listaDeQuizzes = ${listaDeQuizzes[0].title}`); // .id .image
//     carregarLayoutTela1();
// }
// );




// function sincronizarStorageComAApi(){
//     listaIdQuizzesDoUsuario = localStorage.getItem("quizzesUsuario");
//     arrayListaIdQuizzesDoUsuario = JSON.parse(listaIdQuizzesDoUsuario);
//     let arrayDeIds = [];
//     for(let i=0; i<listaDeQuizzes.length; i++){
//         arrayDeIds.push(listaDeQuizzes[i].id);
//     }

//     for(let i=0; i<arrayListaIdQuizzesDoUsuario.length; i++){
//         let controle = arrayDeIds.indexOf(arrayListaIdQuizzesDoUsuario[i]);
//         if (controle === (-1)){
//             console.log("Este indice não está no array")
//         }
//         //se arrayListaIdQuizzesDoUsuario[i] não existir dentro de listaDeQuizzes, excluir item do arrayListaIdQuizzesDoUsuario
        
//     }
// }

function verificarQuizzesDoUsuarioLocalStorage(){
    if(localStorage.getItem("quizzesUsuario") === null){
        let quizzesUsuarios = [];
        let quizzesUsuariosSerializados = JSON.stringify(quizzesUsuarios);
        localStorage.setItem("quizzesUsuario", quizzesUsuariosSerializados);
    }
    listaIdQuizzesDoUsuario = localStorage.getItem("quizzesUsuario");
    arrayListaIdQuizzesDoUsuario = JSON.parse(listaIdQuizzesDoUsuario);
    console.log(`listaID = ${listaIdQuizzesDoUsuario}`);
    console.log(`arrayListaID = ${arrayListaIdQuizzesDoUsuario}`);
}

function inserirQuizzesNaTela(lista){
    listaDeQuizzes = lista.data;
    let containerQuizzes = document.querySelector(".container-tela1 section.todos-os-quizzes div.container-quizzes");

    containerQuizzes.innerHTML="";
    if(controleHaQuizzdoUsuario === true ){
        for(let i=0; i<listaDeQuizzes.length; i++){
            for(let j=0; j< arrayListaIdQuizzesDoUsuario.length; j++){
                if(arrayListaIdQuizzesDoUsuario[j]===listaDeQuizzes[i].id){
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

function inserirQuizzesDoUsuarioNaTela(lista){
    listaDeQuizzes = lista.data;
    let containerQuizzes = document.querySelector(".container-tela1 section.quizzes-do-usuario div.container-quizzes");

    containerQuizzes.innerHTML="";
    
        for(let i=0; i<listaDeQuizzes.length; i++){
            for(let j=0; j< arrayListaIdQuizzesDoUsuario.length; j++){
                if(arrayListaIdQuizzesDoUsuario[j]===listaDeQuizzes[i].id){
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
    listaIdQuizzesDoUsuario = localStorage.getItem("quizzesUsuario");
    arrayListaIdQuizzesDoUsuario = JSON.parse(listaIdQuizzesDoUsuario);
       
    if (listaIdQuizzesDoUsuario === null|| arrayListaIdQuizzesDoUsuario.length === 0){
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

        solicitarQuizzesDoUsuario();
        solicitarTodosOsQuizzes();
    }
}

//=====================Funções executadas ao iniciar o programa========================

verificarQuizzesDoUsuarioLocalStorage();
carregarLayoutTela1()

