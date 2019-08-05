import { combineReducers } from 'redux';
import updateartists from './updateartists';
import updatetracks from './updatetracks';
import search from './search';
import artistprofile from './artistprofile';
import auth from './auth';

export default combineReducers({
   updatetracks,
   updateartists,
   search,
   artistprofile,
   auth
});
