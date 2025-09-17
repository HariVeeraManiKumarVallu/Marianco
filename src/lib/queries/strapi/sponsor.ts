const API_BASE =
  process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_APP_URL !== ''
    ? process.env.NEXT_PUBLIC_API_URL
    : 'http://localhost:1337';

export async function getSponsors() {
  try {
    const url = new URL("/sponsors?populate=*", API_BASE);
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching sponsors:", error);
    throw error;
  }
}
