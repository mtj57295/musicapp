import React, { Fragment } from 'react';

const Artists = ({ artists }) => {

   const { artist_list } = artists;
   const displayArtists = artist_list.map((artist, index) => {
      const { artist_name, artist_rating, artist_twitter_url } = artist.artist;
      index++;
      return (
         <tr className=''>
          <th scope="row">{index}</th>
          <td>{ artist_name }</td>
          { artist_rating ? (<td>{ artist_rating }</td>) : (<td>No Rating</td>)}
          { artist_twitter_url ?
             (<td><a href={artist_twitter_url} target="_blank">{artist_name} Twitter</a></td>)
             :
             (<td>No Twitter</td>)
          }
        </tr>
      );
   });

   return (
      <Fragment>
         <table className="table table-hover">
           <thead>
             <tr>
               <th scope="col">#</th>
               <th scope="col">Artist</th>
               <th scope="col">Rating</th>
               <th scope="col">Twitter</th>
             </tr>
              </thead>
              <tbody>
                {displayArtists}
              </tbody>
            </table>
      </Fragment>
   );
}

export default Artists;
