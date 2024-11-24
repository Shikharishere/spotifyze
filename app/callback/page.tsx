"use client";
import { useEffect, useState } from 'react'
import LoadingSphere from '../ui/analysis/loading'
import AuthResult from '../ui/analysis/authresult'
import { addUser } from '../lib/db';
import { InsertUser } from '../lib/types';
import { fetchUserData } from '../lib/fetchData';
import { checkAuth, checkToken, handleTokenExchange} from '../lib/auth';
import { redirect, useSearchParams } from 'next/navigation';

export default function SpotifyCallback() {
  const [authStatus, setAuthStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const searchParams = useSearchParams()

  const code = searchParams.get('code') || '';

  useEffect(() => {
    const auth = checkAuth();
    if(typeof(auth) === "string" && auth === "Id cookie not found") {
      redirect("/");
    }
    setAuthStatus('loading')
    handleAuth(code as string)
  }, [])

  const handleAuth = async (code: string) => {
    try {
      // 1. Exchange the code for an access token
      const tokenResponse = await handleTokenExchange(code);

      if (!tokenResponse) {
        throw new Error('Failed to obtain access token')
      }

      const access_token = tokenResponse.access_token;
      const refresh_token = tokenResponse.refresh_token;

      const userData = await fetchUserData(access_token);


      if (!userData) {
        throw new Error('Failed to fetch user data from spotify')
      }

      // 2. Store the tokens in the database
      const user: InsertUser = {
        name: userData.display_name,
        spotify_id: userData.id,
        access_token,
        refresh_token,
      }

      const addeduser = await addUser(user);


      setTimeout(() => {
        setAuthStatus('success')
        setMessage('You have successfully authenticated with Spotify.')
      }, 1500);

    } catch (error) {
      console.error('Authentication error:', error)
      setAuthStatus('error')
      setMessage('An error occurred during authentication. Please try again.')
    }
  }

  if (authStatus === 'loading') {
    return <LoadingSphere />
  }
  return (
    <AuthResult 
      success={authStatus === 'success'} 
      message={message} 
    />
  )
}