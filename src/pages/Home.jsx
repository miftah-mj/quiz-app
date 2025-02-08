import { Link } from "react-router";
import Banner from "../components/Banner";

const Home = () => {
    return (
        <div className="">
            <Banner />

            <div className="flex justify-center mt-4">
            <Link to="/quiz" className="btn btn-wide btn-soft btn-primary text-lg">
                Start Quiz
            </Link>
            </div>
        </div>
    );
};

export default Home;
