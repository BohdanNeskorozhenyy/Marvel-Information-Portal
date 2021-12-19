import { useEffect, useState, useRef } from 'react';
import PropTypes, { func } from 'prop-types';
import Spiner from '../spiner/Spiner';
import ErrorMesage from '../errorMesage/ErrorMesage';
import useMarvelService from '../../services/MarvelService';
import './charList.scss';
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group'

const CharList = (props) => {
    const [charList, setcharList] = useState([]);
    const [newItemLoading, setnewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setcharEnded] = useState(false);


    const { getAllCharacters, error, loading } = useMarvelService();


    useEffect((e) => {
        onRequest(e,offset, true);
    }, [])

    function onRequest(e, offset, innitial) {
        innitial ? setnewItemLoading(false) : setnewItemLoading(true)
        if (error) {
            setnewItemLoading(false)
        };
        getAllCharacters(offset)
            .then(res => onCharListLoaded(res, e))
    }


    function onCharListLoaded(newCharList, e) {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setOffset(offset => offset + 9);
        setcharList(charList => [...charList, ...newCharList]);
        setnewItemLoading(false);
        setcharEnded(ended)
        if (e) {
            window.scrollBy(0, 600)
        }
    }



    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    function renderItems(arr) {
        return (
            <TransitionGroup className="char__grid">

                {arr.map((item, i) => {
                    let imgStyle = { 'objectFit': 'cover' };
                    if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                        imgStyle = { 'objectFit': 'unset' };
                    }

                    return (

                        <CSSTransition
                            key={item.id}
                            timeout={500}
                            classNames="char__item"
                        >
                            <li className="char__item"
                                onKeyPress={(e) => {
                                    if (e.key === ' ' || e.key === "Enter") {
                                        props.onCharSelected(item.id);
                                        focusOnItem(i);
                                    }
                                }}
                                onClick={() => {
                                    props.onCharSelected(item.id);
                                    focusOnItem(i);
                                }}
                                tabIndex={0}
                                ref={el => itemRefs.current[i] = el}>
                                <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                                <div className="char__name">{item.name}</div>
                            </li>
                        </CSSTransition>
                    )
                })}

            </TransitionGroup>
        )

    }




    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMesage /> : null;
    const spiner = loading && !newItemLoading ? <Spiner /> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spiner}
            {items}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
                onClick={(e) => onRequest(e, offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}


CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;