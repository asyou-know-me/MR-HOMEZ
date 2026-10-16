import apiClient
  from "../../shared/api/apiClient";


/* =========================================================
   GET ALL PROPERTIES
========================================================= */

export const getProperties =
  async (filters = {}) => {

    const response =
      await apiClient.get(
        "/properties",
        {
          params: filters,
        }
      );

    return response.data;
  };


/* =========================================================
   GET FEATURED PROPERTIES
========================================================= */

export const getFeaturedProperties =
  async () => {

    const response =
      await apiClient.get(
        "/properties",
        {
          params: {
            featured: true,
          },
        }
      );

    return response.data;
  };


/* =========================================================
   GET PROPERTY BY ID
========================================================= */

export const getPropertyById =
  async (id) => {

    const response =
      await apiClient.get(
        `/properties/${id}`
      );

    return response.data;
  };


/* =========================================================
   CREATE PROPERTY
========================================================= */

export const createProperty =
  async (data) => {

    const response =
      await apiClient.post(
        "/properties",
        data
      );

    return response.data;
  };


/* =========================================================
   UPDATE PROPERTY
========================================================= */

export const updateProperty =
  async (
    id,
    data
  ) => {

    const response =
      await apiClient.put(
        `/properties/${id}`,
        data
      );

    return response.data;
  };


/* =========================================================
   DELETE PROPERTY
========================================================= */

export const deleteProperty =
  async (id) => {

    const response =
      await apiClient.delete(
        `/properties/${id}`
      );

    return response.data;
  };


/* =========================================================
   GET PROPERTY IMAGES
========================================================= */

export const getPropertyImages =
  async (id) => {

    const response =
      await apiClient.get(
        `/properties/${id}/images`
      );

    return response.data;
  };


/* =========================================================
   UPLOAD PROPERTY IMAGES
========================================================= */

export const uploadPropertyImages =
  async (
    propertyId,
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
        `/properties/${propertyId}/images`,
        formData
      );


    return response.data;
  };


/* =========================================================
   DELETE PROPERTY IMAGE
========================================================= */

export const deletePropertyImage =
  async (
    propertyId,
    imageId
  ) => {

    const response =
      await apiClient.delete(
        `/properties/${propertyId}/images/${imageId}`
      );

    return response.data;
  };