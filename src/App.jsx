import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Root from "./layouts/Root";
import Quiz from "./pages/Quiz";
import NotFound from "./pages/NotFound";
import DetailedSolutions from "./pages/DetailedSolutions";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Root />}>
                <Route index element={<Home />} />
                <Route path="quiz" element={<Quiz />} />
                <Route path="quiz/:id" element={<DetailedSolutions />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
