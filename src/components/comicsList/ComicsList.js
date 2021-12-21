import { useEffect, useState, useRef } from 'react';
import './comicsList.scss';
import Spiner from '../spiner/Spiner';
import ErrorMesage from '../errorMesage/ErrorMesage';
import useMarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group'

const ComicsList = (props) => {
    const [comicsList, setcomicsList] = useState([]);
    const [newItemLoading, setnewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [comicsEnded, setcomicsEnded] = useState(false)
    const { getAllComics, error, loading } = useMarvelService();
    const pageType = 'comicPage'


    useEffect((e) => {
        onRequest(e,offset, true);
    }, [])

    function onRequest(e, offset, innitial) {
        innitial ? setnewItemLoading(false) : setnewItemLoading(true)
        if (error) {
            setnewItemLoading(false)
        };
        getAllComics(offset)
            .then(res => onComicsListLoaded(res, e))
    }



    function onComicsListLoaded(newComicsList, e) {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }

        setOffset(offset => offset + 9);
        setcomicsList(comicsList => [...comicsList, ...newComicsList]);
        setnewItemLoading(false);
        setcomicsEnded(ended)
        if (e) {
            window.scrollBy(0, 600)
        }
    }



    function renderItems(arr) {
        return (
            <TransitionGroup className="comics__grid">
                {arr.map((item, i) => {
                    return (
                        <CSSTransition
                            key={item.id}
                            timeout={500}
                            classNames="comics__item"
                        >
                            <li className="comics__item"
                                tabIndex={0}
                                key={i}>
                                <Link to={`/comics/${pageType}/${item.id}`}>
                                    <img src={item.thumbnail} alt="ultimate war" className="comics__item-img" />
                                    <div className="comics__item-name">{item.title}</div>
                                    <div className="comics__item-price">{item.price}</div>
                                </Link>
                            </li>
                        </CSSTransition>

                    )
                })}
            </TransitionGroup>

        )

    }




    const items = renderItems(comicsList);
    const errorMessage = error ? <ErrorMesage /> : null;
    const spiner = loading && !newItemLoading ? <Spiner /> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spiner}
            {items}
            <button className="button button__main button__long"
                style={{ 'display': comicsEnded ? 'none' : 'block' }}
                onClick={(e) => onRequest(e,offset)}
                disabled={newItemLoading}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;