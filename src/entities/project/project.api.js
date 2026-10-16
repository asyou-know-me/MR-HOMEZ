import apiClient
  from "../../shared/api/apiClient";


export const getProjects =
  async (filters = {}) => {

    const response =
      await apiClient.get(
        "/projects",
        {
          params: filters,
        }
      );

    return response.data;
  };


export const getNewLaunches =
  async () => {

    const response =
      await apiClient.get(
        "/projects",
        {
          params: {
            launchStatus:
              "new_launch",
            status:
              "active",
          },
        }
      );

    return response.data;
  };


export const getProjectById =
  async (id) => {

    const response =
      await apiClient.get(
        `/projects/${id}`
      );

    return response.data;
  };


export const createProject =
  async (data) => {

    const response =
      await apiClient.post(
        "/projects",
        data
      );

    return response.data;
  };


export const updateProject =
  async (
    id,
    data
  ) => {

    const response =
      await apiClient.put(
        `/projects/${id}`,
        data
      );

    return response.data;
  };


export const deleteProject =
  async (id) => {

    const response =
      await apiClient.delete(
        `/projects/${id}`
      );

    return response.data;
  };


export const getProjectImages =
  async (id) => {

    const response =
      await apiClient.get(
        `/projects/${id}/images`
      );

    return response.data;
  };


export const uploadProjectImages =
  async (
    projectId,
    files
  ) => {

    const formData =
      new FormData();


    files.forEach(
      (file) => {

        formData.append(
          "images",
          file
        );

      }
    );


    const response =
      await apiClient.post(
        `/projects/${projectId}/images`,
        formData
      );


    return response.data;
  };


export const deleteProjectImage =
  async (
    projectId,
    imageId
  ) => {

    const response =
      await apiClient.delete(
        `/projects/${projectId}/images/${imageId}`
      );

    return response.data;
  };