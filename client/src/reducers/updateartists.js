import {
   UPDATE_TOP_ARTIST
} from '../actions/types';

const initialState = {
   loadingArtists: true,
   artists: null
}

export default function(state = initialState, action) {
   const { type, payload } = action;
   switch(type) {
      case UPDATE_TOP_ARTIST:
         return {
            ...state,
            loadingArtists: false,
            artists: payload,
         }
      default:
         return state;
   }
}
