// This file is used to fetch data from the spotify servers
"use server";
import { cookies } from "next/headers";
import { fetchUser } from "./db";
import { Profile, TopTracks, TopArtists, AudioFeatures, DiversityScore, Playlist, Artist, discoveryVsLoaylty, TrackData, recentTracks, ObscureGenres, Track } from "./types";

async function fetchUserData( access_token : string) : Promise<Profile | undefined> {
    try {
        const response = await fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        const data: Profile = await response.json();

        if (response.ok) {
            return data;
        } else {
            console.error('Error fetching user data:', data);
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }

    return undefined; // Add a return statement at the end of the function
}

// artists
async function fetchTopArtists(time_range: string, limit: string): Promise<TopArtists | undefined> {
    try {
        const cookiesStore = cookies();
        const spotify_id = cookiesStore.get('id')?.value || '';
        if (spotify_id === '') {
            console.error('No spotify id found in cookies');
        }
        const current_user = await fetchUser(spotify_id);

        if (!current_user) {
            throw new Error('No user found. Please login again');
        }
        const response = await fetch(`https://api.spotify.com/v1/me/top/artists?limit=${limit}&time_range=${time_range}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${current_user.access_token}`,
            },
        });

        const data: TopArtists = await response.json();

        if (response.ok) {
            return data;
        } else {
            console.error('Error fetching top artists:', data);
        }
    } catch (error) {
        console.error('Error fetching top artists:', error);
    }

    return undefined; // Add a return statement at the end of the function
}

async function fetchRecentArtists() : Promise<Artist[] | undefined> {
    try {
        const cookiesStore = cookies();
        const spotify_id = cookiesStore.get('id')?.value || '';
        if (spotify_id === '') {
            console.error('No spotify id found in cookies');
        }
        const current_user = await fetchUser(spotify_id);
        if (!current_user) {
            throw new Error('No user found. Please login again');
        }
        const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=10', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${current_user.access_token}`,
            },
        });

        const data = await response.json();

        if (response.ok) {
            const artists = data.items.map((item: any) => item.track.artists[0]);
            for(let i = 0; i < artists.length; i++) {
                const response = await fetch(`https://api.spotify.com/v1/artists/${artists[i].id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${current_user.access_token}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    artists[i] = data;
                }
            }
            const uniqueArtists = Array.from(new Set(artists.map((artist: any) => artist.id))).map(id => artists.find((artist: any) => artist.id === id));
            return uniqueArtists.slice(0, 5);
        } else {
            console.error('Error fetching recent artists:', data);
        }
    } catch (error) {
        console.error('Error fetching recent artists:', error);
    }

    return undefined; // Add a return statement at the end of the function
}


async function discoveryVsLoayltyScore() : Promise<discoveryVsLoaylty[] | undefined> {
    try {
        const cookiesStore = cookies();
        const spotify_id = cookiesStore.get('id')?.value || '';
        if (spotify_id === '') {
            console.error('No spotify id found in cookies');
        }
        const current_user = await fetchUser(spotify_id); 
        if (!current_user) {
            throw new Error('No user found. Please login again');
        }
        const response = await fetch('https://api.spotify.com/v1/me/top/artists?limit=10&time_range=long_term', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${current_user.access_token}`,
            },
        });

        const data = await response.json();

        if (response.ok) {
            const artists = data.items;
            const topArtists = artists.slice(0, 10);
            const artistData = topArtists.map(async (artist: any) => {
                const response = await fetch(`https://api.spotify.com/v1/artists/${artist.id}/related-artists`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${current_user.access_token}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    const relatedArtists = data.artists;
                    const discovery = relatedArtists.filter((relatedArtist: any) => !artists.find((a: any) => a.id === relatedArtist.id)).length;
                    const loyalty = relatedArtists.filter((relatedArtist: any) => artists.find((a: any) => a.id === relatedArtist.id)).length;
                    return { artist, discovery, loyalty };
                }
            });
            return Promise.all(artistData);
        } else {
            console.error('Error fetching discovery vs loyalty:', data);
        }
    } catch (error) {
        console.error('Error fetching discovery vs loyalty:', error);
    }

    return undefined; // Add a return statement at the end of the function
}


