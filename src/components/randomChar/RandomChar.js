import { useState, useEffect } from 'react';
import mjolnir from '../../resources/img/mjolnir.png';
import Spiner from '../spiner/Spiner';
import ErrorMesage from '../errorMesage/ErrorMesage';
import useMarvelServices from '../../services/MarvelService';

import './randomChar.scss';

const RandomChar = (props) => {
    const { loading, error, getOneCharacter, ClearError} = useMarvelServices();

    const [char, setChar] = useState({});


    useEffect(() => {
        updateChar();
    }, [])

    function onCharLoaded(char) {
        setChar(char);
    }


    function updateChar() {
        ClearError()
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)

        getOneCharacter(id)
            .then(onCharLoaded)

    }

    return (
        <div className="randomchar">
            {loading && <Spiner /> || error && <ErrorMesage /> || <View char={char} />}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main">
                    <div className="inner" onClick={updateChar} >try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )


}

const View = (props) => {
    const checkText = (text) => {
        if (!text) {
            return "Information not found";
        } else if (text.length > 200) {
            return text.slice(0, 201) + "..."
        } else {
            return text
        }
    }

    const CheckImg = (url) => {
        if (url && url.indexOf('image_not_available') > 0) {
            return 'randomchar__img randomchar__img--absent'
        } else {
            return 'randomchar__img'
        }
    }
    const { name, description, thumbnail, homepage, wiki, } = props.char;
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className={CheckImg(thumbnail)} />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {checkText(description)}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;