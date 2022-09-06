import {
  PROVIDERS_REQUEST,
  PROVIDERS_SUCCESS,
  PROVIDERS_FAILURE,
  PROVIDER_DETAILS_REQUEST,
  PROVIDER_DETAILS_SUCCESS,
  PROVIDER_DETAILS_FAILURE,
} from '../constants/providerConstant';
import axios from 'axios';

// Get all providers
export const listProviders =
  (keyword = '', pageNumber = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: PROVIDERS_REQUEST });
      const { data } = await axios.get(
        `/api/providers?keyword=${keyword}&pageNumber=${pageNumber}`
      );
      dispatch({ type: PROVIDERS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PROVIDERS_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// Get a provider
export const listProviderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PROVIDER_DETAILS_REQUEST });
    // console.log(`/api/providers/${id}`)
    const { data } = await axios.get(`/api/providers/${id}`);
    dispatch({ type: PROVIDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PROVIDER_DETAILS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
