import axios from "axios";
import _ from "lodash";

const BASE_URL = "https://en.wikipedia.org/w/api.php";

interface getResponse {
  query: {
    pages: {
      [key: string]: {
        pageid: number;
        ns: number;
        title: string;
        links: { ns: number; title: string }[];
      };
    };
  };
}

export async function getOutgoingPageTitles(title: string): Promise<string[]> {
  const { data } = await axios.get<getResponse>(BASE_URL, {
    params: {
      action: "query",
      format: "json",
      prop: "links",
      titles: title,
      pllimit: "max",
    },
  });

  if (!data?.query?.pages) {
    console.warn(`request failed for ${title}`, data);
    return [];
  }

  return _.map(Object.values(data.query.pages)[0].links, ({ title }) => title);
}
