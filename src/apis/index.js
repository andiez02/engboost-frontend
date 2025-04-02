import { API_ROOT } from '../utils/constants';
import { toast } from 'react-toastify';
import authorizedAxiosInstance from '../utils/authorizeAxios';

//User
export const registerUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(
    `${API_ROOT}/users/register`,
    data
  );
  toast.success(
    'Account created successfully! Please check and verify your account before logging in!',
    { theme: 'colored' }
  );
  return response.data;
};

export const verifyUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(
    `${API_ROOT}/users/verify`,
    data
  );
  toast.success(
    'Account verified successfully! Now you can enjoy our service!',
    { theme: 'colored' }
  );

  return response.data;
};

export const refreshTokenAPI = async () => {
  const response = await authorizedAxiosInstance.get(
    `${API_ROOT}/users/refresh_token`
  );
  return response.data;
};

//Snaplang
export const snaplangDetectAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(
    `${API_ROOT}/snaplang/detect`,
    data
  );
  return response.data;
};

//Folder
export const getFoldersAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/folders`);
  return response.data;
};

export const getPublicFoldersAPI = async () => {
  const response = await authorizedAxiosInstance.get(
    `${API_ROOT}/folders/public`
  );
  return response.data;
};

export const createFolderAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(
    `${API_ROOT}/folders`,
    data
  );
  toast.success('Folder created successfully!', { theme: 'colored' });
  return response.data;
};

export const getFolderByIdAPI = async (folderId) => {
  const response = await authorizedAxiosInstance.get(
    `${API_ROOT}/folders/${folderId}`
  );
  return response.data;
};

export const updateFolderAPI = async (folderId, data) => {
  const response = await authorizedAxiosInstance.put(
    `${API_ROOT}/folders/${folderId}`,
    data
  );
  return response.data;
};

export const deleteFolderAPI = async (folderId) => {
  const response = await authorizedAxiosInstance.delete(
    `${API_ROOT}/folders/${folderId}`
  );
  return response.data;
};

export const makeFolderPublicAPI = async (folderId) => {
  const response = await authorizedAxiosInstance.put(
    `${API_ROOT}/folders/${folderId}/make-public`
  );
  return response.data;
};

// Flashcard APIs
export const getFlashcardsByFolderAPI = async (folderId) => {
  const response = await authorizedAxiosInstance.get(
    `${API_ROOT}/folders/${folderId}/flashcards`
  );
  return response.data;
};

export const getFlashcardByIdAPI = async (flashcardId) => {
  const response = await authorizedAxiosInstance.get(
    `${API_ROOT}/flashcards/${flashcardId}`
  );
  return response.data;
};

export const deleteFlashcardAPI = async (flashcardId) => {
  const response = await authorizedAxiosInstance.delete(
    `${API_ROOT}/flashcards/${flashcardId}`
  );
  toast.success('Flashcard deleted successfully!', { theme: 'colored' });
  return response.data;
};

export const saveFlashcardsToFolderAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(
    `${API_ROOT}/flashcards/save-to-folder`,
    data
  );
  return response.data;
};
