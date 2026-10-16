import apiClient from "../../shared/api/apiClient";

export const createEnquiry = async (data) => {
  const response = await apiClient.post("/enquiries", data);

  return response.data;
};

export const getEnquiries = async () => {
  const response = await apiClient.get("/enquiries");

  return response.data;
};

export const updateEnquiryStatus = async (id, status) => {
  const response = await apiClient.put(`/enquiries/${id}/status`, {
    status,
  });

  return response.data;
};

export const deleteEnquiry = async (id) => {
  const response = await apiClient.delete(`/enquiries/${id}`);

  return response.data;
};
