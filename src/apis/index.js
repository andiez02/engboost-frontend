import { API_ROOT } from "../utils/constants";
import { toast } from "react-toastify";
import authorizedAxiosInstance from "../utils/authorizeAxios";

//User
export const registerUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(
    `${API_ROOT}/users/register`,
    data
  );
  toast.success(
    "Account created successfully! Please check and verify your account before logging in!",
    { theme: "colored" }
  );
  return response.data;
};

export const verifyUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(
    `${API_ROOT}/users/verify`,
    data
  );
  toast.success(
    "Account verified successfully! Now you can enjoy our service!",
    { theme: "colored" }
  );

  return response.data;
};

export const refreshTokenAPI = async () => {
  const response = await authorizedAxiosInstance.get(
    `${API_ROOT}/users/verify`
  );
  return response.data;
};

export const snaplangDetectAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(
    `${API_ROOT}/snaplang/detect`,
    data
  );
  return response.data;
};
