import React, {useState } from 'react';
import { fetchQuizQuestions } from './API';
// Components 
import QuestionCard from './components/QuestionCard';

import {QuestionState,Difficulty} from './API';

import {GlobalStyle , Wrapper } from "./App.styles";



export  type AnwserObject = {
  question: string;
  anwser: string;
  correct: boolean;
  correct_answer: string;

}

const TOTAL_QUESTIONS= 10;

const App = () => {
  const [loading , setLoading ] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber ] = useState(0);
  const [userAnswers, setUserAnwsers] = useState<AnwserObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);



  const  startTrivia = async ()=> {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    
    setQuestions(newQuestions);
    setScore(0);
    setUserAnwsers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e : React.MouseEvent<HTMLButtonElement>)=>{
      if(!gameOver){
        //user anwser
        const anwser = e.currentTarget.value;
        // check anwser against correct anwser 
        const correct = questions[number].correct_answer === anwser;
        // Add score if anwser is correct 
        if(correct) setScore((prev)=> prev+1);
        // Save anwser in the array for user anwsers
        const anwserObject = {
          question: questions[number].question,
          anwser,
          correct, 
          correct_answer: questions[number].correct_answer,
        };
        setUserAnwsers((prev) => [...prev, anwserObject ]);
      }
  }
  const  nextQuestion = async ()=> {
    // Move to the next question if not the last question
    const nextQuestion = number +1;

    if(nextQuestion===TOTAL_QUESTIONS){
      setGameOver(true);
    }else{
      setNumber(nextQuestion);
    }

  }
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>React Quiz</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className='start' onClick={startTrivia}>
            Start
          </button>
        ):null}
        {!gameOver ? <p className='score'>Score : {score}</p> : null}
        {loading && <p>Loading Questions...</p>}
        {!loading &&  !gameOver && (
          <QuestionCard
            questionNr= {number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question ={questions[number].question}
            anwsers = {questions[number].anwsers}
            userAnswer= {userAnswers? userAnswers[number]: undefined}
            callback = {checkAnswer}
        />
        )}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !==TOTAL_QUESTIONS - 1 ?(
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ): null}
      </Wrapper>
    </>
  )
}
export default App;