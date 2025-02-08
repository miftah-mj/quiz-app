import { useState, useEffect } from "react";

const Quiz = () => {
    const [quizData, setQuizData] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    useEffect(() => {
        fetch(
            "https://api.allorigins.win/get?url=" +
                encodeURIComponent("https://api.jsonserve.com/Uw5CrX")
        )
            .then((response) => response.json())
            .then((data) => {
                const parsedData = JSON.parse(data.contents);
                setQuizData(parsedData.questions);
                console.log(parsedData);
            })
            .catch((error) => console.error(error));
    }, []);

    console.log(quizData);

    const handleAnswerSelect = (answer) => {
        setSelectedAnswer(answer);
    };

    const handleNextQuestion = () => {
        setSelectedAnswer(null);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    if (quizData.length === 0) {
        return <div>Loading...</div>;
    }

    const currentQuestion = quizData[currentQuestionIndex];

    return (
        <div className="">
            {/* tottal questions */}
            <div className="bg-blue-100 text-lg text-primary font-medium p-4">
                <div className="max-w-screen-xl mx-auto flex justify-between">
                    <div>
                        Question {currentQuestionIndex + 1} of {quizData.length}
                    </div>
                    <div>Score: 0</div>
                </div>
            </div>

            <div className="container mx-auto p-6 rounded shadow-md mt-12">
                <h2 className="text-xl font-semibold mb-4">
                    {currentQuestion.description}
                </h2>
                <div className="space-y-2">
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() =>
                                handleAnswerSelect(option.description)
                            }
                            className={`block w-full text-left p-2 border rounded ${
                                selectedAnswer === option.description
                                    ? "bg-blue-400 text-white"
                                    : "bg-gray-100"
                            }`}
                        >
                            {option.description}
                        </button>
                    ))}
                </div>
                <div className="mt-4">
                    {currentQuestionIndex < quizData.length - 1 ? (
                        <button
                            onClick={handleNextQuestion}
                            className="bg-primary text-white py-2 px-4 rounded"
                        >
                            Next Question
                        </button>
                    ) : (
                        <div className="text-lg font-semibold text-primary">
                            Quiz Completed!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Quiz;
