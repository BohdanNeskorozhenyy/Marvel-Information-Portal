import { Component } from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelServices from '../../services/MarvelService';

class RandomChar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            char: {},
            isMarvelServicesLoaded: true
        }
        this.marvelServices = new MarvelServices();
        this.updateChar();
    }

    onCharLoaded = (char) => {
        this.setState({char})
    }
    changeLoadingStatus = ()=>{
        this.setState({isMarvelServicesLoaded:!this.state.isMarvelServicesLoaded})
    }

    updateChar = () => {
        this.changeLoadingStatus()
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)

        this.marvelServices.getOneCharacter(id)
            .then(this.onCharLoaded)
            .finally(this.changeLoadingStatus)

    }
    
    checkText = (text)=>{
        if (!text) {
            console.log('text:', text)
            return "Information not found";
        }else if(text.length > 200){
            return text.slice(0,201) + "..."
        } else{
            console.log('text:', text)
            return text
        }
    }

    render() {
        const { name, description, thumbnail, homepage, wiki,} = this.state.char;
        const {isMarvelServicesLoaded} = this.state
        return (
            <div className="randomchar">
                <div className="randomchar__block">
                    <img src={thumbnail} alt="Random character" className="randomchar__img" />
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                            {this.checkText(description)}
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
                        {isMarvelServicesLoaded ? <div className="loader"></div> : ''}
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        )
    }

}

export default RandomChar;