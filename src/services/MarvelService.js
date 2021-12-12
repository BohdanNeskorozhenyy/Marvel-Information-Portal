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
   return {loading, error, getAllCharacters, getOneCharacter, ClearError}
}

export default useMarvelServices;