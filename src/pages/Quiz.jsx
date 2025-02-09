import { useState, useEffect } from "react";
import { IoIosArrowDropright } from "react-icons/io";
import { Link } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";

const Quiz = () => {
    const [quizData, setQuizData] = useState([]);
    const [allQuestions, setAllQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState(0);
    const [showSolutions, setShowSolutions] = useState(false);

    const currentQuestion = allQuestions[currentQuestionIndex];

    // Fetch quiz data from the API
    useEffect(() => {
        fetch(
            "https://api.allorigins.win/get?url=" +
                encodeURIComponent("https://api.jsonserve.com/Uw5CrX")
        )
            .then((response) => response.json())
            .then((data) => {
                const parsedData = JSON.parse(data.contents);
                setQuizData(parsedData);
                console.log(parsedData);
            })
            .catch((error) => console.error(error));
    }, []);
    console.log("quizData", quizData);

    // Fetch questions from the API
    useEffect(() => {
        fetch(
            "https://api.allorigins.win/get?url=" +
                encodeURIComponent("https://api.jsonserve.com/Uw5CrX")
        )
            .then((response) => response.json())
            .then((data) => {
                const parsedData = JSON.parse(data.contents);
                setAllQuestions(parsedData.questions);
                console.log(parsedData);
            })
            .catch((error) => console.error(error));
    }, []);
    console.log("allQuestions", allQuestions);

    const handleAnswerSelect = (answer) => {
        setSelectedAnswer(answer);
    };

    const handleNextQuestion = () => {
        const correctOption = allQuestions[currentQuestionIndex].options.find(
            (option) => option.is_correct
        ).description;

        if (selectedAnswer === correctOption) {
            setScore(score + parseInt(quizData.correct_answer_marks));
            setCorrectAnswers(correctAnswers + 1);
            console.log(score);
        } else {
            setScore(score - parseInt(quizData.negative_marks));
            setWrongAnswers(wrongAnswers + 1);
            console.log(score);
        }

        setSelectedAnswer(null);
        // Check if the current question is the last question
        if (currentQuestionIndex >= allQuestions.length - 1) {
            setCurrentQuestionIndex(allQuestions.length);
        }
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const handleShowSolutions = () => {
        setShowSolutions(true);
    };

    if (allQuestions.length === 0) {
        return <LoadingSpinner />;
    }

    return (
        <div className="">
            {/* total questions */}
            <div className="bg-blue-100 text-lg text-primary font-medium p-4">
                <div className="max-w-screen-xl mx-auto flex justify-between">
                    <div>
                        Question {currentQuestionIndex + 1} of{" "}
                        {allQuestions.length}
                    </div>
                    <div>Score: {score}</div>
                </div>
            </div>

            <div className="max-w-screen-xl mx-auto p-6 rounded shadow-md my-12">
                {currentQuestionIndex < allQuestions.length ? (
                    <>
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
                            <button
                                onClick={handleNextQuestion}
                                className="btn btn-soft btn-primary text-lg"
                            >
                                Next Question
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-lg">
                        <h3 className="text-2xl font-semibold text-blue-500">
                            Quiz Completed!
                        </h3>
                        <div className="mt-4">
                            {/* total score */}
                            <p className="text-xl">
                                Total Score: {score} Out of{" "}
                                {allQuestions.length *
                                    quizData.correct_answer_marks}
                            </p>
                            <p className="text-xl text-green-600">
                                Correct Answers: {correctAnswers}
                            </p>
                            <p className="text-xl text-red-600">
                                Wrong Answers: {wrongAnswers}
                            </p>

                            <p className="text-xl mt-4">
                                For correct answer you get{" "}
                                {quizData.correct_answer_marks} marks
                                <br />
                                For wrong answer you get{" "}
                                {quizData.negative_marks} marks
                            </p>

                            <button
                                onClick={handleShowSolutions}
                                className="btn btn-soft btn-primary text-lg my-4"
                            >
                                Show Solutions
                            </button>
                        </div>
                        {/* show solutions */}
                        {showSolutions && (
                            <div className="mt-4">
                                <hr className="pb-4" />
                                <h2 className="text-2xl text-green-600 font-semibold mb-4 text-center underline">
                                    Solutions
                                </h2>
                                {allQuestions.map((question) => (
                                    <div key={question.id} className="mb-4">
                                        <h3 className="font-semibold">
                                            {question.description}
                                        </h3>
                                        <p>
                                            Correct Answer:{" "}
                                            {
                                                question.options.find(
                                                    (option) =>
                                                        option.is_correct
                                                ).description
                                            }
                                        </p>
                                        {/* detailed answer btn*/}
                                        <Link
                                            to={`/quiz/${question.id}`}
                                            className="text-lg text-blue-500 flex items-center gap-2 w-max mt-2 hover:underline"
                                        >
                                            Detailed Solution
                                            <IoIosArrowDropright size={22} />
                                        </Link>

                                        {selectedAnswer !== null && (
                                            <p>Your Answer: {selectedAnswer}</p>
                                        )}

                                        <hr className="mt-4 text-gray-300" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Quiz;
