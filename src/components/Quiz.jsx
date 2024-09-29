import { useState, useCallback } from "react";
import QUESTIONS from '../questions.js';
import QuizCompleteImg from '../assets/quiz-complete.png';
import Question from "./Question.jsx";

export default function Quiz() {
    const [answerState, setAnswerState] = useState('');
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function (selectedAnswer) {
        setAnswerState('answered');

        setUserAnswers((prevState) => {
            return [...prevState, selectedAnswer];
        });

        setTimeout(() => {
            if(selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnswerState('correct');
            } else {
                setAnswerState('wrong');
            }

            setTimeout(() => {
                setAnswerState('');
            }, 2000)
        }, 1000);

     }, [activeQuestionIndex]);
    

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
            <Question key={activeQuestionIndex} questionText={QUESTIONS[activeQuestionIndex].text} answers={QUESTIONS[activeQuestionIndex].answers} onSelectAnswer={handleSelectAnswer} selectedAnswer={userAnswers[userAnswers.length - 1]} answerState={answerState} onSkipAnswer={handleSkipAnswer} />
        </div>
    );
}