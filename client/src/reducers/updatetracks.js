import {
   UPDATE_TOP_TRACKS,
} from '../actions/types';

const initialState = {
   loadingTracks: true,
   tracks: null,
}

export default function(state = initialState, action) {
   const { type, payload } = action;
   switch(type) {
      case UPDATE_TOP_TRACKS:
         return {
            ...state,
            loadingTracks: false,
            tracks: payload,
         }
      default:
         return state;
   }

}
