import {
  PROVIDERS_REQUEST,
  PROVIDERS_SUCCESS,
  PROVIDERS_FAILURE,
  PROVIDER_DETAILS_REQUEST,
  PROVIDER_DETAILS_SUCCESS,
  PROVIDER_DETAILS_FAILURE,
} from '../constants/providerConstant';

// Request reducer for all providers
export const providersReducer = (state = { providers: [] }, action) => {
  switch (action.type) {
    case PROVIDERS_REQUEST:
      return { loading: true, providers: [] };
    case PROVIDERS_SUCCESS:
      return {
        loading: false,
        providers: action.payload.providers,
        allProviders: action.payload.allProviders,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case PROVIDERS_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Request reducer for a signle provider
export const providerDetailsReducer = (state = { provider: {} }, action) => {
  switch (action.type) {
    case PROVIDER_DETAILS_REQUEST:
      return { loading: true, ...state };
    case PROVIDER_DETAILS_SUCCESS:
      return { loading: false, provider: action.payload };
    case PROVIDER_DETAILS_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
