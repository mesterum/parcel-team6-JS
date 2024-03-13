import { API_URL, API_KEY } from './api';
import { refs } from './refs';

export async function fetchTrailer(id=) {
  try {
    return await fetch(`${API_URL}movie/${id}/videos?api_key=${API_KEY}`).then(
      resp => {
        if (!resp.ok) {
          throw new Error('Bad request!!!');
        }
        return resp.json();
      }
    );
  } catch (err) {
    console.log(err);
  }
}

