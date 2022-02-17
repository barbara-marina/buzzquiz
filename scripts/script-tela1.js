const URL_BUZZQUIZZ = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"

function solicitarTodosOsQuizzes(){
let requisicao = axios.get(URL_BUZZQUIZZ);
requisicao.than();
requisicao.catch();

}

//=====================Funções executadas ao iniciar o programa========================
solicitarTodosOsQuizzes()