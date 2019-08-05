import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getArtistProfile } from '../../actions/artistprofile';

const Tracks = ({ tracks, getArtistProfile }) => {

   const setArtistId = artist_id => {
      getArtistProfile(artist_id);
   }

   const { track_list } = tracks;
   const displayTracks = track_list.map((track, index) => {
      const { track_name, album_name, artist_name, artist_id } = track.track;
      const genrelist = track.primary_genres.music_genre_list[0].music_genre;
      let music_genre_name = '';
      if(genrelist !== null)
         music_genre_name = genrelist.music_genre_name;
      index++;
      return (
         <tr className=''>
          <th scope="row">{index}</th>
          <td>{ track_name }</td>
          <td>{ album_name }</td>
          <td><Link onClick={() => setArtistId(artist_id)} to='./artistprofile' >{ artist_name }</Link></td>
          { music_genre_name ? (<td>{ music_genre_name }</td>) : (<td>No genre found</td>) }
        </tr>
      );
   });

   return (
      <Fragment>
         <table className="table table-hover">
           <thead>
             <tr>
               <th scope="col">#</th>
               <th scope="col">Track</th>
               <th scope="col">Album</th>
               <th scope="col">Artist</th>
               <th scope="col">Genre</th>
             </tr>
              </thead>
              <tbody>
                {displayTracks}
              </tbody>
            </table>
      </Fragment>
   );
}

Tracks.propTypes = {
   getArtistProfile: PropTypes.func.isRequired,
};


export default connect(null, { getArtistProfile })(Tracks);
