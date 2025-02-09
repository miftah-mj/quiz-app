import { useEffect, useState } from "react";
import { AiOutlineRead } from "react-icons/ai";
import { BiSolidBookContent } from "react-icons/bi";
import { useParams } from "react-router";

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
        return <div>Loading...</div>;
    }

    // Parse the keywords string into an array
    const keywords = JSON.parse(quiz.reading_material.keywords);

    // Join the content sections into a single string
    const contentSections = quiz.reading_material.content_sections.join("");

    return (
        <div className="max-w-screen-xl mx-auto py-12 px-4 lg:px-0">
            <h1 className="text-2xl font-bold text-center mb-4">
                {quiz.topic}
            </h1>
            <h2>{quiz.detailed_solution}</h2>

            {/* Reading Materials */}
            <div className="my-8">
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 ">
                    <AiOutlineRead size={22} />
                    Reading Materials
                </h2>
                <ul className="list-disc list-inside">
                    {keywords.map((keyword, index) => (
                        <li key={index}>{keyword}</li>
                    ))}
                </ul>
            </div>

            {/* Content */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                    <BiSolidBookContent size={22} />
                    Content
                </h2>
                <div
                    className="flex flex-col space-y-4"
                    dangerouslySetInnerHTML={{
                        __html: contentSections,
                    }}
                ></div>
            </div>
        </div>
    );
};

export default DetailedSolutions;
