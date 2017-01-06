const request = require('request');

const { spotifyClientId, spotifyClientSecret, playlistUrl } = require('../config.js');

const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/api/token';

function requestToken() {
  const authOpts = {
    auth: {
      user: spotifyClientId,
      pass: spotifyClientSecret,
    },
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
  console.log(`Received ${playlist.tracks.total} tracks:`);
  playlist.tracks.items.map(tr => console.log(tr.track));
}

// make it rain
requestToken();
