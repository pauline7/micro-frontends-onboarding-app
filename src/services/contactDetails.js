/**
 * Topcoder Service
 */
import { axiosInstance as axios } from "./requestInterceptor";
import config from "../../config";
import { extractTraitsFromV3, wrapV3 } from "utils/";

const TRAIT_CONNECT_INFO = "connect_info";
const CATEGORY_NAME = "Connect User Information";
// const DEFAULT_REQUIRED_PARAMS_FOR_V3 = {
//   title: "",
//   companyName: "",
//   firstNLastName: "",
// };

/**
 * Get contact details
 */
export async function getContactDetails(myusername) {
  try {
    const response = await axios.get(
      `${config.API.V5}/members/${myusername}/traits` // TODO: add ?traitIds=connect_info,basic_info after upgrading to v5
    );
    return { data: response.data };
  } catch (err) {
    return { data: [] };
  }
}

/**
 * CreateContactDetails
 */
export function createContactDetails(myusername, contactDetails) {
  return axios.post(`${config.API.V5}/members/${myusername}/traits`, [
    {
      categoryName: CATEGORY_NAME,
      traitId: TRAIT_CONNECT_INFO,
      traits: {
        data: [{ /*...DEFAULT_REQUIRED_PARAMS_FOR_V3, */ ...contactDetails }],
      },
    },
  ]);
}

/**
 * updateContactDetails
 */
export function updateContactDetails(
  myusername,
  contactDetailsOnServer,
  contactDetails
) {
  return axios.put(`${config.API.V5}/members/${myusername}/traits`, [
    {
      categoryName: CATEGORY_NAME,
      traitId: TRAIT_CONNECT_INFO,
      traits: {
        data: [{ ...contactDetailsOnServer, ...contactDetails }],
      },
    },
  ]);
}
