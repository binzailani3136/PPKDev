const algoliasearch = require('algoliasearch/reactnative')('9BI25RD63R', '4edbe1e1d37bca98c5efdfae09ebba5f');
const properties = algoliasearch.initIndex('properties');
const schools = algoliasearch.initIndex('schools');
const cities = algoliasearch.initIndex('cities');
const communities = algoliasearch.initIndex('communities');

export function searchAlgolia(searchParams, justReloaded, desktop_view, callBack) {
//        changeTitle();
    notSearched = !1;
//        $rootScope.search_space.selectedProperty = void 0;

      // var searchParams = $rootScope.searchParams;

    if (justReloaded != true) { (searchParams.page = 1); }
    justReloaded = !1;

    let numericfilters = [],
      filters = [],
      facetFilters = [];

    if (searchParams.beds) {
      numericfilters.push(`beds>=${searchParams.beds}`);
    }

    if (searchParams.garages) {
      numericfilters.push(`garages>=${searchParams.garages}`);
    }

    if (searchParams.baths_full) {
      numericfilters.push(`baths_full>=${searchParams.baths_full}`);
    }

    const algInp = [];
    if (searchParams.community && searchParams.community != 'Any') {
      algInp.push(searchParams.community);
      facetFilters.push(`community:${searchParams.community}`);
    }

    if (searchParams.city) {
      algInp.push(searchParams.city);
      facetFilters.push(`city:${searchParams.city}`);
    }

    if (searchParams.school && searchParams.school_type) {
          // $rootScope.algoliaInput.value = searchParams.school;
      filters.push(`${searchParams.school_type}:"${searchParams.school}"`);
    }

    if ((!searchParams.city && !searchParams.community) != true) {
      if (searchParams.school != true) {
              // $rootScope.algoliaInput.value = algInp.join(", ");

      }
    }

    if (searchParams.type && searchParams.type.length) {
      facetFilters.push(searchParams.type.map(type => `type:${type}`));
    }

    const isEmptyObj = function (obj) {
      for (const prop in obj) { if (obj.hasOwnProperty(prop)) return !1; }
      return !0;
    };

    const fromToFilter = function (obj, name) {
      if (isEmptyObj(obj) != true) {
        if (obj.from && obj.to) {
          numericfilters.push(`${name}>=${obj.from},${name}<=${obj.to}`);
        } else if (obj.from && !obj.to) {
          numericfilters.push(`${name}>=${obj.from}`);
        } else if (!obj.from && obj.to) {
          numericfilters.push(`${name}<=${obj.to}`);
        }
      }
    };

    fromToFilter(searchParams.price, 'price');
    fromToFilter(searchParams.acres, 'acres');
    fromToFilter(searchParams.sqft, 'sqft');
    if (searchParams.for) {
      searchParams.for == 'both' ?
              facetFilters.push(['for:sale', 'for:rent']) :
              facetFilters.push(`for:${searchParams.for}`);
    }

    if (searchParams.schools && searchParams.schools.length) {
      const sO = [];
      searchParams.schools.each((school_elem) => {
        sO.push([`school_elem:"${school_elem}"`]);
        sO.push([`school_high:"${school_elem}"`]);
        sO.push([`school_middle:"${school_elem}"`]);
      });
      filters.push(sO.join(' OR '));
    }

    if (searchParams.ages) {
      if (searchParams.ages == 'New') { numericfilters.push(`year_built>=${(new Date()).getFullYear()}`); } else {
        const ages = searchParams.ages.split('-');
        if (ages.length == 2) {
          numericfilters.push(`year_built>=${parseInt(ages[0])},year_built<=${parseInt(ages[1])}`);
        } else {
          ages.length == 1 && numericfilters.push(`year_built<=${parseInt(ages[0])}`);
        }
      }
    }

    filters = filters.length > 1 ?
                  `(${filters.join(') AND (')})` :
                  filters.join(') AND (');

    const tS = {
      numericFilters: numericfilters.join(','),
      filters,
      facetFilters,
    };

    if (searchParams.insidePolygon) {
      tS.insidePolygon = searchParams.insidePolygon;
    } else if (searchParams.insideBoundingBox) {
      tS.insideBoundingBox = searchParams.insideBoundingBox;
    } else if (searchParams.location && searchParams.location.longitude && searchParams.location.latitude) {
      tS.aroundLatLng = `${searchParams.location.latitude},${searchParams.location.longitude}`;
    }

      // $rootScope.loading = !0;
      // tS.hitsPerPage = $rootScope.desktop_view ? 200 : 100;
    tS.hitsPerPage = desktop_view ? 200 : 100;

      // if( viewProp != true ) {
      //     history.pushState("", "", window.location.pathname + "?" + tjq.param(searchParams));
      // }

//      $rootScope.searchedCommunity = "";
    if (searchParams.community && searchParams.city) {
//           $http.get("/community/search/details/?community=" + searchParams.community + "&city=" + searchParams.city)
//               .success(function(community) {

// //                $rootScope.searchedCommunity = community
//                   console.log(community);
//               });
    }

    let respArr = [],
      totalFound = 0,
      readyFn = searchParams.communities ? 0 : 1;

    if (searchParams.communities) {
      communities.search(tS, (err, content) => {
        if (err != true) {
          totalFound += content.nbHits || 0;

          respArr = respArr.concat(content.hits.map((hit) => {
            hit.isCommunity = !0;
            return hit;
          }));
          readyFn += 1;
          if (readyFn == 2) { callBack(respArr, totalFound); }
        }
      });
    }

console.log(tS);
    properties.search(tS, (err, content) => {
      if (err != true) {
        totalFound += content.nbHits || 0;

        readyFn += 1;
        respArr = respArr.concat(content.hits);
        if (readyFn == 2) { callBack(respArr, totalFound); }
      }
    });

    return tS;  
}


