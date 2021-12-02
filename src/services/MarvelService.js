

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

   getAllCharacters = async() => {
      const res =  await this.getResourses(`${this._apiBase}characters?${this._apiKey}`);
      return res.data.results.map(item => this._transformcharacter(item));
   }
   getCharactersWithLimit = async(limit) => {
      const res = await this.getResourses(`${this._apiBase}characters?limit=${limit}&offset=210&${this._apiKey}`);
      return res.data.results.map(item => this._transformcharacter(item));
   }
   getOneCharacter = async (id) => {
      const res = await this.getResourses(`${this._apiBase}characters/${id}?${this._apiKey}`);
      return this._transformcharacter(res.data.results[0]);
   }
   _transformcharacter = (char) => {
      return {
         name: char.name,
         description: char.description,
         thumbnail: char.thumbnail.path + '/portrait_xlarge' + "." + char.thumbnail.extension,
         homepage: char.urls[0].url,
         wiki: char.urls[1].url, 
         id:char.id
      }
   }
}

export default MarvelServices;