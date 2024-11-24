"use client";
import { diversityScore, fetchTopArtists } from "@/app/lib/fetchData";
import { TopArtists, DiversityScore } from "@/app/lib/types";
import React from "react";


export function Diversity() {
    const [score, setScore] = React.useState<DiversityScore | undefined>(undefined);
    const getDiversity = async () => {
        const artists = await fetchTopArtists();
        if(artists) {  
            const sc = await diversityScore(artists);
            setScore(sc); 
        }
    }
    React.useEffect(() => {
        getDiversity();
    }, []);

    return (
        <div className="border-2 p-4 border-green-400 shadow-md flex flex-col gap-4">
            {score?.diversityScore ? (
                <div className="text-center">
                    <h1>Your artist diversity score is</h1>
                    <h1 className="text-3xl font-bold">{score?.diversityScore ? score.diversityScore.toFixed(1) : 'Loading...'}</h1>
                    <p>
                        {`You explore ${score.genreScore} different genres and your average artist popularity is ${score.popularityScore.toFixed(1)}.
            This indicates a mix of mainstream and niche music preferences. Keep exploring to further diversify your music taste!`}
                    </p>
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
            
        </div>
    );
        
}