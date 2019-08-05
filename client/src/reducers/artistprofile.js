import {
   GET_ARTIST_PROFILE,
   GET_ARTIST_ALBUMS,
   CLEAR_ARTIST_PROFILE,
   SEARCH_ARTIST_TRACKS
} from '../actions/types';


const initialState = {
   loadingArtistProfile: true,
   artist: null,
   albums: null,
   albumTracks: null,
   tracks: null
}

export default function(state = initialState, action) {
   const { type, payload } = action;
   switch(type) {
      case GET_ARTIST_PROFILE:
         return {
            ...state,
            loadingArtistProfile: false,
            artist: payload,
         }
      case GET_ARTIST_ALBUMS:
         return {
            ...state,
            loadingArtistProfile: false,
            albums: payload
         }
      case SEARCH_ARTIST_TRACKS:
         return {
            ...state,
            loadingArtistProfile: false,
            tracks: payload
         }
      case CLEAR_ARTIST_PROFILE:
         return {
            ...state,
            loadingArtistProfile: true,
            artist: null,
            albums: null,
            albumTracks: null,
            tracks: null
         }
      default:
         return state;
   }
}
