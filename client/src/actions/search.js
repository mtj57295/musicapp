import axios from 'axios';

import {
   SEARCH_TRACK,
   SEARCH_ALBUM,
   SEARCH_ARTIST,
   CLEAR_SEARCH
} from './types';


export const searchMusic = (searchType, input) => async dispatch => {
   const config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }
   try {
      if(searchType === 'Track') {
         const body = JSON.stringify({track: input});
         const res = await axios.post('/api/search/tracks', body, config);
         dispatch({
            type: SEARCH_TRACK,
            payload: res.data.message.body
         });
      } else if(searchType === 'Artist') {
         const body = JSON.stringify({artist: input});
         const res = await axios.post('/api/search/artists', body, config);
         dispatch({
            type: SEARCH_ARTIST,
            payload: res.data.message.body
         });
      }
   } catch(err) {
      console.log(err)
   }
}

export const clearSearch = () => async dispatch => {

   dispatch({
      type: CLEAR_SEARCH,
      payload: null
   });
}
