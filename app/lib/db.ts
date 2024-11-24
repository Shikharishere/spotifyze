"use server";
import {db} from '@vercel/postgres';
import { InsertUser, User } from '../lib/types'
import { cookies } from 'next/headers';

async function addUser(user : InsertUser) : Promise<User | undefined> {
    const client = await db.connect();

    try {
        const u = await fetchUser(user.spotify_id);
        if (u) {
            cookies().set({
            name: 'id',
            value: user.spotify_id,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: "/",
            maxAge: 60 * 60 * 24 * 4 // 4 days
            });
            console.log(`Cookie set: ${cookies().get('id')}`);
            await client.query(
                'UPDATE users SET access_token = $1 WHERE spotify_id = $2',
                [user.access_token, user.spotify_id]
            );
            return u;
        }

        await client.query(
            'INSERT INTO users (name, spotify_id, access_token, refresh_token) VALUES ($1, $2, $3, $4) RETURNING *',
            [user.name, user.spotify_id, user.access_token, user.refresh_token]
        )

        cookies().set({
            name: 'id',
            value: user.spotify_id,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: "/",
            maxAge: 60 * 60 * 24 * 4 // 4 days
        });

        return await fetchUser(user.spotify_id);
    } catch (error) {
        throw new Error("Error: " + error);
    } finally {
        client.release()
    }
}

async function fetchUser(id : string) : Promise<User | undefined> {
    const client = await db.connect();

    try {
        const result = await client.query(
            'SELECT * FROM users WHERE spotify_id = $1',
            [id]
        )
        return result.rows[0]
    } catch (error) {
        throw new Error("Error: " + error);
    } finally {
        client.release()
    }
}

async function updateUser(user : User) : Promise<User | undefined> {
    const client = await db.connect();

    try {
        await client.query(
            'UPDATE users SET access_token = $1, refresh_token = $2 WHERE spotify_id = $3',
            [user.access_token, user.refresh_token, user.spotify_id]
        )

        const result = await client.query(
            'SELECT * FROM users WHERE id = $1',
            [user.id]
        );

        return result.rows[0];
    } catch (error) {
        throw new Error("Error: " + error);
    } finally {
        client.release()
    }
}

async function deleteUser(id: string) : Promise<Boolean | undefined> {
    const client = await db.connect();

    try {
        await client.query(
            'DELETE FROM users WHERE spotify_id = $1',
            [id]
        )
        return true;
    } catch (error) {
        throw new Error("Error: " + error);
    } finally {
        client.release()
    }
}


export {
    addUser,
    fetchUser,
    updateUser,
    deleteUser
}
