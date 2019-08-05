import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const TopTracks = ({ tracks }) => {

   const { track_list } = tracks;

   const displayTracks = track_list.map(track => {
      const { album_name, artist_name, track_name } = track.track;
      return (
         <div class="card topcharts grow">
           <div class="card-header">
             {track_name}
           </div>
           <div class="card-body">
             <blockquote class="blockquote mb-0">
               <p>Album: {album_name}</p>
               <footer class="blockquote-footer">Artist: <cite title="Source Title">{artist_name}</cite></footer>
             </blockquote>
           </div>
         </div>
      );
   });

   return (
      <Fragment>
         {displayTracks}
      </Fragment>
   );
}

export default TopTracks;
