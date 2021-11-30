

class MarvelServices {
   _apiBase = 'https://gateway.marvel.com:443/v1/public/';
   _apiKey = 'apikey=0d3d741ca79babd5262fd9ef9bbcc887';
   getResourses = async (url) => {
      const res = await fetch(url);
      if (!res.ok) {
         throw new Error(`could not fetch ${url}, status: ${res.status}`);
      }
      return await res.json();
   }

   getAllCharacters = () => {
      return this.getResourses(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
   }
   getOneCharacter = (id) => {
      return this.getResourses(`${this._apiBase}characters/${id}?${this._apiKey}`);
   }
}

export default MarvelServices;