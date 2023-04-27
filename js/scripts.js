// Declaração de variáveis
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const descriptionContainer = document.querySelector("#description-container");
const answerDescription = document.querySelector("#answer-description");
const letters = ['a', 'b', 'c', 'd'];
let points = 0;
let actualQuestion = 0;


// perguntas

const questions = [
    {
      "question": "De quem é a famosa frase “Penso, logo existo”?",
      "answers": [
        {
          "answer": "Descartes",
          "correct": true,
          "description": "Alternativa A: Descartes. “Je pense, donc je suis” é a frase original, escrita em francês, do filósofo René Descartes (1596-1650). Ela resume o pensamento e o método de Descartes, para quem tudo tem início na dúvida."
        },
        {
          "answer": "Platão",
          "correct": false
        },
        {
          "answer": "Galileu Galilei",
          "correct": false
        },
        {
          "answer": "Sócrates",
          "correct": false
        },
      ]
    },
    {
      "question": "Quantas casas decimais tem o número pi?",
      "answers": [
        {
          "answer": "Duas",
          "correct": false
        },
        {
          "answer": "Infinitas",
          "correct": true,
          "description": "Alternativa B: Infinitas. Ao longo dos tempos, vários estudiosos têm se dedicado a calcular o número pi e já chegaram ao número de 62,8 trilhões de casas decimais."
        },
        {
          "answer": "Centenas",
          "correct": false
        },
        {
          "answer": "Milhares",
          "correct": false
        },
      ]
    },
    {
      "question": "Quanto tempo a luz do Sol demora para chegar à Terra?",
      "answers": [
        {
          "answer": "1 dia",
          "correct": false
        },
        {
          "answer": "12 minutos",
          "correct": false
        },
        {
          "answer": "12 horas",
          "correct": false
        },
        {
          "answer": "8 minutos",
          "correct": true,
          "description": "Alternativa D: 8 minutos. Essa é uma questão que se fundamenta na ótica. Ela é calculada com base na distância do Sol em relação à Terra, que é de aproximadamente 150 000 000 km."
        },
      ]
    },
    {
        "question": "Qual a altura da rede de vôlei nos jogos masculino e feminino?",
        "answers": [
          {
            "answer": "1,8m e 1,5m",
            "correct": false
          },
          {
            "answer": "2,45m e 2,15m",
            "correct": false
          },
          {
            "answer": "2,43m e 2,24m",
            "correct": true,
            "description": "Alternativa C: 2,43 m e 2,24 m. Antigamente, a altura era de 1,98 m. Atualmente é 2,43 m para jogadores adultos masculinos e 2,24 m para jogadores adultos femininos. A altura da rede também varia de acordo com a idade dos jogadores."
          },
          {
            "answer": "2,5m e 2,0m",
            "correct": false
          },
        ]
    }
]


// Substituição do quizz para a primeira pergunta

function init () {
    createQuestion(0);
}

// Create a question 
function createQuestion(i) {

    // Limpa questão anterior
    const oldButtons = answersBox.querySelectorAll("button");
  
    oldButtons.forEach(function(btn) {
      btn.remove();
    });

    // Alterar o texto da pergunta
    const questionText = question.querySelector("#question-text");
    const questionNumber = question.querySelector("#question-number");

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    // insere as alternativas
    questions[i].answers.forEach(function(answer, i) {

        //Cria o template do botão do quizz
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

        const letterBtn = answerTemplate.querySelector(".btn-letter");
        const answerText = answerTemplate.querySelector(".question-answer");

        letterBtn.textContent = letters[i];
        answerText.textContent = answer['answer'];

        answerTemplate.setAttribute("correct-answer", answer["correct"]);

        //remover hide e template class

        answerTemplate.classList.remove("hide");
        answerTemplate.classList.remove("answer-template");

        // inserir as alternativas na tela
        answersBox.appendChild(answerTemplate);

        //Inserir um evento de click no botão
        answerTemplate.addEventListener("click", function(){
            checkAnswer(this);
        });

    });

    // incrementaro número da questão
    actualQuestion++;

}

// pegando as description
let getDescription = (i) => {
  //pegando a description
  const questionIndex = i; // índice da pergunta desejada
  const correctAnswer = questions[questionIndex].answers.find(answer => answer.correct);
  const description = correctAnswer.description;
  const p = document.getElementById("answer-description");
  p.innerHTML = description; // ou p.textContent = description;
}

// verificando resposta do usuário
function checkAnswer(btn) {
    //seleciona todos os botões
    const buttons = answersBox.querySelectorAll("button");
    //verifica se as resposta estão corretas e adiciona classe nos botões
    buttons.forEach(function(button) {

        if(button.getAttribute("correct-answer") === "true") {

            button.classList.add("correct-answer");

            //checa se o usuário acertou
            if(btn === button) {
                //incremento dos pontos
                points++;
            }else {  
            getDescription(actualQuestion - 1);
            descriptionContainer.classList.remove("hide"); 
            }

        }else {
            button.classList.add("wrong-answer");
        }  

        const oldButtons = answersBox.querySelectorAll("button");

        oldButtons.forEach(function(btn) {
        btn.disabled = true;
        });

    });

    // exibir próxima pergunta
    nextQuestion();

}

//exibe a próxima pergunta do quizz
function nextQuestion(){
    
    // timer para usuário ver as resposta
    setTimeout(function() {

        // verifica se há perguntas
        if(actualQuestion >= questions.length) {
            //apresenta a mensagem de sucesso
            showSucccessMessage();
            return;
        }

        createQuestion(actualQuestion);
        descriptionContainer.classList.add("hide");
        
    }, 4000);

}


let showSucccessMessage = () => {

  hideOrShowQuizz();

  descriptionContainer.classList.add("hide");

  // trocar dados da tela de sucesso

  // calcular score
  const score = ((points / questions.length) * 100).toFixed(2);
  const displayScore = document.querySelector('#display-score span');
  displayScore.textContent = score;

  const correctAnswer = document.querySelector('#correct-answers');
  correctAnswer.textContent = points;

  const questionQty = document.querySelector('#questions-qty');
  questionQty.textContent = questions.length;

}

let hideOrShowQuizz = () => {
  quizzContainer.classList.toggle("hide");
  scoreContainer.classList.toggle("hide");
}

  // reiniciando o jogo  
  const restartButton = document.querySelector("#restart");
  restartButton.addEventListener("click", function() {
    // redefine todas as variáveis relevantes aqui
    actualQuestion = 0;
    points = 0;
    hideOrShowQuizz();
    // chame a função init() para começar novamente
    init();
  });

//inicialização do quizz
init();