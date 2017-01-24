/**
 * Created by Raphson on 1/24/17.
 */

const ApiRepository = make('App/Repositories/ApiRepository')
const Env = use('Env')
const async = require('async');
const LastFmNode = require('lastfm').LastFmNode;

class LastFmController {

    constructor () {
        this.lastfm = new LastFmNode({
            api_key: Env.get('LASTFM_ID'),
            secret: Env.get('LASTFM_SECRET')
        });
        this.artist = "Rihanna";
    }

    * index (request, response) {
        try {
            const lastFmResponse = yield this.getData();
            console.log(lastFmResponse)
            yield response.sendView('api.lastfmApi', { artist: lastFmResponse})
        } catch(e){
            console.log('error', e.message);
            yield response.sendView('api.lastfmApi', { artist: {}})
        }
    }

    getData() {
        return new Promise((resolve, reject) => {
            async.parallel({
                artistInfo: (done) => {
                    this.lastfm.request('artist.getInfo', {
                        artist: this.artist,
                        handlers: {
                            success: (data) => {
                                done(null, data);
                            },
                            error: (err) => {
                                done(err);
                            }
                        }
                    });
                },
                artistTopTracks: (done) => {
                    this.lastfm.request('artist.getTopTracks', {
                        artist: this.artist,
                        handlers: {
                            success: (data) => {
                                done(null, data.toptracks.track.slice(0, 20));
                            },
                            error: (err) => {
                                done(err);
                            }
                        }
                    });
                },
                artistTopAlbums: (done) => {
                    this.lastfm.request('artist.getTopAlbums', {
                        artist: this.artist,
                        handlers: {
                            success: (data) => {
                                done(null, data.topalbums.album.slice(0, 10));
                            },
                            error: (err) => {
                                done(err);
                            }
                        }
                    });
                }
            }, (err, results) => {
                if (err) { return reject(err); }
                return resolve({
                    name: results.artistInfo.artist.name,
                    image: results.artistInfo.artist.image.slice(-1)[0]['#text'],
                    tags: results.artistInfo.artist.tags.tag,
                    bio: results.artistInfo.artist.bio.summary,
                    stats: results.artistInfo.artist.stats,
                    similar: results.artistInfo.artist.similar.artist,
                    topAlbums: results.artistTopAlbums,
                    topTracks: results.artistTopTracks
                });
            });
        })
    }
}

module.exports = LastFmController