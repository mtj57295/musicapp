import axios from 'axios';

import {
   UPDATE_TOP_TRACKS
} from './types';

export const updateTopTracks = (chart_name) => async dispatch => {
   const config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }
   const body = JSON.stringify({chart_name});
   try {
      const res = await axios.post('/api/search/toptracks', body, config);
      dispatch({
         type: UPDATE_TOP_TRACKS,
         payload: res.data.message.body
      });
   } catch(err) {
      console.log(err)
   }
}
