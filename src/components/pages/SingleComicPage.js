import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { useParams, Link } from 'react-router-dom';
import './singleComicPage.scss';
import useMarvelServices from '../../services/MarvelService';
import Spiner from '../spiner/Spiner';
import ErrorMesage from '../errorMesage/ErrorMesage';

const SingleComicOrCharPage = () => {
    const [comicOrChar, setComicOrChar] = useState(null);
    const { getOneComics, loading, error, ClearError, getOneCharacter } = useMarvelServices();
    const { comicOrCharId, pageType } = useParams();


    useEffect(() => {
        console.log(comicOrCharId)
        updateComic();
    }, [comicOrCharId, pageType])

    function updateComic() {
        ClearError();
        if (!comicOrCharId && !pageType) {
            return;
        }

        if (comicOrCharId && pageType == 'comicPage') {
            getOneComics(comicOrCharId)
                .then(onComicOrCharLoaded)
        } else if (comicOrCharId && pageType == 'charPage') {
            getOneCharacter(comicOrCharId)
                .then(onComicOrCharLoaded)
        }

    }

    function onComicOrCharLoaded(comic) {
        setComicOrChar(comic);
    }



    const errorMessage = error ? <ErrorMesage /> : null;
    const spinner = loading ? <Spiner /> : null;
    const content = !(loading || error || !comicOrChar) ? <View comicOrChar={comicOrChar} pageType={pageType} /> : null;

    return (
        <div className="char__info">
            {errorMessage}
            {spinner}
            {content}
        </div>
    )

}

const View = ({ comicOrChar, pageType }) => {

    const { title, thumbnail, price, pageCount, language, description, name, comics } = comicOrChar;

    if (pageType == 'comicPage') {
        return (
            <div className="single-comic">
                <Helmet>
                    <meta
                        name="description"
                        content={`${title} comics boock`}
                    />
                    <title>{title}</title>
                </Helmet>
                <img src={thumbnail} alt="x-men" className="single-comic__img" />
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">Pages: {pageCount}</p>
                    <p className="single-comic__descr">Language: {language}</p>
                    <div className="single-comic__price">{price}</div>
                </div>
                <Link to='/comics' className="single-comic__back">Back to all</Link>
            </div>
        )
    } else if (pageType == 'charPage') {
        return (
            <div className="single-comic">
                <Helmet>
                    <meta
                        name="description"
                        content={`${name} information`}
                    />
                    <title>{name}</title>
                </Helmet>
                <img src={thumbnail} alt={name} className="single-comic__img" />
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{name}</h2>
                    <p className="single-comic__descr">{description}</p>
                </div>
                <Link to='/' className="single-comic__back">Back to main page</Link>

                {comics ?
                    <div className="single-comic__comics-list">
                        <div className="single-comic__name">Comics:</div>
                        {
                            comics.map((item, i) => {
                                const id = item.resourceURI.replace(/http:\/\/gateway.marvel.com\/v1\/public\/comics\//, "");
                                return (
                                    <li key={i} className="char__comics-item">
                                        <Link to={`/comics/comicPage/${id}`}>
                                            {item.name}
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </div> : null}

            </div>
        )
    } return null

}

export default SingleComicOrCharPage;