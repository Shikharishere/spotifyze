'use server'


export async function authenticate() {
    try {
      const client_id = process.env.SPOTIFY_CLIENT_ID as string;
      const redirect_uri = process.env.SPOTIFY_REDIRECT_URI as string;
      const state = Math.random().toString(36).substring(2, 18);
      const scope = [
        'user-read-email',
        'user-library-read',
        'user-top-read',
        'user-read-recently-played',
        'playlist-read-private',
      ]
        .join(' ');

      const url = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${scope}&state=${state}`;
      return url;
    } catch (error) {
      console.error('Error during authorization:', error);
    }
}

export async function getArtists() {
    try {
      const response = await fetch("https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb", {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }