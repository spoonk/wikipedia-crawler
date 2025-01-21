import axios from "axios";
import _ from "lodash";
import { timedFunction } from "../utils/timed-fn.js";
import { channels } from "../utils/channels.js";

const BASE_URL = "https://en.wikipedia.org/w/api.php";

const defaultGetLinksParams = {
  action: "query",
  format: "json",
  prop: "links",
  pllimit: "max",
};

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
  continue?: {
    plcontinue: string;
    continue: string;
  };
}

const getLinks = timedFunction(
  async (title: string, nextPageToken?: string | null) => {
    const { data } = await axios.get<getResponse>(BASE_URL, {
      params: {
        ...defaultGetLinksParams,
        titles: title,
        ...(nextPageToken ? { plcontinue: nextPageToken } : {}),
      },
    });

    if (data.continue?.plcontinue) {
      nextPageToken = data.continue.plcontinue;
    } else {
      nextPageToken = null;
    }

    if (!data?.query?.pages) {
      return {
        links: [],
        nextPageToken,
      };
    }

    return {
      links: _.map(
        Object.values(data.query.pages)[0].links,
        ({ title }) => title,
      ),
      nextPageToken,
    };
  },
  channels.apiTiming,
);

export async function getOutgoingPageTitles(title: string): Promise<string[]> {
  let token = null;
  const results = [];

  do {
    const { links, nextPageToken } = await getLinks(title, token);

    token = nextPageToken;
    results.push(...links);
  } while (token);
  return results;
}
