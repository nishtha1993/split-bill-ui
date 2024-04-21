import http from "./httpService";

const baseUrl = 'http://split-ms-env.eba-2ps6wmpc.us-east-1.elasticbeanstalk.com'
const apiEndpoint = baseUrl + "/group";

const getMyGroupsEndpoint = "/getMyGroups";
const createGroupsEndpoint = "/createGroup";
const joinGroupEndpoint = "/joinGroup";
const getGroupStatsEndpoint = "/getGroupStats";
const getGroupExpensesEndpoint = "/getGroupExpenses";


export async function getGroupStats(groupId: string) {
  const result = await http.get(`${apiEndpoint}${getGroupStatsEndpoint}/${groupId}`);
  return result.data;
}

export async function getGroupExpenses(groupId: string) {
  const result = await http.get(`${apiEndpoint}${getGroupExpensesEndpoint}/${groupId}`);
  return result.data;
}

export async function addGroup(group: any) {
  const result = await http.post(`${apiEndpoint}${createGroupsEndpoint}`, group);
  return result.data;
}

export async function getMyGroups(emailId: string) {
  const result = await http.get(`${apiEndpoint}${getMyGroupsEndpoint}/${emailId}`);
  return result.data;
}

export async function getGroupByMemberId(memberId: string) {
  const result = await http.get(`${apiEndpoint}/member/${memberId}`);
  return result.data;
}

export async function getGroupById(groupId?: string) {
  const result = await http.get(`${apiEndpoint}/${groupId}`);
  return result.data;
}

export async function removeMember(groupId: string, memberId: string) {
  const result = await http.delete(
    `${apiEndpoint}/${groupId}/member/${memberId}`
  );
  return result.data;
}

export async function addMember(groupId: string, memberId: string) {
  const result = await http.post(
    `${apiEndpoint}${joinGroupEndpoint}`, {
      emailId: memberId,
      group_id: groupId
    }
  );
  return result.data;
}

export async function deleteMember(groupId: string) { 
  const result = await http.delete(
    `${apiEndpoint}/${groupId}`
  );
  return result;
}
