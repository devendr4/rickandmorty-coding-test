import { baseClient } from ".";
import { EpisodeInfo } from "../types";

export const getEpisodes = async ({
  page,
  filter,
}: {
  page: number;
  filter?: {
    name?: string;
    episode?: string;
  };
}): Promise<EpisodeInfo> => {
  console.log(filter);
  const query = `{
			episodes(page: ${page || 0},
					   filter:{
						   name:"${filter?.name || ""}",
						   episode:"${filter?.episode || ""}",
			}){
				info{
					count
					pages
					next
					prev
				}
				results {
					id
					name
					air_date
					episode
				}
			}
		}`;

  const response = (await baseClient(query))?.episodes;
  return {
    info: response?.info,
    episodes: response?.results,
  };
};
