const algoliasearch = require('algoliasearch/reactnative')('9BI25RD63R', '4edbe1e1d37bca98c5efdfae09ebba5f');
const properties = algoliasearch.initIndex('properties');
const schools = algoliasearch.initIndex('schools');
const cities = algoliasearch.initIndex('cities');
const communities = algoliasearch.initIndex('communities');

export function searchPropertyWithAlgolia(params, callBack) {
  if(properties) {
    properties.search(params, (err, content) => {
      callBack(content.hits, err);
    });
  }
}

export function searchSchoolWithAlgolia(params, callBack) {
  if(schools) {
    schools.search(params, (err, content) => {
      callBack(content.hits, err);
    });
  }
}

export function searchCommunityWithAlgolia(params, callBack) {
  if(communities) {
    communities.search(params, (err, content) => {
      callBack(content.hits, err);
    });
  }
}

export function searchCityWithAlgolia(params, callBack) {
  if(cities) {
    cities.search(params, (err, content) => {
      callBack(content.hits, err);
    });
  }
}

export function searchAlgolia(searchParams, callBack) {

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
      // if (searchParams.school == null) {
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

    tS.hitsPerPage = searchParams.hitsPerPage;

// //      $rootScope.searchedCommunity = "";
//     if (searchParams.community && searchParams.city) {
// //           $http.get("/community/search/details/?community=" + searchParams.community + "&city=" + searchParams.city)
// //               .success(function(community) {

// // //                $rootScope.searchedCommunity = community
// //                   console.log(community);
// //               });
//     }

    let respArr = [];
    let totalFound = 0;
    let readyFn = searchParams.communities ? 0 : 1;

    // if (searchParams.communities) {
    //   communities.search(tS, (err, content) => {
    //     if (err == null) {
    //     // if (err != true) {
    //       totalFound += content.nbHits || 0;

    //       respArr = respArr.concat(content.hits.map((hit) => {
    //         hit.isCommunity = !0;
    //         return hit;
    //       }));

    //       readyFn += 1;
    //       if (readyFn == 2) { 
    //         callBack(respArr, totalFound); return tS; 
    //       }

    //     }
    //   });
    // }

    properties.search(tS, (err, content) => {
      // if (err != true) {
      if (err == null) {
        totalFound += content.nbHits || 0;

        readyFn += 1;
        respArr = respArr.concat(content.hits);
        if (readyFn == 2) { callBack(respArr, err); }
      }
    });
}

export var itemsOfPrice = [
        {caption:"Any", value:0},
        {caption:"$100,000", value:100000},
        {caption:"$150,000", value:150000},
        {caption:"$200,000", value:200000},
        {caption:"$250,000", value:250000},
        {caption:"$300,000", value:300000},
        {caption:"$350,000", value:350000},
        {caption:"$400,000", value:400000},
        {caption:"$450,000", value:450000},
        {caption:"$500,000", value:500000},
        {caption:"$550,000", value:550000},
        {caption:"$600,000", value:600000},
        {caption:"$650,000", value:650000},
        {caption:"$700,000", value:700000},
        {caption:"$750,000", value:750000},
        {caption:"$800,000", value:800000},
        {caption:"$850,000", value:850000},
        {caption:"$900,000", value:900000},
        {caption:"$950,000", value:950000},
        {caption:"$1,000,000", value:1000000},
        {caption:"$1,500,000", value:1500000},
        {caption:"$2,000,000", value:2000000},
      ];     

export var itemsOfRoom = [
        {caption:"1+", value:1},
        {caption:"2+", value:2},
        {caption:"3+", value:3},
        {caption:"4+", value:4},
        {caption:"5+", value:5},
        {caption:"6+", value:6},
      ];     
      
export var itemsOfSqFtFrom = [
        {caption:"Min", value:0},
        {caption:"700", value:700},
        {caption:"1,000", value:1000},
        {caption:"1,200", value:1000},
        {caption:"1,500", value:1000},
        {caption:"1,800", value:1000},
        {caption:"2,000", value:1000},
        {caption:"2,200", value:1000},
        {caption:"2,400", value:1000},
        {caption:"3,000", value:1000},
        {caption:"4,000", value:1000},
        {caption:"5,000", value:1000},
        {caption:"6,000", value:1000},
        {caption:"10,000", value:1000},
        {caption:"20,000", value:1000},
      ];     

export var itemsOfSqFtTo = [
        {caption:"Max", value:3000000},
        {caption:"700", value:700},
        {caption:"1,000", value:1000},
        {caption:"1,200", value:1000},
        {caption:"1,500", value:1000},
        {caption:"1,800", value:1000},
        {caption:"2,000", value:1000},
        {caption:"2,200", value:1000},
        {caption:"2,400", value:1000},
        {caption:"3,000", value:1000},
        {caption:"4,000", value:1000},
        {caption:"5,000", value:1000},
        {caption:"6,000", value:1000},
        {caption:"10,000", value:1000},
        {caption:"20,000", value:1000},
      ];    

export var types = {
  Both: ['Condo', 'Single Family'],
  Condo: 'Condo',
  'Single Family': 'Single Family',
  Land: 'Land',
};

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
  hitsPerPage : 20,
};

export var dict = {
  en: {
    Any: 'Any',
  },
  bz: {
    Any: 'Qualquer',
  },
};

export function isInt(n) {
    return Number(n) === n && n % 1 === 0
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
export var priceShort = function(price){
    if (!price) return
    price = parseInt(price);
    if (price < 20000) {
        return '$' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }else if (price >= 1000000){
        return '$' + short_price(price/1000000) + 'M'
    }else{
        return '$' +  Math.round(price/1000) + 'k'
    }
};

export function timeAgo(time){
    if (!time) return ''
    var units = [
        { name: "second", limit: 60, in_seconds: 1 },
        { name: "minute", limit: 3600, in_seconds: 60 },
        { name: "hour", limit: 86400, in_seconds: 3600  },
        { name: "day", limit: 604800, in_seconds: 86400 },
        { name: "week", limit: 2629743, in_seconds: 604800  },
        { name: "month", limit: 31556926, in_seconds: 2629743 },
        { name: "year", limit: null, in_seconds: 31556926 }
    ];
    var diff = (new Date() - new Date(time*1000)) / 1000;
    if (diff < 5) return "just now";

    var i = 0, unit;
    while (unit = units[i++]) {
        if (diff < unit.limit || !unit.limit){
            var diff =  Math.floor(diff / unit.in_seconds);
            return diff + " " + unit.name + (diff>1 ? "s" : "") + ' ago';
        }
    };
};


