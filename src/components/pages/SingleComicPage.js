import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './singleComicPage.scss';
import useMarvelServices from '../../services/MarvelService';
import Spiner from '../spiner/Spiner';
import ErrorMesage from '../errorMesage/ErrorMesage';

const SingleComicPage = () => {
    const [comic, setComic] = useState(null);

    const { getOneComics, loading, error, ClearError } = useMarvelServices();
    
    const { comicId } = useParams();


    useEffect(() => {
        updateComic();
    }, [comicId])

    function updateComic() {
        ClearError();
        if (!comicId) {
            return;
        }

        getOneComics(comicId)
            .then(onComicLoaded)
    }

    function onComicLoaded(comic) {
        setComic(comic);
    }

 

    const errorMessage = error ? <ErrorMesage /> : null;
    const spinner = loading ? <Spiner /> : null;
    const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

    return (
        <div className="char__info">
            {errorMessage}
            {spinner}
            {content}
        </div>
    )

}

const View = ({comic}) =>{

    const {title, thumbnail, price, pageCount, language, description} = comic;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt="x-men" className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">Pages: {pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to={'/comics'} className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;