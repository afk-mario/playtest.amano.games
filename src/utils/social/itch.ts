export interface ItchGameKey {
  download_key: {
    id: number;
    created_at: string;
    downloads: number;
    key: string;
    game_id: number;
    owner?: {
      display_name: string;
      gamer: boolean;
      username: string;
      id: number;
      url: string;
      press_user: boolean;
      developer: boolean;
      cover_url: string;
    };
  };
}

export async function getKeyInfo(key: string) {
  const gameId = 2962024;
  const baseUrl = `https://itch.io/api/1/${process.env.ITCH_API_KEY!}`;
  const url = `${baseUrl}/game/${gameId}/download_keys?download_key=${key}`;
  const res = await fetch(url);
  const data = (await res.json()) as ItchGameKey;
  return data;
}
