import { baseClient } from ".";
import { CharacterInfo } from "../types";

export const getCharacters = async ({
  page = 0,
  filter = { name: "", gender: "", status: "", species: "" },
}: {
  page: number;
  filter?: {
    name?: string;
    species?: string;
    status?: string;
    gender?: string;
  };
}): Promise<CharacterInfo> => {
  const query = `{
			characters(page: ${page},
					   filter:{
						   name:"${filter.name}",
						   species:"${filter.species}",
						   gender:"${filter.gender}",
						   status:"${filter.status}"
			}){
				info{
					count
					pages
					next
					prev
				}
				results {
					name
					species
					status
					gender
					type
					image
				}
			}
		}`;

  const response = (await baseClient(query))?.characters;
  return {
    info: response?.info,
    characters: response?.results,
  };
};
