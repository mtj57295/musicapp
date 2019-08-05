import React, {Fragment, useEffect, useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateTopTracks } from '../../actions/updatetracks';
import { updateTopArtist } from '../../actions/updateartists';

import Spinner from '../layout/Spinner';
import TopTracks from './TopTracks';
import TopArtist from './TopArtist';

const TopCharts = ({updatetracks: { tracks, loadingTracks }, updateartists: {artists, loadingArtists},
                     updateTopTracks, updateTopArtist}) => {

   const [chartNameTracks, setChartNameTracks] = useState('top');
   useEffect(() => {
      updateTopTracks(chartNameTracks);
      updateTopArtist();
   }, []);

   const updateCharts = (chartName) => {
      setChartNameTracks(chartName);
      updateTopTracks(chartName);
   }


   const dropdown = (
      <div>
         <div className="dropdown">
           <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
             {chartNameTracks}
           </button>
           <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
             <a className="dropdown-item" onClick={() => updateCharts('top')}>Top</a>
             <a className="dropdown-item" onClick={() => updateCharts('hot')}>Hot</a>
             <a className="dropdown-item" onClick={() => updateCharts('mxmweekly')}>Most Viewed Lyrics</a>
           </div>
         </div>
     </div>
   );

   const checkValidations = () => {
      if((loadingTracks || loadingArtists) && (tracks === null || artists === null)) {
         return (<Spinner />);
      }
      else {
         return (
            <div>
               <h1 className='title'>Top Tracks <span className="badge badge-secondary">{dropdown}</span></h1>
               <div className="topcharts-container">
                 <TopTracks tracks={tracks} />
               </div>

               <h1 className='title'>Top Artists </h1>
               <div className="topcharts-container">
                 <TopArtist artists={artists} />
               </div>
            </div>
         );
      }
   }

   return (
    <Fragment>
      <div style={{backgroundColor: 'white'}}>
         {checkValidations()}
      </div>
    </Fragment>
   );
}

TopCharts.propTypes = {
   updateTopTracks: PropTypes.func.isRequired,
   updateTopArtist: PropTypes.func.isRequired,
   updatetracks: PropTypes.object.isRequired,
   updateartists: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   updatetracks: state.updatetracks,
   updateartists: state.updateartists
});

export default connect(mapStateToProps, { updateTopTracks, updateTopArtist })(TopCharts);
