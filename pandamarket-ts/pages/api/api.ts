import { OrderBy } from "../../types/articleTypes";

const BASEURL = "https://panda-market-api.vercel.app";

export async function getArticle(
  orderBy: OrderBy,
  pageSize: number,
  keyword: string = ""
) {
  try {
    const response = await fetch(
      `${BASEURL}/articles?pageSize=${pageSize}&orderBy=${orderBy}&keyword=${keyword}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    throw error;
  }
}
