export type Profile = {
    display_name: string;
    email: string;
    country: string;
    external_urls: {
        spotify: string;
    };
    followers: {
        href: string;
        total: number;
    };
    href: string;
    id: string;
    images: {
        height: number | null;
        url: string;
        width: number | null;
    }[];
    product: string;
    type: string;
    uri: string;
}

export type Track = {
    album: {
        album_type: string;
        artists: Artist[];
        available_markets: string[];
        external_urls: {
            spotify: string;
        };
        href: string;
        id: string;
        images: {
            height: number | null;
            url: string;
            width: number | null;
        }[];
        name: string;
        release_date: string;
        release_date_precision: string;
        total_tracks: number;
        type: string;
        uri: string;
        restrictions: {
            reason: string;
        };
    };
    artists: Artist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
        isrc: string;
    };
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    is_playable: boolean;
    linked_from: {
        external_urls: {
            spotify: string;
        };
        href: string;
        id: string;
        type: string;
        uri: string;
    };
    restrictions: {
        reason: string;
    };
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
}

export type TopTracks = {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: Track[];
}

export type recentTracks = {
    href: string;
    limit: number;
    next: string;
    cursors: {
        after: string;
        before: string;
    };
    total: number;
    items: PlayHistory[];
}

export type PlayHistory = {
    track: Track;
    played_at: string;
    context: {
        external_urls: {
            spotify: string;
        };
        href: string;
        type: string;
        uri: string;
    };
}

export type TrackData = {
    "short_term": TopTracks;
    "medium_term": TopTracks;
    "long_term": TopTracks;
}

export type TopArtists = {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: Artist[];
}

export type Artist = {
    external_urls: {
        spotify: string;
    };
    followers: {
        href: string;
        total: number;
    };
    genres: string[];
    href: string;
    id: string;
    images: {
        height: number | null;
        url: string;
        width: number | null;
    }[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

export type ObscureGenres = {
    mainstream: number;
    niche: number;
}

export type Genre = {
    genre: string
}

export type Emotion = {
    labels: string[];
    data: Object;
    label: string;
}

export type DiversityScore = {
    diversityScore: number;
    genreScore: number;
    popularityScore: number;
}

export type discoveryVsLoaylty = {
    artist: Artist;
    discovery: number;
    loyalty: number;
}

export type Playlist = {
    message: string;
    playlists: {
        href: string;
        items: PlaylistItem[];
        limit: number;
        next: string;
        offset: number;
        previous: string;
        total: number;
    };
}

export type PlaylistItem = {
    collaborative: boolean;
    description: string;
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: {
        height: number | null;
        url: string;
        width: number | null;
    }[];
    name: string;
    owner: {
        display_name: string;
        external_urls: {
            spotify: string;
        };
        href: string;
        id: string;
        type: string;
        uri: string;
    };
    public: boolean;
    snapshot_id: string;
    tracks: {
        href: string;
        total: number;
    };
    type: string;
    uri: string;
}


export type AudioFeatures = {
    danceability: number;
    energy: number;
    key: number;
    loudness: number;
    mode: number;
    speechiness: number;
    acousticness: number;
    instrumentalness: number;
    liveness: number;
    valence: number;
    tempo: number;
    type: string;
    id: string;
    uri: string;
    track_href: string;
    analysis_url: string;
    duration_ms: number;
    time_signature: number;
}

export type User = {
    id: string;
    name: string;
    spotify_id: string;
    access_token: string;
    refresh_token: string;
}

export type InsertUser = {
    name: string;
    spotify_id: string;
    access_token: string;
    refresh_token: string;
}

export type JWT = {
    id: string;
    name: string;
    iat: number;
    exp: number;
}
