import { Link } from "react-router";

const Home = () => {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Welcome to the Quiz App</h1>
            <Link to="/quiz" className="btn btn-soft btn-primary mt-3">
                Start Quiz
            </Link>
        </div>
    );
};

export default Home;
