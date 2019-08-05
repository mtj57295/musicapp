const express = require('express');
const router = express.Router();
const config = require('config');
const { check, validationResult } = require('express-validator');
const Musixmatch = require('musixmatch-node');
const mxm = new Musixmatch('ad0a41dd454daeeda27bd888acf2201a');

router.get('/', (req, res) => res.send('Search API works'));

// @route POST  api/search/artists
// @desc       search by artists
// @access     Public
router.post('/artists', async (req, res) => {
   const { artist, artist_id } = req.body;
   let query = {};
   if(artist_id)
      query = {f_artist_id: artist_id};
   else if (artist)
      query = {q_artist: artist, page_size:30};
   else
      return res.json({ msg: 'No Parameter'} );

   try {
      const artistsFound = await mxm.searchArtist(query);
      if(!artistsFound)
         return res.status(400).json({ errors: [ { msg: 'Artist not found' }] });

      return res.json(artistsFound);

   } catch(err) {
      console.error(err.message);
      res.status(500).send('Server error');
   }
});

router.post('/tracks', async (req, res) => {
   const { track, artist, artist_id} =  req.body;
   let query = {};
   if(track && artist_id)
      query = {q_track: track, f_artist_id: artist_id, page_size: 10, s_track_rating: 'desc'};
   else if(track)
      query = {q_track: track, page_size:30, s_artist_rating: 'desc'};
   else if (artist)
      query = {q_artist: artist, page_size:10};
   else if (artist_id)
      query = {f_artist_id: artist_id, page_size: 100, s_track_rating: 'desc'};
   else
      return res.json({ msg: 'Song not found' });

   try {
      const songsFound = await mxm.searchTrack(query);
      if(!songsFound)
         return res.status(400).json({ errors: [ { msg: 'Artist not found' }] });
      return res.json(songsFound);

   } catch(err) {
      console.error(err.message);
      res.status(500).send('Server error');
   }
});

router.post('/albums', async (req, res) => {

   const { artist_id} =  req.body;
   const query = {artist_id: artist_id, page_size: 100, s_release_date: 'asc'};
   try {
      const albumsFound = await mxm.getArtistAlbums(query);
      if(!albumsFound)
         return res.status(400).json({ errors: [ { msg: 'Albums not found' }] });

      return res.json(albumsFound);

   } catch(err) {
      console.error(err.message);
      res.status(500).send('Server error');
   }
});


router.post('/toptracks', async (req, res) => {
   const { chart_name } = req.body;
   let query;
   if(chart_name) {
      query = {page_size: 20, chart_name: chart_name};
   } else {
      query = {page_size: 20, chart_name: 'top'};
   }

   try {
      const topTracksFound = await mxm.getTracksChart(query);
      if(!topTracksFound)
         return res.status(400).json({ errors: [ { msg: 'No top tracks found' }] });
      return res.json(topTracksFound);

   } catch(err) {
      console.error(err.message);
      res.status(500).send('Server error');
   }
});

router.get('/topartists', async (req, res) => {

   let query = {page_size: 20};

   try {
      const topArtistsFound = await mxm.getArtistsChart(query);
      if(!topArtistsFound)
         return res.status(400).json({ errors: [ { msg: 'No top artists found' }] });
      return res.json(topArtistsFound);

   } catch(err) {
      console.error(err.message);
      res.status(500).send('Server error');
   }
});

module.exports = router;
