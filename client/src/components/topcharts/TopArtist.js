import React, { Fragment } from 'react';

const TopArtist = ({ artists }) => {

   const { artist_list } = artists;

   const displayArtist = artist_list.map(artist => {
      const { artist_name, artist_country, artist_rating, artist_twitter_url } = artist.artist;

      return (
         <div class="card topcharts grow">
           <div class="card-header">
             {artist_name}
           </div>
           <div class="card-body">
             <blockquote class="blockquote mb-0">
               {artist_twitter_url ? (
                  <a href={artist_twitter_url} target="_blank">{artist_name} Twitter</a>
               ) : (
                  <p>No twitter account</p>
               )}
               <footer class="blockquote-footer">Rating: <cite title="Source Title">{artist_rating}</cite></footer>
             </blockquote>
           </div>
         </div>
      );
   });

   return (
      <Fragment>
         {displayArtist}
      </Fragment>
   );
}

export default TopArtist;
