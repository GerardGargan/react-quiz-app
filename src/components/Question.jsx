import { useState } from "react";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import QUESTIONS from '../questions.js';

export default function Question({onSelectAnswer, onSkipAnswer, index}) {
    
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    });

    function handleSelectAnswer(answer) {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        })

        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: answer === QUESTIONS[index].answers[0]
            });

            setTimeout(() => {
                onSelectAnswer(answer);
            },2000);
        }, 1000);
    }

    let answerState = '';
    if(answer.selectedAnswer && answer.isCorrect != null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    } else if(answer.selectedAnswer) {
        answerState = 'answered';
    }

    return (
        <div id="question">
                <QuestionTimer timeout={10000} onTimeout={onSkipAnswer} />
                <h2>Questions {QUESTIONS[index].text}</h2>
                <Answers answers={QUESTIONS[index].answers} selectedAnswer={answer.selectedAnswer} answerState={answerState} onSelect={handleSelectAnswer} />
            </div>
    )
}