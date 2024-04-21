import { authService } from "services";
import http from "./httpService";

const baseUrl = 'http://split-ms-env.eba-2ps6wmpc.us-east-1.elasticbeanstalk.com'
const apiEndpoint = baseUrl + "/search";

const searchExpenseEndpoint = "/search-expense/";
const searchGroupEndpoint = "/search-group/";


export async function searchExpense(query: string) {
  const result = await http.get(`${apiEndpoint}${searchExpenseEndpoint}/${query}`);
  return result.data;
}

export async function searchGroup(query: string) {
  const result = await http.get(`${apiEndpoint}${searchGroupEndpoint}/${query}`);
  return result.data;
}
