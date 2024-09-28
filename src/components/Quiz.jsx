import { useState, useCallback } from "react";
import QUESTIONS from '../questions.js';
import QuizCompleteImg from '../assets/quiz-complete.png';
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function (selectedAnswer) {
        setUserAnswers((prevState) => {
            return [...prevState, selectedAnswer];
        });
     }, []);
    

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if(quizIsComplete) {
        return (
            <div id="summary">
                <h2>Quiz completed</h2>
                <img src={QuizCompleteImg} alt="Trophy Icon" />
            </div>
        );
    }

    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);

    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeout={handleSkipAnswer} />
                <h2>Questions {QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map((answer) => {
                        return (
                            <li key={answer} className="answer">
                                <button onClick={() => handleSelectAnswer(answer)}>
                                    {answer}
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
}