import { authService } from "services";
import http from "./httpService";

const baseUrl = 'http://split-ms-env.eba-2ps6wmpc.us-east-1.elasticbeanstalk.com'
const apiEndpoint = baseUrl + "/user";

const signInEndpoint = "/signin";
const getUserEndpoint = "/get_user";

export async function registerUser(emailId: string, name: string) {
  const result = await http.post(`${apiEndpoint}${signInEndpoint}`, {
    params: {
      emailId: JSON.stringify(emailId),
      name: JSON.stringify(name)
    },
  });
  return result;
}

export async function fetchUserById(emailId: string) {
  const result = await http.get(`${apiEndpoint}${getUserEndpoint}/${emailId}`);
  return result.data;
}

export async function fetchCurrentUserEmailId() {
  try {
    // Assuming authService provides a method to get the current user's email ID
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      return currentUser;
    } else {
      throw new Error("User email ID not found.");
    }
  } catch (error) {
    throw new Error("Failed to fetch current user's email ID.");
  }
}