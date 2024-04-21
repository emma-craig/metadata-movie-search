//export const BASE_URL = `http://www.omdbapi.com/?apikey=${process.env.MOVIE_API_KEY}&`;
// need to add search parameter s=${search}
export const BASE_URL = 'http://www.omdbapi.com/?apikey=b9e5de7e&s=rambo'
export const getMovies = async () => {

  return await fetch(BASE_URL, {
    method: "GET",
  });
};


