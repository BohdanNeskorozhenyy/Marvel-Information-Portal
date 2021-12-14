
import MainPage from "../pages/MainPage";
import ComicsPage from "../pages/ComicsPage";
import SingleComicPage from "../pages/SingleComicPage";
import Page404 from "../pages/404";

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";


const App = (props) => {

    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>

                        <Route path="/" element={<MainPage />} />

                        <Route path="/comics" element={<ComicsPage />} />

                        <Route path="/comics/:comicId" element={<SingleComicPage />} />

                        <Route path="*" element={<Page404 />}/>
                            
                    </Routes>
                </main>
            </div>
        </Router>
    )

}

export default App;