import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Albums = ({ albums }) => {

   let existingAlbums = new Set();
   const { album_list } = albums;
   const displayAlbums = album_list.map(album => {
      const { album_name, album_rating, album_release_date,  } = album.album;
      if(!existingAlbums.has(album_name)) {
         existingAlbums.add(album_name);
         return (
            <div class="card" style={{width: '18rem'}}>
              <div class="card-body">
                <h5 class="card-title">{album_name}</h5>
                {album_rating ?
                   (<p class="card-text">Rating: {album_rating}</p>) :
                   (<p class="card-text">No Rating</p>)}
                {album_release_date ?
                   (<p class="card-text">Release Date: {album_release_date}</p>) :
                   (<p class="card-text">No Release Date</p>)}
                <a href="#" class="btn btn-primary">Album Tracks</a>
              </div>
            </div>
         );
      }
   });

   return (
      <Fragment>
         <h1 style={{fontSize: '30px'}} className='title'>Albums</h1>
         <div className='albums-container'>
            {displayAlbums}
         </div>
      </Fragment>
   );
}

export default Albums;
