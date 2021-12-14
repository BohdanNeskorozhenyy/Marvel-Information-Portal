import {useHttp} from '../hooks/http.hook';

const useMarvelServices = () => {

   const {loading, request, error, ClearError} = useHttp();

   const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
   const _apiKey = 'apikey=0d3d741ca79babd5262fd9ef9bbcc887';
   const _apiKey2 = 'apikey=5c0230b89dedb9a8007dcfcac7b2a18c';
   const _baseOffset = 210;

   const getAllCharacters = async(offset = _baseOffset) => {
      const res =  await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
      return res.data.results.map(item => _transformcharacter(item));
   }

   const getAllComics = async(offset = 0) => {
      const res =  await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
      return res.data.results.map(item => _transformcomicks(item));
   }

   const getOneComics = async (id) => {
      const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
      return _transformcomicks(res.data.results[0]);
   }


   const getOneCharacter = async (id) => {
      const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
      return _transformcharacter(res.data.results[0]);
   }

   const _transformcharacter = (char) => {
      return {
         name: char.name,
         description: char.description,
         thumbnail: char.thumbnail.path + '/portrait_xlarge' + "." + char.thumbnail.extension,
         homepage: char.urls[0].url,
         wiki: char.urls[1].url, 
         id:char.id,
         comics: char.comics.items
      }
   }

   const _transformcomicks = (comics) =>{
      return {
         id: comics.id,
         title: comics.title,
         description: comics.description || 'There is no description',
         pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
         thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
         language: comics.textObjects.language || 'en-us',
         price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'not available'
     }
   }
   return {loading, error, getAllCharacters, getAllComics, getOneCharacter, ClearError, getOneComics}
}

export default useMarvelServices;