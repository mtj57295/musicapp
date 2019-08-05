import axios from 'axios';

import {
   GET_ARTIST_PROFILE,
   GET_ARTIST_ALBUMS,
   CLEAR_ARTIST_PROFILE,
   SEARCH_ARTIST_TRACKS
} from './types';


export const getArtistProfile = (artist_id) => async dispatch => {
   const config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }
   const body = JSON.stringify({artist_id});

   try {
      const res = await axios.post('/api/search/artists', body, config);
      dispatch({
         type: GET_ARTIST_PROFILE,
         payload: res.data.message.body
      });
   } catch(err) {
      console.log(err)
   }
}

export const getArtistAlbums = (artist_id) => async dispatch => {
   const config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }
   const body = JSON.stringify({artist_id});

   try {
      const res = await axios.post('/api/search/albums', body, config);
      dispatch({
         type: GET_ARTIST_ALBUMS,
         payload: res.data.message.body
      });
   } catch(err) {
      console.log(err)
   }
}

export const clearArtistProfile = () => async dispatch => {
   dispatch({
      type: CLEAR_ARTIST_PROFILE
   });
}

export const searchArtistTracks = (artist_id, track) => async dispatch => {
   const config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }
   const body = JSON.stringify({artist_id, track});

   try {

      const res = await axios.post('/api/search/tracks', body, config);
      dispatch({
         type: SEARCH_ARTIST_TRACKS,
         payload: res.data.message.body
      })
   } catch(err) {
      console.log(err)
   }
}
