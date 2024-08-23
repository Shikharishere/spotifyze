import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const client_id = process.env.SPOTIFY_CLIENT_ID as string;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET as string;
    const redirect_uri = process.env.SPOTIFY_REDIRECT_URI as string;

    if (!code) {
        return NextResponse.json({ error: 'Invalid or missing code parameter' }, { status: 400 });
    }

    const body = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri,
        client_id: client_id,
        client_secret: client_secret,
    });

    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body.toString(),
        });

        const data = await response.json();

        if (response.ok) {
            // Handle storing tokens and redirecting the user as needed
            // or redirect to a success page
            return NextResponse.json({ message: 'Tokens fetched successfully' });
        } else {
            console.error('Error fetching tokens:', data);
            return NextResponse.json({ error: 'Error fetching tokens' }, { status: 500 });
        }
    } catch (error) {
        console.error('Error during callback:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