async function fetchTopTracks(time_range: string, limit: string): Promise<TopTracks | undefined> {
    try {
        const cookiesStore = cookies();
        const spotify_id = cookiesStore.get('id')?.value || '';
        if (spotify_id === '') {
            console.error('No spotify id found in cookies');
        }
        const current_user = await fetchUser(spotify_id);
        if (!current_user) {
            throw new Error('No user found. Please login again');
        }
        const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${time_range}&limit=${limit}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${current_user.access_token}`,
            },
        });

        const data: TopTracks = await response.json();

        if (response.ok) {
            return data;
        } else {
            console.error('Error fetching top tracks:', data);
        }
    } catch (error) {
        console.error('Error fetching top tracks:', error);
    }

    return undefined; // Add a return statement at the end of the function
}

async function fetchRecentTracks() : Promise<recentTracks| undefined> {
    try {
        const cookiesStore = cookies();
        const spotify_id = cookiesStore.get('id')?.value || '';
        if (spotify_id === '') {
            console.error('No spotify id found in cookies');
        }
        const current_user = await fetchUser(spotify_id); 
        if (!current_user) {
            throw new Error('No user found. Please login again');
        }
        const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=5', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${current_user.access_token}`,
            },
        });

        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            console.error('Error fetching recent tracks:', data);
        }
    } catch (error) {
        console.error('Error fetching recent tracks:', error);
    }

    return undefined; // Add a return statement at the end of the function
}


async function fetchEveryTopTrack(): Promise<TrackData | undefined> {
    try {
        const cookiesStore = cookies();
        const spotify_id = cookiesStore.get('id')?.value || '';
        if (spotify_id === '') {
            console.error('No spotify id found in cookies');
        }
        const current_user = await fetchUser(spotify_id);
        if (!current_user) {
            throw new Error('No user found. Please login again');
        }
        const shortTermResponse = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${current_user.access_token}`,
            },
        });

        const mediumTermResponse = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${current_user.access_token}`,
            },
        });

        const longTermResopnse = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${current_user.access_token}`,
            },
        });

        const shortTermData = await shortTermResponse.json();
        const mediumTermData = await mediumTermResponse.json();
        const longTermData = await longTermResopnse.json();

        if(shortTermData && mediumTermData && longTermData) {
            const res = {
                short_term: shortTermData,
                medium_term: mediumTermData,
                long_term: longTermData,
            }
            return res;
        } else {
            console.error('Error fetching every top track');
        }
    } catch (error) {
        console.error('Error fetching every top track:', error);
    }

    return undefined; // Add a return statement at the end of the function

}

// async function fetchTopGenres(jwt : string, limit: string) : Promise<Genre[] | undefined> {
//     try {
//         const response = await fetchTopArtists("long_term", limit);
//         if(response) {
//             const topArtists = response.items;
//             const genres = topArtists.flatMap(artist => artist.genres);
//             const genreCount = genres.reduce((acc, genre) => {
//                 acc[genre] = (acc[genre] || 0) + 1;
//                 return acc;
//             }, {} as Record<string, number>);
//             const sortedGenres = Object.entries(genreCount).sort((a, b) => b[1] - a[1]);
//             return sortedGenres.map(([name, count]) => ({ name, count }));
//         }
//     } catch(error) {
//         console.error('Error fetching top genres:', error);
//     } 
// }

// async function fetchAudioFeatures(jwt: string, trackId: string) : Promise<AudioFeatures | undefined> {
    
//     try {
//         const cookiesStore = cookies();
//         const spotify_id = cookiesStore.get('id')?.value || '';
//         if (spotify_id === '') {
//             console.error('No spotify id found in cookies');
//         }
//         const current_user = await fetchUser(spotify_id); 
//         if (!current_user) {
//             throw new Error('No user found. Please login again');
//         }
//         const response = await fetch(`https://api.spotify.com/v1/audio-features/${trackId}`, {
//             method: 'GET',
//             headers: {
//                 Authorization: `Bearer ${current_user.access_token}`,
//             },
//         });

//         const data = await response.json();

//         if (response.ok) {
//             return data;
//         } else {
//             console.error('Error fetching audio features:', data);
//         }
//     } catch (error) {
//         console.error('Error fetching audio features:', error);
//     }

//     return undefined; // Add a return statement at the end of the function
// }

async function fetchAudioFeaturesForTopTracks(time_range: string, limit: string) : Promise<AudioFeatures[] | undefined> {
    try {
        const cookiesStore = cookies();
        const spotify_id = cookiesStore.get('id')?.value || '';
        if (spotify_id === '') {
            console.error('No spotify id found in cookies');
        }
        const current_user = await fetchUser(spotify_id);
        if(!current_user) {
            throw new Error('No user found. Please login again');
        }
        const res = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${time_range}&limit=${limit}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${current_user.access_token}`,
            },
        });
        
        if(res.ok) {
            const topTracks = await res.json();
            topTracks.items.map(async (track: Track) => {
                const features = await fetch("https://api.spotify.com/v1/audio-features/" + track.id, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${current_user.access_token}`,
                    },
                });
                if(features.ok) {
                    const data = await features.json();
                    return data;
                }
            })
        }
    } catch(error) {
        console.error('Error fetching audio features for top tracks:', error);
    }
    return undefined;
} 

