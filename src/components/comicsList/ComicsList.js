import { useEffect, useState, useRef } from 'react';
import './comicsList.scss';
import Spiner from '../spiner/Spiner';
import ErrorMesage from '../errorMesage/ErrorMesage';
import useMarvelService from '../../services/MarvelService';

const ComicsList = (props) => {
    const [comicsList, setcomicsList] = useState([]);
    const [newItemLoading, setnewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [comicsEnded, setcomicsEnded] = useState(false)

    const { getAllComics, error, loading } = useMarvelService();


    useEffect(() => {
        onRequest(offset, true);
    }, [])

    function onRequest(offset, innitial) {
        innitial ? setnewItemLoading(false) : setnewItemLoading(true)
        if (error) {
            setnewItemLoading(false)
        };
        getAllComics(offset)
            .then(onComicsListLoaded)
    }



    function onComicsListLoaded(newComicsList) {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }

        setOffset(offset => offset + 9);
        setcomicsList(comicsList => [...comicsList, ...newComicsList]);
        setnewItemLoading(false);
        setcomicsEnded(ended)
    }



    function renderItems(arr) {
        const items = arr.map((item, i) => {
            return (
                <li className="comics__item"
                    tabIndex={0}
                    key={item.id}>
                    <a href="#">
                        <img src={item.thumbnail} alt="ultimate war" className="comics__item-img" />
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </a>
                </li>
            )
        });
        return (
            <ul className="comics__grid">
                {items}
            </ul>
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
                onClick={() => onRequest(offset)}
                disabled={newItemLoading}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;