import axios from 'axios';
import URL from '../services/constants';

const apiKey = process.env.REACT_APP_MOVIE_API_KEY;

const apiRequest: (endpoint: string, queryString?: string) => Promise<any> = (
  endpoint: string,
  queryString: string = '',
) =>
  axios
    .get(`${URL}${endpoint}?${apiKey}${queryString}`)
    .then((result) => result.data)
    .catch((error) => `Something went wrong: ${error}`);

export default apiRequest;
