import Types from './actionTypes';

import {searchAlgolia, defaultSearchParams} from '@api/algoliaAPI';

export const setProperies = properties =>
  ({ type: Types.SET_ALGOLIA_PROPERTIES, properties });
export const setCommmunites = communites =>
  ({ type: Types.SET_ALGOLIA_COMMUNITES, communites });
export const setSearchParams = searchParams =>
  ({ type: Types.SET_ALGOLIA_SEARCHPARAMS, searchParams });
  
