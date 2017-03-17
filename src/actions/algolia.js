import Types from './actionTypes';

export const setMainParams = mainParams =>
  ({ type: Types.SET_ALGOLIA_MAIN_PARAMS, mainParams });

export const setMainProperies = mainProperties =>
  ({ type: Types.SET_ALGOLIA_MAIN_PROPERTIES, mainProperties });

export const setSelectedProperty = selectedProperty =>
  ({ type: Types.SET_ALGOLIA_SELECTEDPROPERTY, selectedProperty });

export const setSearchParams = searchParams =>
  ({ type: Types.SET_ALGOLIA_SEARCH_PARAMS, searchParams });

export const setSearchCommunities = searchCommunities =>
  ({ type: Types.SET_ALGOLIA_SEARCH_COMMUNITIES, searchCommunities });
export const setSearchProperties = searchProperties =>
  ({ type: Types.SET_ALGOLIA_SEARCH_PROPERTIES, searchProperties });
export const setSearchCities = searchCities =>
  ({ type: Types.SET_ALGOLIA_SEARCH_CITIES, searchCities });
export const setSearchSchools = searchSchools =>
  ({ type: Types.SET_ALGOLIA_SEARCH_SCHOOLS, searchSchools });

  
