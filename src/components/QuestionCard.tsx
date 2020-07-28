import React from 'react';
import {AnwserObject} from '../App';
import {Wrapper, ButtonWrapper} from './QuestionCard.styles';

type Props= {
    question: string;
    anwsers: string[];
    callback: (e : React.MouseEvent<HTMLButtonElement>)=> void;
    userAnswer: AnwserObject | undefined ;
    questionNr: number;
    totalQuestions: number;

}

const QuestionCard: React.FC<Props> = ({question,anwsers,callback, userAnswer,questionNr,totalQuestions}) =>  (
        <Wrapper> 
            <p className="number">
                Question: {questionNr}/{totalQuestions}
            </p>
            <p dangerouslySetInnerHTML= {{ __html: question }} />
            <div>
                {anwsers.map((anwser)=>(
                    <ButtonWrapper 
                    key ={anwser}
                    correct={userAnswer?.correct_answer === anwser}
                    userClicked={userAnswer?.anwser === anwser}
                    >   
                        <button disabled={userAnswer? true : false} value={anwser} onClick={callback}>
                            <span dangerouslySetInnerHTML={{ __html: anwser }} />
                        </button>
                    </ButtonWrapper>
                ))}
            </div>
        </Wrapper>
    )

export default QuestionCard;