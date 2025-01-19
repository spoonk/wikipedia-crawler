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
  continue?: {
    plcontinue: string;
    continue: string;
  };
}

export async function getOutgoingPageTitles(title: string): Promise<string[]> {
  let nextPage: null | string = null;
  const links = [];
  do {
    const { data } = await axios.get<getResponse>(BASE_URL, {
      params: {
        action: "query",
        format: "json",
        prop: "links",
        titles: title,
        pllimit: "max",
        plcontinue: nextPage,
      },
    });

    if (data.continue?.plcontinue) {
      nextPage = data.continue.plcontinue;
    } else {
      nextPage = null;
    }

    if (!data?.query?.pages) {
      return links;
    }

    links.push(
      ..._.map(Object.values(data.query.pages)[0].links, ({ title }) => title),
    );
  } while (nextPage);
  return links;
}

getOutgoingPageTitles("Albert Einstein");
