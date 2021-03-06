import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import useMarvelServices from '../../services/MarvelService';
import Spiner from '../spiner/Spiner';
import { Link } from 'react-router-dom';
import ErrorMesage from '../errorMesage/ErrorMesage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    const { getOneCharacter, loading, error, ClearError } = useMarvelServices();
    const pageType = 'comicPage'


    useEffect(() => {
        updateChar();
    }, [props.charId])


    function updateChar() {
        ClearError();
        if (!props.charId) {
            return;
        }

        getOneCharacter(props.charId)
            .then(onCharLoaded)
    }

    function onCharLoaded(char) {
        setChar(char);
    }



    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMesage /> : null;
    const spinner = loading ? <Spiner /> : null;
    const content = !(loading || error || !char) ? <View char={char} pageType={pageType} /> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )

}

const View = ({ char, pageType }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;
    let imgStyle = { 'objectFit': 'cover' };
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { 'objectFit': 'contain' };
    }
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics with this character'}
                {
                    comics.map((item, i) => {
                        const id = item.resourceURI.replace(/http:\/\/gateway.marvel.com\/v1\/public\/comics\//, "");
                        return (
                            <li key={i} className="char__comics-item">
                                <Link to={`/comics/${pageType}/${id}`}>
                                    {item.name}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;