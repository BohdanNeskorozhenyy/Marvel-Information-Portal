// import { lazy, Suspense } from "react";

// import Spiner from "../spiner/Spiner";
// import {
//     BrowserRouter as Router,
//     Routes,
//     Route
// } from "react-router-dom";

// import AppHeader from "../appHeader/AppHeader";

// const Page404 = lazy(() => import('../pages/404'));
// const MainPage = lazy(() => import('../pages/MainPage'));
// const ComicsPage = lazy(() => import('../pages/ComicsPage'));
// const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));


// const App = (props) => {

//     return (
//         <Router>
//             <div className="app">
//                 <AppHeader />
//                 <main>
//                     <Suspense fallback={<Spiner/>}>
//                         <Routes>

//                             <Route path="/" element={<MainPage />} />

//                             <Route path="/comics" element={<ComicsPage />} />

//                             <Route path="/comics/:comicId" element={<SingleComicPage />} />

//                             <Route path="*" element={<Page404 />} />

//                         </Routes>
//                     </Suspense>
//                 </main>
//             </div>
//         </Router>
//     )

// }

// export default App;


import { lazy, Suspense } from "react";

import Spiner from "../spiner/Spiner";
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink,
    Switch
} from "react-router-dom";
import { CSSTransition } from 'react-transition-group'


import '../appHeader/appHeader.scss'

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));

const routesForNav = [
    { path: '/', name: 'Characters', Component: MainPage, },
    { path: '/comics', name: 'Comics', Component: ComicsPage, }
]
const allRoutes = [
    { path: '/', name: 'Characters', Component: MainPage, },
    { path: '/comics', name: 'Comics', Component: ComicsPage, },
    { path: '/comics/:comicId', name: 'SingleComicPage', Component: SingleComicPage, },
]

const App = (props) => {

    return (
        <Router>
            <div className="app">
                <header className="app__header">
                    <h1 className="app__title">
                        <Link to="/">
                            <span>Marvel</span> information portal
                        </Link>
                    </h1>
                    <nav className="app__menu">
                        <ul>
                            {routesForNav.map(route => (
                                <li><NavLink
                                    exact
                                    activeStyle={{ 'opacity': '60%' }}
                                    to={route.path}
                                    key={route.path}>
                                    {route.name}</NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                </header>
                <main>
                    
                    <Suspense fallback={<Spiner />}>
                        {allRoutes.map(({ path, Component }) => (

                            <Route key={path} exact path={path}>
                            {({ match }) => (
                                <CSSTransition
                                    in={match != null}
                                    timeout={500}
                                    classNames='page'
                                    unmountOnExit>
                                    <div className="page">
                                        <Component />
                                    </div>
                                </CSSTransition>
                            )}
                        </Route>

                        ))}

                    </Suspense>
                </main>
            </div>
        </Router>
    )

}

export default App;


{/* <Route path="/" element={<MainPage />} />

<Route path="/comics" element={<ComicsPage />} />

<Route path="/comics/:comicId" element={<SingleComicPage />} />

<Route path="*" element={<Page404 />} /> */}



