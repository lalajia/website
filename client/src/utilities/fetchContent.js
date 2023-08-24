// contentApi.js

// Fetches content data from the API
export async function fetchContentData() {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/content`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching content:", error);
    return [];
  }
}
