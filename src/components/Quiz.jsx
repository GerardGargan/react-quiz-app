import { useState, useCallback } from "react";
import QUESTIONS from '../questions.js';
import QuizCompleteImg from '../assets/quiz-complete.png';
import Question from "./Question.jsx";

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

    return (
        <div id="quiz">
            <Question key={activeQuestionIndex} index={activeQuestionIndex} onSelectAnswer={handleSelectAnswer} onSkipAnswer={handleSkipAnswer} />
        </div>
    );
}