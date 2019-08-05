import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getArtistAlbums, clearArtistProfile, searchArtistTracks } from '../../actions/artistprofile';

import Spinner from '../layout/Spinner';
import Albums from './Albums';
import Tracks from '../search/Tracks';

const ArtistProfile = ({ artistprofile: {artist, albums, tracks, albumTracks, loadingArtistProfile},
 getArtistAlbums, clearArtistProfile, searchArtistTracks}) => {

   const [artistData, setArtistData] = useState({
      artist_name: '',
      artist_rating: '',
      artist_country: '',
      artist_twitter_url: ''
   });

   const [ formData, setFormData ] = useState({
      search: ''
   });

   const { artist_name, artist_rating, atrist_country, artist_twitter_url } = artistData;
   const { search } = formData;

   useEffect(() => {
      if(!loadingArtistProfile) {
         const artistInfo = artist.artist_list[0].artist;
         setArtistData({
            artist_name: artistInfo.artist_name,
            artist_rating: !artistInfo.artist_rating ? 'No Rating' : artistInfo.artist_rating,
            artist_country: !artistInfo.artist_country ? 'No Country' : artistInfo.artist_country,
            artist_twitter_url: !artistInfo.artist_twitter_url ? 'No Twitter' : artistInfo.artist_twitter_url
         });

         getArtistAlbums(artistInfo.artist_id);

         return () => {
            clearArtistProfile();
            setArtistData({
               artist_name: '',
               artist_rating: '',
               artist_country: '',
               artist_twitter_url: ''
            });
            setFormData({...formData, search: ''});
         }
      }
   }, [loadingArtistProfile]);

   const onChange = e => {
      setFormData({...formData, [e.target.name]: e.target.value});
   }

   const onSubmit = e => {
      e.preventDefault();
      const artist_id = artist.artist_list[0].artist.artist_id;
      searchArtistTracks(artist_id, search);
   }

   const searchTracks = () => {
      if(!loadingArtistProfile)
         if(tracks !== null)
            return (<Tracks tracks={tracks} />);
   }

   return (
      <Fragment>
         <h1 className='title'>{artist_name}</h1>
         {!loadingArtistProfile && albums !== null ? (<Albums albums={albums} />) : (<Spinner />)}
         <h1 style={{fontSize: '30px'}} className='title'>Search</h1>
         <div style={{marginLeft: '15%', marginRight: '15%'}}>
            <div style={{display: 'flex', flexDirection: 'row'}}>
               <input
                  type="text"
                  class="form-control"
                  name='search'
                  value={search}
                  onChange={e => onChange(e)}
                  required/>
               <button type="submit" onClick={e => onSubmit(e) } class="btn btn-primary my-1">Submit</button>
            </div>
            <small className="form-text text-muted">
              A blank search will give you the top songs
            </small>
            <div>
               {searchTracks()}
            </div>
         </div>
      </Fragment>
   );
}

ArtistProfile.propTypes = {
   artistprofile: PropTypes.object.isRequired,
   getArtistAlbums: PropTypes.func.isRequired,
   clearArtistProfile: PropTypes.func.isRequired,
   searchArtistTracks: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
   artistprofile: state.artistprofile
});

export default connect(mapStateToProps, { getArtistAlbums,
   clearArtistProfile, searchArtistTracks })(ArtistProfile);
