import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 style={{fontSize:'40px'}} className="app__title">
                <a style={{color:'#DE3535'}} href="#">
                    <span style={{color:'#DE3535'}}>Marvel</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul style={{color:'white',fontSize:'30px'}}>
                    <li><a style={{color:'white'}} href="#">Characters</a></li>
                    /
                    <li><a style={{color:'white'}} href="#">Comics</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;