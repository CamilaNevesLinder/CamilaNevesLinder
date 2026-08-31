declare namespace NodeJS {
  interface ProcessEnv {
    SPOTIFY_CLIENT_ID: string;
    SPOTIFY_CLIENT_SECRET: string;
    SPOTIFY_REFRESH_TOKEN: string;
    SPOTIFY_FAVORITE_SONGS_LIMIT: string;

    YOUTUBE_API_KEY?: string;
    GOOGLE_API_KEY?: string;

    SMTP_HOST?: string;
    SMTP_PORT?: string;
    SMTP_USER?: string;
    SMTP_PASSWORD?: string;
    SMTP_FROM?: string;
    CONTACT_TO_EMAIL?: string;

    NEXT_PUBLIC_SITE_URL?: string;
  }
}
