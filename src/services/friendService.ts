import http from "./httpService";

const baseUrl = 'http://split-ms-env.eba-2ps6wmpc.us-east-1.elasticbeanstalk.com'
const apiEndpoint = baseUrl + "/friend";


const getMyFriendsEndpoint = "/getMyFriends";
const getMyFriendsHistoryEndpoint = "/getMyFriendsHistory";
const settleEndpoint = "/settle";
const nudgeEndpoint = "/nudge";

export async function getMyFriends(emailId: string) {
    const result = await http.get(`${apiEndpoint}${getMyFriendsEndpoint}/${emailId}`);
    return result.data;
  }

export async function getMyFriendsHistory(emailId: string) {
    const result = await http.get(`${apiEndpoint}${getMyFriendsHistoryEndpoint}/${emailId}`);
    return result.data;
}

export async function settle(emailId: string) {
    const result = await http.get(`${apiEndpoint}${settleEndpoint}/${emailId}`);
    return result.data;
}

export async function nudge(emailId: string) {
    const result = await http.get(`${apiEndpoint}${nudgeEndpoint}/${emailId}`);
    return result.data;
}