export var types = {
  Both: ['Condo', 'Single Family'],
  Condo: 'Condo',
  'Single Family': 'Single Family',
  Land: 'Land',
};

export var sqfts = [700, 1e3, 1200, 1500, 1800, 2e3, 2200, 2400, 3e3, 4e3, 5e3, 6e3, 1e4, 2e4];

export var maxPrices = [{
  value: 15e4,
  title: '$150,000',
}, {
  value: 2e5,
  title: '$200,000',
}, {
  value: 25e4,
  title: '$250,000',
}, {
  value: 3e5,
  title: '$300,000',
}, {
  value: 35e4,
  title: '$350,000',
}, {
  value: 4e5,
  title: '$400,000',
}, {
  value: 45e4,
  title: '$450,000',
}, {
  value: 5e5,
  title: '$500,000',
}, {
  value: 6e5,
  title: '$600,000',
}, {
  value: 75e4,
  title: '$750,000',
}, {
  value: 85e4,
  title: '$850,000',
}, {
  value: 1e6,
  title: '$1,000,000',
}, {
  value: 15e5,
  title: '$1,500,000',
}, {
  value: 2e6,
  title: '$2,000,000',
}, {
  value: 999999999,
  title: 'Any',
}];

export var minPrices = [{
  value: 1e5,
  title: '$100,000',
}, {
  value: 15e4,
  title: '$150,000',
}, {
  value: 2e5,
  title: '$200,000',
}, {
  value: 3e5,
  title: '$300,000',
}, {
  value: 4e5,
  title: '$400,000',
}, {
  value: 5e5,
  title: '$500,000',
}, {
  value: 75e4,
  title: '$750,000',
}, {
  value: 1e6,
  title: '$1,000,000',
}, {
  value: 2e6,
  title: '$2,000,000',
}];

export var acres = [{
  value: 0.2,
  title: '.2',
}, {
  value: 0.5,
  title: '.5',
}, {
  value: 0.75,
  title: '.75',
}, {
  value: 1,
  title: '1',
}, {
  value: 2,
  title: '2',
}, {
  value: 3,
  title: '3',
}, {
  value: 4,
  title: '4',
}, {
  value: 5,
  title: '5',
}, {
  value: 10,
  title: '10',
}, {
  value: 20,
  title: '20',
}, {
  value: 50,
  title: '50',
}, {
  value: 99999999,
  title: '100+',
}];

export var defaultSearchParams = {
  baths_full: 1,
  beds: 1,
  sort: 'desc(date.listed)',
  features: [],
  type: 'Both',
  school_elems: [],
  school_middles: [],
  school_highs: [],
  regions: [],
  community: 'Any',
  for: 'sale',
  page: 1,
  price: {
    from: '1000',
    to: '5000000',
  },
};

export var searchParams = {
  baths_full: 1,
  beds: 1,
  sort: 'desc(date.listed)',
  features: [],
  type: 'Both',
  school_elems: [],
  school_middles: [],
  school_highs: [],
  regions: [],
  community: 'Any',
  for: 'sale',
  page: 1,
  price: {
    from: '1000',
    to: '5000000',
  },
};

export var dict = {
  en: {
    Any: 'Any',
  },
  bz: {
    Any: 'Qualquer',
  },
};

export var translate = function(text) {
    return dict[window.currentLocale][text] || text
};
export var isEmptyObj = function(obj) {
    for (var prop in obj)
        if (obj.hasOwnProperty(prop)) return !1;
    return !0
};
export var toNumber = function(num) {
    return num && parseFloat(num) ? parseFloat(num).toFixed(2) : num
};
export var numberComma = function(num) {
    return num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : void 0
};
export var short_price = function(price) {
    return isInt(price) ? price : parseFloat(price.toFixed(2))
};
export var priceShort = function(price) {
    return price ? 2e4 > price ? "$" + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : price >= 1e6 ? "$" + short_price(price / 1e6) + "M" : "$" + Math.round(price / 1e3) + "k" : void 0
};
export function isInt(n) {
    return Number(n) === n && n % 1 === 0
};