// async function fetchEmotions() : Promise<Emotion | undefined> {
//     try {
//         const audioFeatures = await fetchAudioFeaturesForTopTracks();
//         if(audioFeatures) {
//             const emotions = audioFeatures.map(mapToEmotion);
//             const labels = ['acoustic', 'happy', 'sad', 'party', 'instrumental', 'dance', 'neutral']
//             const data : Object = {};
//             labels.map((label, index) => {
//                 data[label] = 0;
//             })
//             for (let i = 0; i < emotions.length; i++) {
//                 for (let j = 0; j < emotions[i].length; j++) {
//                     data[emotions[i][j]] += 1;
//                 }
//             }
//             const label = 'Emotions';
//             return { labels, data, label };

//         } else {
//             console.error('Error fetching audio features for emotions');
//         }
//     } catch(error) {
//         console.error('Error fetching emotions:', error);
//     }
// }

async function diversityScore(artists: TopArtists) : Promise<DiversityScore | undefined> {
    try {
        const genreSet = new Set<string>();
        artists.items.forEach(artist => {
            artist.genres.forEach(genre => genreSet.add(genre));
        });
        const totalPopularrity = artists.items.reduce((acc, artist) => acc + artist.popularity, 0);
        const averagePopularity = totalPopularrity / artists.items.length;
        const res = genreSet.size / artists.items.length;
        const genreScore = genreSet.size;
        const maxGenre = 100;
        const maxPopularity = 100;
        const gS = (res / maxGenre) * 100; 
        const popularityScore = (averagePopularity / maxPopularity) * 100;
        const diversityScore = (gS + popularityScore) / 2;
        return {diversityScore, genreScore, popularityScore};
    } catch(error) {
        console.error('Error calculating artist diversity:', error);
    }
}

/* recommendations
for track recommendations : GET /recommendations
async function trackRecommendations() {
    try {
        const cookiesStore = cookies();
        const spotify_id = cookiesStore.get('id')?.value || '';
        if (spotify_id === '') {
            console.error('No spotify id found in cookies');
        }
        const current_user = await fetchUser(spotify_id);
        
        if(current_user) {
            const topTracks = await fetchTopTracks("long_term", "5");
            const seed_artists = topTracks?.items.map(track => track.artists[0].id).join(',');
            const response = await fetch(`https://api.spotify.com/v1/recommendations?limit=5&seed_artists=${seed_artists}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${current_user.access_token}`,
                }
            });
            const data = await response.json();
            if(response.ok) {
                return data;
            } else {
                console.error('Error fetching track recommendations:', data);
            }
        } else {
            throw new Error('No user found. Please login again');
        }
    } catch(error) {
        console.error('Error fetching track recommendations:', error);
    }
}


for playlist recommendations : GET /browse/featured-playlists
async function playlistRecommendations() : Promise<Playlist | undefined> {
    try {
        const cookiesStore = cookies();
        const spotify_id = cookiesStore.get('id')?.value || '';
        if (spotify_id === '') {
            console.error('No spotify id found in cookies');
        }
        const current_user = await fetchUser(spotify_id);

        if(current_user) {
            const response = await fetch('https://api.spotify.com/v1/browse/featured-playlists?limit=3', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${current_user.access_token}`,
                }
            });
            const data = await response.json();
            if(response.ok) {
                return data;
            } else {
                console.error('Error fetching playlist recommendations:', data);
            }
        } else {
            throw new Error('No user found. Please login again');
        }
    } catch(error) {
        console.error('Error fetching playlist recommendations:', error);
    }
}
*/

async function fetchObscureGenre() : Promise<ObscureGenres | undefined> {
    try {
        const response = await fetchTopArtists("long_term", "50");
        let mainstream = 0;
        let niche = 0;
        if(response) {
            const artists = response.items;
            for(let i = 0; i < artists.length; i++) {
                if(artists[i].popularity > 70) {
                    mainstream += artists[i].genres.length; 
                } else {
                    niche += artists[i].genres.length;
                }
            }
            return {mainstream, niche};
        }
    } catch(error) {
        console.error('Error fetching obscure genre:', error);
    }
}

export {
    fetchUserData,
    fetchTopArtists,
    fetchTopTracks,
    diversityScore,
    fetchRecentArtists,
    discoveryVsLoayltyScore,
    fetchObscureGenre,
    fetchEveryTopTrack,
    fetchAudioFeaturesForTopTracks,
    fetchRecentTracks,
}

