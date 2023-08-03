const questionsArray = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Paris", correct: true },
        { text: "London", correct: false },
        { text: "Berlin", correct: false },
        { text: "Madrid", correct: false },
      ],
    },
    {
      question: "Which planet is known as the Red Planet?",
      answers: [
        { text: "Mars", correct: true },
        { text: "Venus", correct: false },
        { text: "Jupiter", correct: false },
        { text: "Mercury", correct: false },
      ],
    },
    {
      question: "What is the largest mammal on Earth?",
      answers: [
        { text: "Elephant", correct: false },
        { text: "Blue Whale", correct: true },
        { text: "Giraffe", correct: false },
        { text: "Rhino", correct: false },
      ],
    },
    {
      question: "Who painted the Mona Lisa?",
      answers: [
        { text: "Pablo Picasso", correct: false },
        { text: "Vincent van Gogh", correct: false },
        { text: "Leonardo da Vinci", correct: true },
        { text: "Claude Monet", correct: false },
      ],
    },
    {
      question: "What is the chemical symbol for water?",
      answers: [
        { text: "H2O", correct: true },
        { text: "CO2", correct: false },
        { text: "N2O", correct: false },
        { text: "O2", correct: false },
      ],
    },
  ];
  

  const questionElement=document.getElementById("question");
  const answerButtons=document.getElementById("answer-buttons");
  const nextButton=document.getElementById("next-btn");

  let currentQuestionIndex=0;
  let score =0;

  // function to start and reset quiz
  function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
  }

  //function to display questions

  function showQuestion(){
    questionElement.innerHTML=currentQuestionIndex+1 + ". " + questionsArray[currentQuestionIndex].question;

    questionsArray[currentQuestionIndex].answers.forEach(
        (ans)=>{
            // console.log(ans);
            const answer=document.createElement("button");
            answer.classList.add("btn");
            answer.innerText=ans.text;

            if(ans.correct){
                answer.dataset.correct=ans.correct;
            }

            answer.addEventListener("click",selectAnswer);

            answerButtons.appendChild(answer);
        }
    );

    currentQuestionIndex++;

  }


  function selectAnswer(e){
    const selected=e.target;
    
    if(selected.dataset.correct){
        selected.classList.add("correct");
        score++;
    }
    else{
        selected.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(
        (button)=>{
            if(button.dataset.correct){
                button.classList.add("correct");
            }

            button.disabled=true;
        }
    );

    nextButton.style.display="block";

    
  }


  function handelNextButton(){
    currentQuestionIndex++;

    // if()
  }

  nextButton.addEventListener("click",
    ()=>{
        if(nextButton.classList.contains("start-again")){
            nextButton.classList.toggle("start-again");
            startQuiz();
            nextButton.style.display="none";

        }
        else if(currentQuestionIndex<questionsArray.length){
            resetState();
            showQuestion();
        }
        else{
            // startQuiz();
            showScore();
        }
    }
  )


  function showScore(){

    questionElement.innerHTML="";

    answerButtons.innerHTML=`
       <h2> You Scored ${score}/5</h2>
    `
    nextButton.innerText="Start Again"
    nextButton.classList.toggle("start-again");
  }

  function resetState(){
    nextButton.style.display="none";

    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
  }

  startQuiz();
  
  