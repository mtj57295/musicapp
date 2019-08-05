import axios from 'axios';

import {
   UPDATE_TOP_ARTIST
} from './types';


export const updateTopArtist = () => async dispatch => {
   try {
      const res = await axios.get('/api/search/topartists');
      dispatch({
         type: UPDATE_TOP_ARTIST,
         payload: res.data.message.body
      });
   } catch(err) {
      console.log(err)
   }
}
