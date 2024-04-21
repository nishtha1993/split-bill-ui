import http from "./httpService";

const baseUrl = 'http://split-ms-env.eba-2ps6wmpc.us-east-1.elasticbeanstalk.com'
const apiEndpoint = baseUrl + "/ml";

const textractEndpoint = "/parseFromTextract";

export async function parseReceiptFromTextract(receiptPath: string) {
  const data = {"path": receiptPath}

  const result = await http.post(`${apiEndpoint}${textractEndpoint}`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return result;
}
