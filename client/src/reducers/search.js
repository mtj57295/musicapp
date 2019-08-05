import {
   SEARCH_TRACK,
   SEARCH_ALBUM,
   SEARCH_ARTIST,
   CLEAR_SEARCH
} from '../actions/types';

const initialState = {
   loadingSearch: true,
   artists: null,
   tracks: null,
   albums: null
}

export default function(state = initialState, action) {
   const { type, payload } = action;
   switch(type) {
      case SEARCH_TRACK:
         return {
            ...state,
            loadingSearch: false,
            tracks: payload,
         }
         case SEARCH_ARTIST:
            return {
               ...state,
               loadingSearch: false,
               artists: payload,
            }
         case CLEAR_SEARCH:
            return {
               ...state,
               tracks: null,
               albums: null,
               artists: null,
               loadingSearch: false
            }
      default:
         return state;
   }
}
