import { useEffect, useState } from "react";
import { AiOutlineRead } from "react-icons/ai";
import { BiSolidBookContent } from "react-icons/bi";
import { LuPencilLine } from "react-icons/lu";
import { useParams } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";

const DetailedSolutions = () => {
    const { id } = useParams();
    // console.log(id);

    const [quiz, setQuiz] = useState(null);
    const [error, setError] = useState(null);

    // Fetch quiz data from the API
    useEffect(() => {
        fetch(
            "https://api.allorigins.win/get?url=" +
                encodeURIComponent("https://api.jsonserve.com/Uw5CrX")
        )
            .then((response) => response.json())
            .then((data) => {
                const parsedData = JSON.parse(data.contents);
                const quizData = parsedData.questions.find(
                    (quiz) => quiz.id === parseInt(id)
                );
                setQuiz(quizData);
                console.log(quizData);
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
            });
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!quiz) {
        return <LoadingSpinner />;
    }

    // Parse the keywords string into an array
    const keywords = JSON.parse(quiz.reading_material.keywords);

    // Join the content sections into a single string
    const contentSections = quiz.reading_material.content_sections.join("");

    // Practice materials
    const practiceMaterialsContent =
        quiz.reading_material.practice_material.content.join("");
    const practiceMaterialsKeywords =
        quiz.reading_material.practice_material.keywords;

    return (
        <div className="max-w-screen-xl mx-auto py-12 px-4 lg:px-0">
            <h1 className="text-2xl text-primary font-bold text-center mb-4">
                {quiz.topic}
            </h1>
            <h2>{quiz.detailed_solution}</h2>

            {/* Reading Materials */}
            <div className="my-8">
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 ">
                    <AiOutlineRead size={22} />
                    Reading Materials
                </h2>
                <div className="flex gap-3 text-blue-600">
                    {keywords.map((keyword, index) => (
                        <p key={index}>#{keyword}</p>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                    <BiSolidBookContent size={22} />
                    Contents
                </h2>
                <div
                    className="flex flex-col space-y-4"
                    dangerouslySetInnerHTML={{
                        __html: contentSections,
                    }}
                ></div>
            </div>

            {/* Practice Materials */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                    <LuPencilLine size={22} />
                    Practice Materials
                </h2>
                <div
                    className="flex flex-col space-y-4"
                    dangerouslySetInnerHTML={{
                        __html: practiceMaterialsContent,
                    }}
                ></div>
                <div className="flex gap-3 text-blue-600 mt-4">
                    {practiceMaterialsKeywords.map((keyword, index) => (
                        <p key={index}>#{keyword}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DetailedSolutions;
