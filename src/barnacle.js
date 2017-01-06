const request = require('request');
const REHAB_URL = 'https://open.spotify.com/user/n.rashleigh/playlist/31qMenJWjMmw8btdraJKJR';

request(REHAB_URL, (playlistErr, res, playlist) => {
  console.log(res, playlist);
})
