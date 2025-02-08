import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Root from "./layouts/Root";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Root />}>
                <Route index element={<Home />} />
            </Route>
        </Routes>
    );
}

export default App;
