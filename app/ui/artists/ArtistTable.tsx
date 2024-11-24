"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableCaption,
    TableHeader
} from "@/components/ui/table";
import { TopArtists } from "@/app/lib/types";
import Image from "next/image";


export function ArtistTable({ artists }: { artists: TopArtists[] }) {
    return (
        <div className="border-2 p-4 border-green-400 shadow-md">
            <Table>
                <TableCaption>Top Artists</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Profile</TableHead>
                        <TableHead>Artist</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {artists ? (
                        artists.items.map((artist, index) => (
                            <TableRow key={index}>
                                <TableCell><Image className="rounded-full" height={40} src={artist.images[0].url} width={40} alt={artist.name}></Image></TableCell>
                                <TableCell>{artist.name}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <p>Not Enough Data... Use Spotify more....</p>
                    )}
                </TableBody>
            </Table>
        </div>
        
    );
    
}