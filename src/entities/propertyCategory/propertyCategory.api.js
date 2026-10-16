import apiClient
  from "../../shared/api/apiClient";


/* =========================================================
   GET ALL CATEGORIES
========================================================= */

export const getPropertyCategories =
  async (filters = {}) => {

    const response =
      await apiClient.get(
        "/property-categories",
        {
          params: filters,
        }
      );

    return response.data;
  };


/* =========================================================
   GET CATEGORY BY ID
========================================================= */

export const getPropertyCategoryById =
  async (id) => {

    const response =
      await apiClient.get(
        `/property-categories/${id}`
      );

    return response.data;
  };


/* =========================================================
   CREATE CATEGORY
========================================================= */

export const createPropertyCategory =
  async (data) => {

    const response =
      await apiClient.post(
        "/property-categories",
        data
      );

    return response.data;
  };


/* =========================================================
   UPDATE CATEGORY
========================================================= */

export const updatePropertyCategory =
  async (
    id,
    data
  ) => {

    const response =
      await apiClient.put(
        `/property-categories/${id}`,
        data
      );

    return response.data;
  };


/* =========================================================
   DELETE CATEGORY
========================================================= */

export const deletePropertyCategory =
  async (id) => {

    const response =
      await apiClient.delete(
        `/property-categories/${id}`
      );

    return response.data;
  };


/* =========================================================
   UPLOAD / REPLACE CATEGORY IMAGE
========================================================= */

export const uploadPropertyCategoryImage =
  async (
    id,
    file
  ) => {

    const formData =
      new FormData();


    formData.append(
      "image",
      file
    );


    const response =
      await apiClient.post(
        `/property-categories/${id}/image`,
        formData
      );


    return response.data;
  };