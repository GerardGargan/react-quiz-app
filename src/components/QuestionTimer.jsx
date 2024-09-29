import { useEffect, useState } from "react";

export default function QuestionTimer({timeout, onTimeout, mode}) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        const timer = setTimeout(onTimeout, timeout);
        
        return () => {
            clearTimeout(timer);
        }
    }, [onTimeout, timeout]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(prevRemainingTime => prevRemainingTime - 100);
        },100);

        return () => {
            clearTimeout(interval);
        }
    }, []);


    return (
        <progress id="question-time" className={mode} max={timeout} value={remainingTime} />
    );
}