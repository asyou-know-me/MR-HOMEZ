import apiClient
  from "../../shared/api/apiClient";


export const loginAdmin = async (
  credentials
) => {

  const response =
    await apiClient.post(
      "/admin/login",
      credentials
    );


  return response.data;
};