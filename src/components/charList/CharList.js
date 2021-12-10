import { useEffect, useState, useRef } from 'react';
import PropTypes, { func } from 'prop-types';
import Spiner from '../spiner/Spiner';
import ErrorMesage from '../errorMesage/ErrorMesage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';

const CharList = (props) => {
    const [charList, setcharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setnewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setcharEnded] = useState(false)

    const marvelService = new MarvelService();


    useEffect(() => {
        onRequest(offset);
    }, [])

    function onRequest(offset){
        onCharListLoading();
        marvelService.getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)
    }

    function onCharListLoading() {
        setnewItemLoading(true)
    };

    function onCharListLoaded(newCharList) {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setOffset(offset => offset + 9);
        setcharList(charList => [...charList, ...newCharList]);
        setLoading(false);
        setnewItemLoading(false);
        setcharEnded(ended)
    }

    function onError() {
        setError(true);
        setLoading(false);
    }



    const itemRefs = useRef([]);
 
    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }
    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = { 'objectFit': 'cover' };
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            }

            return (
                <li
                    className="char__item"
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el}
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }
                    }}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }



 
    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMesage /> : null;
    const spiner = loading ? <Spiner /> : null;
    const content = !(loading || error) ? items : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spiner}
            {content}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}


CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;