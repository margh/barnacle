const request = require('request');

const { spotifyClientId, spotifyClientSecret, playlistUrl } = require('../config.js');

const AUTH = {
  user: spotifyClientId,
  pass: spotifyClientSecret,
};

const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/api/token';

function requestToken() {
  const authOpts = {
    auth: AUTH,
    form: {
      grant_type: 'client_credentials',
    },
  };
  return request.post(SPOTIFY_AUTH_URL, authOpts, requestPlaylist);
}

function requestPlaylist(err, res, body) {
  if (err) return console.error(err);
  const auth = JSON.parse(body);
  const playlistOpts = {
    auth: {
      bearer: auth.access_token,
    },
  };

  return request.get(playlistUrl, playlistOpts, playlistCb);
}

function playlistCb(err, res, body) {
  if (err) return console.error(err);
  const playlist = JSON.parse(body);
  console.log(playlist);
  return true;
}

// make it rain
requestToken();
