import Types from './actionTypes';

export const setProperies = properties =>
  ({ type: Types.SET_ALGOLIA_PROPERTIES, properties });
export const setCommunities = communities =>
  ({ type: Types.SET_ALGOLIA_COMMUNITIES, communities });
export const setSearchParams = searchParams =>
  ({ type: Types.SET_ALGOLIA_SEARCHPARAMS, searchParams });
export const setSelectedProperty = selectedProperty =>
  ({ type: Types.SET_ALGOLIA_SELECTEDPROPERTY, selectedProperty });
  
