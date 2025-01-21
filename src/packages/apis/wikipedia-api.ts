import axios from "axios";
import _ from "lodash";
import { timedFunction } from "../utils/timed-fn.js";
import { channels } from "../utils/channels.js";

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
  continue?: {
    plcontinue: string;
    continue: string;
  };
}

const getPageTitles = async (title: string, nextPageToken?: string | null) => {
  const { data } = await axios.get<getResponse>(BASE_URL, {
    params: {
      action: "query",
      format: "json",
      prop: "links",
      titles: title,
      pllimit: "max",
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
};

const timedGetPageTitles = timedFunction(getPageTitles, channels.apiTiming);

export async function getOutgoingPageTitles(title: string): Promise<string[]> {
  let token = null;
  const results = [];

  do {
    const { links, nextPageToken } = await timedGetPageTitles(title, token);

    token = nextPageToken;
    results.push(...links);
  } while (token);
  return results;
}

getOutgoingPageTitles("Albert Einstein");
