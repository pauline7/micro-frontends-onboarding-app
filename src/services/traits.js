/**
 * Topcoder Service
 */
import { axiosInstance as axios } from "./requestInterceptor";
import config from "../../config";
import { wrapV3 } from "utils/";

/**
 * Create New Traits
 */
export function createTraits(handle, data) {
  return axios.post(`${config.API.V5}/members/${handle}/traits`, data);
}

/**
 * Update existing traits
 */
export function updateTraits(handle, data) {
  return axios.put(`${config.API.V5}/members/${handle}/traits`, data);
}

export async function checkUserTrait(handle, traitId) {
  let isExists = false;
  let response = await axios.get(
    `${config.API.V5}/members/${handle}/traits?traitIds=${traitId}`
  );
  const dataResponse = response.data;

  isExists = !!dataResponse;

  return isExists;
}
