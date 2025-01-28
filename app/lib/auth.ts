'use server'

import { cookies } from "next/headers";
import { deleteUser, fetchUser, updateUser } from "./db";
import { fetchUserData } from "./fetchData";

export async function getAuthorizationURL() {
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

export async function refreshToken() {
  try {
    const client_id = process.env.SPOTIFY_CLIENT_ID as string;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET as string;
    const cookieStore = cookies();
    const id = cookieStore.get('id')?.value || '';

    if(id === '') {
      throw new Error("Refresh tokens : Id cookie not found");
    }
    const current_user = await fetchUser(id);

    if(!current_user) {
      throw new Error("Refresh tokens: User not found id");
    }
    const refresh_token = current_user.refresh_token;

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token,
      }),
    });

    const data = await response.json();

    if(response.ok) {
      current_user.access_token = data.access_token;
      const update = await updateUser(current_user);
      if(update) {
        console.log('Refresh tokens: Sucessful');
      } else {
        throw new Error("Refresh tokens: Couldn't update user with new at");
      }
    } else {
      throw new Error("Refresh tokens: Did not get access token from auth server");
    }

  } catch (error) {
    console.error('Error refreshing token:', error);
  }
}

export async function checkToken(access_token : string) {
  const response = await fetch('https://api.spotify.com/v1/me/top/artists?limit=5', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const data = await response.json();

  console.log("Here", data);

  if(!response.ok && data.error.message === "The access token expired") {
    console.log("Access token expired");
    await refreshToken();
  }
}

export async function handleTokenExchange(code: string) : Promise<any | undefined> {
  try {
    const client_id = process.env.SPOTIFY_CLIENT_ID as string;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET as string;
    const redirect_uri = process.env.SPOTIFY_REDIRECT_URI as string;

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri,
      }),
    });

    const data = await response.json();


    if (response.ok) {
      return data;
    }
  } catch (error) {
    console.error('Error exchanging token:', error);
  }
}


export async function checkAuth() : Promise<Boolean | undefined> {
  try {
    const cookieStore = cookies();
    if(cookieStore.has('id')) {
	const currentUser = await fetchUser(cookieStore.get('id')?.value || '');
	if(currentUser && currentUser.access_token) {
        	await checkToken(currentUser.access_token);
        	return true
	} 
    } else {
        return false
    }
  } catch(error) {
    throw new Error(error);
  }
}

export async function logout() {
  try {
    const cookieStore = cookies();
    if(cookieStore.has('id')) {
      cookieStore.delete('id') 
    }
  } catch(error) {
    throw new Error("Error: " + error);
  }
}

export async function deleteAccount() {
  try {
    const cookieStore = cookies();
    if(cookieStore.has('id')) {
      const id = cookieStore.get('id')?.value || '';
      cookieStore.delete('id');
      deleteUser(id);
    }
  } catch(error) {
    throw new Error("Error: " + error);
  }
}
