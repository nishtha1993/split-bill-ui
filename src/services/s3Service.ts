import http from "./httpService";

const baseUrl = 'http://split-ms-env.eba-2ps6wmpc.us-east-1.elasticbeanstalk.com'
const apiEndpoint = baseUrl + "/s3";

const putEndpoint = "/put/";

export async function putIntoS3(bucket: string, file: File | Blob) {
  const formData = new FormData();
  formData.append('file', file); // Append the file to the FormData

  const result = await http.post(`${apiEndpoint}${putEndpoint}/${bucket}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return result;
}

const s3Service = {
  putIntoS3
};

export default s3Service;