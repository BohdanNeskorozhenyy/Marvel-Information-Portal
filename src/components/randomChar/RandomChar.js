import { Component } from 'react';
import mjolnir from '../../resources/img/mjolnir.png';

import MarvelServices from '../../services/MarvelService';
import Spiner from '../spiner/Spiner';
import ErrorMesage from '../errorMesage/ErrorMesage';

import './randomChar.scss';

class RandomChar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            char: {},
            loading: false,
            error: false,
        }
        this.marvelServices = new MarvelServices();
    }
    componentDidMount() {
        this.updateChar();
    }

    onCharLoaded = (char) => {
        this.changeErrorStatus(false)
        this.setState({ char: char })
    }
    changeLoadingStatus = () => {
        this.setState({ loading: !this.state.loading })
    }
    changeErrorStatus = (status) => {
        this.setState({ error: status })
    }

    updateChar = () => {
        this.changeLoadingStatus()
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)

        this.marvelServices.getOneCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.changeErrorStatus(true))
            .finally(this.changeLoadingStatus)

    }
    render() {
        const { loading, char, error } = this.state
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
                        <div className="inner" onClick={this.updateChar}>try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        )
    }

}

const View = ({ char }) => {
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
        if(url && url.indexOf('image_not_available') > 0){
            return 'randomchar__img randomchar__img--absent'
        }else{
            return 'randomchar__img'
        }
    }

    const { name, description, thumbnail, homepage, wiki, } = char;

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