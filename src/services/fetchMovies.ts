export const BASE_URL = `http://www.omdbapi.com/?apikey=${process.env.MOVIE_API_KEY}&`;

export const getMovies = async () => {
  return await fetch(BASE_URL, {
    method: "GET",
  });
};