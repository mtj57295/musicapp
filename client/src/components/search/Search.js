import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchMusic, clearSearch } from  '../../actions/search';

import Spinner from '../layout/Spinner';
import Tracks from './Tracks';
import Artists from './Artists';


const Search = ({ search: { tracks, artists, loadingSearch }, searchMusic, clearSearch}) => {

   useEffect(() => {
      return () => {
         clearSearch();
         setFormData({...formData, search: ''});
      }
   }, []);

   const [ searchType, setSearchType ] = useState('Track');
   const [ formData, setFormData ] = useState({
      search: ''
   });


   const { search } = formData;

   const onChange = e => {
      setFormData({...formData, [e.target.name]: e.target.value});
   }

   const onSubmit = e => {
      e.preventDefault();
      searchMusic(searchType, search);
   }

   const updateSearch = (type) => {
      setSearchType(type);
      clearSearch();
      if(tracks !== null || artists !== null)
         setFormData({...formData, search: ''});
   }

   const checkSearchType = () => {
      if(!loadingSearch) {
         if(tracks !== null  && searchType === 'Track')
            return (<Tracks tracks={tracks} />);
         else if(artists !== null && searchType === 'Artist')
            return (<Artists artists={artists} />);
      }
   }

   const dropdown = (
      <div>
         <div className="dropdown">
           <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
             {searchType}
           </button>
           <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
             <a className="dropdown-item" onClick={() => updateSearch('Track')}>Track</a>
             <a className="dropdown-item" onClick={() => updateSearch('Artist')}>Artist</a>
           </div>
         </div>
     </div>
   )

   return (
      <Fragment>
         <div className='search-container'>
            <h1 className='title'>Search<span className="badge badge-secondary">{dropdown}</span></h1>
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
              search by artist, tracks, and lyrics
            </small>
            {checkSearchType()}
         </div>
      </Fragment>
   );
}

Search.propTypes = {
   clearSearch: PropTypes.func.isRequired,
   search: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   search: state.search,
});

export default connect(mapStateToProps, { searchMusic, clearSearch })(Search);
