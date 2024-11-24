import { AudioFeatures } from "./types";

export function mapToEmotion(audioFeatures : AudioFeatures) {
    const valence = audioFeatures.valence;
    const energy = audioFeatures.energy;
    const danceability = audioFeatures.danceability;
    const tempo = audioFeatures.tempo;
    const acousticness = audioFeatures.acousticness;
    const instrumentalness = audioFeatures.instrumentalness;
    let emotions : string[] = [];
    if (acousticness > 0.5) {
        emotions.push('acoustic');
    } 
    if (instrumentalness > 0.5) {
        emotions.push('instrumental');
    } 
    if (valence > 0.5 && energy > 0.5) {
        emotions.push('happy');
    }
    if (valence < 0.5 && energy < 0.5) {
        emotions.push('sad');
    } 
    if (energy > 0.8 && tempo > 120) {
        emotions.push('party');
    } 
    if (danceability > 0.8 && energy > 0.5) {
        emotions.push('dance');
    }
    if(emotions.length < 2) {
        emotions.push('neutral');
    }
    return emotions;
}

export function cleanSongTitle(title: string) {
  // Remove content in parentheses
  let cleanedTitle = title.replace(/\s*\(.*?\)/g, '');

  // Remove content after a dash (e.g., "- acoustic version")
  cleanedTitle = cleanedTitle.replace(/\s*-\s*.*$/g, '');

  // Remove content after "From" (e.g., "From the Album")
  cleanedTitle = cleanedTitle.replace(/\s*from\s+.*$/gi, '');

  // Trim and split the cleaned title into words
  let words = cleanedTitle.trim().split(' ');

  // If the title has more than 2 words, keep only the first two
  if (words.length > 3) {
    cleanedTitle = words.slice(0, 3).join(' ');
  }

  return cleanedTitle.trim();
}

