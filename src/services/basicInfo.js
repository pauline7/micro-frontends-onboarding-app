/**
 * Topcoder Service
 */
import { axiosInstance as axios } from "./requestInterceptor";
import config from "../../config";
import { extractTraitsFromV3, wrapV3 } from "utils/";

const TRAIT_BASIC_INFO = "basic_info";
const CATEGORY_NAME = "Basic Info";

/**
 * Loads my basic info (To get interests)
 */
export async function getMyBasicInfo(myusername) {
  try {
    const response = await axios.get(
      `${config.API.V5}/members/${myusername}/traits?traitIds=basic_info`
    );

    return { data: response.data };
  } catch (err) {
    return { data: [] };
  }
}

/**
 * Add my interests
 */
export function addMyPrimaryInterests(
  myusername,
  previousBasicInfo,
  interestsFlat
) {
  return axios.post(`${config.API.V5}/members/${myusername}/traits`, [
    {
      traitId: TRAIT_BASIC_INFO,
      categoryName: CATEGORY_NAME,
      traits: {
        data: [
          {
            ...previousBasicInfo,
            primaryInterestInTopcoder: interestsFlat,
          },
        ],
      },
    },
  ]);
}

/**
 * Update my interests
 */
export function updateMyPrimaryInterests(
  myusername,
  prevBasicInfo,
  interestsFlat
) {
  return axios.put(`${config.API.V5}/members/${myusername}/traits`, [
    {
      traitId: TRAIT_BASIC_INFO,
      categoryName: CATEGORY_NAME,
      traits: {
        data: [
          {
            ...prevBasicInfo,
            primaryInterestInTopcoder: interestsFlat,
          },
        ],
      },
    },
  ]);
}

/**
 * Add my address, if the basicInfo not exists
 */
export function addMyAddress(myusername, address, country) {
  return axios.post(`${config.API.V5}/members/${myusername}/traits`, [
    {
      traitId: TRAIT_BASIC_INFO,
      categoryName: CATEGORY_NAME,
      traits: {
        data: [
          {
            ...country,
            addresses: [address],
          },
        ],
      },
    },
  ]);
}

/**
 * Update my address
 */
export function updateMyAddress(myusername, prevBasicInfo, address, country) {
  return axios.put(`${config.API.V5}/members/${myusername}/traits`, [
    {
      traitId: TRAIT_BASIC_INFO,
      categoryName: CATEGORY_NAME,
      traits: {
        data: [
          {
            ...prevBasicInfo,
            ...country,
            addresses: [address],
          },
        ],
      },
    },
  ]);
}

/**
 * Add my title and bio, if the basicInfo not exists
 */
export function addMyTitleAndBio(myusername, data) {
  return axios.post(`${config.API.V5}/members/${myusername}/traits`, [
    {
      traitId: TRAIT_BASIC_INFO,
      categoryName: CATEGORY_NAME,
      traits: {
        data: [data],
      },
    },
  ]);
}

/**
 * Update my title and bio
 */
export function updateMyTitleAndBio(myusername, prevBasicInfo, data) {
  return axios.put(`${config.API.V5}/members/${myusername}/traits`, [
    {
      traitId: TRAIT_BASIC_INFO,
      categoryName: CATEGORY_NAME,
      traits: {
        data: [
          {
            ...prevBasicInfo,
            ...data,
          },
        ],
      },
    },
  ]);
}
