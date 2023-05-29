
//cross-compare similarity within allowed-word list
// const allCrossWordDistances = wordList.reduce( (acc, word1) => {
//   acc.push( ...wordList.map( word2 => {
//     const levDist = levenshteinDistance(word1, word2);
//     return { word1, word2, levDist, percent: levDist / word1.length };
//   }));
//   return acc;
// },[]).filter( item => item.word1 !== item.word2 && item.percent < 0.5 );
// console.log( {
//   wordList, 
//   //allCrossWordDistances, 
//   countSmallest: allCrossWordDistances.sort( (a,b) => b.levDist - a.levDist ).splice(-10), 
//   percentSmallest: allCrossWordDistances.sort( (a,b) => b.percent - a.percent ).splice(-10)
// } );

//TEST UTIL
export const flattenCommodityList = (commodityList) => {
  return commodityList
    .filter(item => !!item.name && !!item.aUECPricePerUnit)
    .reduce((acc, item) => {
      acc[item.name] = {
        aUECPricePerUnit: item.aUECPricePerUnit,
        demand: item.demand,
        scuVolume: item.scuVolume,
      };
      return acc;
    }, {});
};

//TEST DATA
export const ideal = [
  {
    "commodities": [
      {
        "name": "MEDICAL SUPPLIES",
        "scuVolume": 0,
        "aUECPricePerUnit": 1924,
        "demand": "Critical"
      },
      {
        "name": "DISTILLED SPIRITS",
        "scuVolume": 0,
        "aUECPricePerUnit": 555,
        "demand": "Critical"
      },
      {
        "name": "STIMS",
        "scuVolume": 0,
        "demand": "Critical",
        "aUECPricePerUnit": 379
      },
      {
        "name": "HADANITE",
        "scuVolume": 0,
        "demand": "Critical",
        "aUECPricePerUnit": 275000
      },
      {
        "name": "DOLOVINE",
        "demand": "Critical",
        "aUECPricePerUnit": 130000,
        "scuVolume": 0
      },
      {
        "name": "APHORITE",
        "demand": "Critical",
        "aUECPricePerUnit": 152500,
        "scuVolume": 0
      },
      {
        "name": "COMPBOARD",
        "demand": "Critical",
        "aUECPricePerUnit": 2250,
        "scuVolume": 0
      },
      {
        "name": "HELIUM",
        "scuVolume": 10000,
        "demand": "Medium",
        "aUECPricePerUnit": 189
      }
    ]
  },
  {
    "commodities": [
      {
        "name": "ALUMINUM",
        "demand": "Critical",
        "aUECPricePerUnit": 332,
        "scuVolume": 0
      },
      {
        "name": "AGRICULTURAL SUPPLIES",
        "scuVolume": 0,
        "aUECPricePerUnit": 120,
        "demand": "Critical"
      },
      {
        "name": "PROCESSED FOOD",
        "scuVolume": 0,
        "demand": "Critical",
        "aUECPricePerUnit": 150
      },
      {
        "name": "HYDROGEN",
        "scuVolume": 0,
        "demand": "Critical",
        "aUECPricePerUnit": 110
      },
      {
        "name": "ASTATINE",
        "scuVolume": 0,
        "aUECPricePerUnit": 900,
        "demand": "Critical"
      },
      {
        "name": "CHLORINE",
        "aUECPricePerUnit": 170,
        "demand": "Critical",
        "scuVolume": 0
      },
      {
        "name": "FLUORINE",
        "scuVolume": 0,
        "demand": "Critical",
        "aUECPricePerUnit": 295
      },
      {
        "name": "IODINE",
        "scuVolume": 0,
        "demand": "Critical",
        "aUECPricePerUnit": 44
      }
    ]
  },
  {
    "commodities": [
      {
        "name": "MEDICAL SUPPLIES",
        "demand": "Critical",
        "aUECPricePerUnit": 1924
      },
      {
        "name": "AGRICIUM",
        "scuVolume": 0,
        "demand": "Critical",
        "aUECPricePerUnit": 2598
      },
      {
        "name": "GOLD",
        "demand": "Critical",
        "aUECPricePerUnit": 7754
      },
      {
        "name": "TITANIUM",
        "scuVolume": 0,
        "aUECPricePerUnit": 511,
        "demand": "Critical"
      },
      {
        "name": "TUNGSTEN",
        "scuVolume": 0,
        "demand": "Critical",
        "aUECPricePerUnit": 414
      },
      {
        "name": "BERYL",
        "demand": "Critical",
        "aUECPricePerUnit": 2756,
        "scuVolume": 0
      },
      {
        "name": "CORUNDUM",
        "scuVolume": 0,
        "aUECPricePerUnit": 385,
        "demand": "Critical"
      },
      {
        "name": "DIAMOND",
        "scuVolume": 0,
        "demand": "Critical",
        "aUECPricePerUnit": 4453
      }
    ]
  },
  {
    "commodities": [
      {
        "name": "LARANITE",
        "scuVolume": 0,
        "demand": "Critical",
        "aUECPricePerUnit": 3114
      },
      {
        "name": "QUARTZ",
        "aUECPricePerUnit": 392,
        "demand": "Critical",
        "scuVolume": 0
      },
      {
        "name": "DISTILLED SPIRITS",
        "aUECPricePerUnit": 555,
        "demand": "Critical",
        "scuVolume": 0
      },
      {
        "name": "STIMS",
        "aUECPricePerUnit": 379,
        "demand": "Critical",
        "scuVolume": 0
      },
      {
        "name": "REVENANT TREE POLLEN",
        "aUECPricePerUnit": 168,
        "demand": "Critical",
        "scuVolume": 0
      },
      {
        "name": "TARANITE",
        "scuVolume": 0,
        "demand": "Critical",
        "aUECPricePerUnit": 7686
      },
      {
        "name": "QUANTANIUM",
        "aUECPricePerUnit": 25150,
        "demand": "Critical",
        "scuVolume": 0
      },
      {
        "name": "HEPHAESTANITE",
        "aUECPricePerUnit": 2752,
        "demand": "Critical",
        "scuVolume": 0
      }
    ]
  },
  {
    "commodities": [
      {
        "name": "QUANTANIUM",
        "scuVolume": 0,
        "demand": "Critical",
        "aUECPricePerUnit": 25150
      },
      {
        "name": "HEPHAESTANITE",
        "scuVolume": 0,
        "demand": "Critical",
        "aUECPricePerUnit": 2752
      },
      {
        "name": "COPPER",
        "demand": "Critical",
        "aUECPricePerUnit": 384,
        "scuVolume": 0
      },
      {
        "name": "BORASE",
        "aUECPricePerUnit": 3632,
        "demand": "Critical",
        "scuVolume": 0
      },
      {
        "name": "BEXALITE",
        "aUECPricePerUnit": 7823,
        "demand": "Critical",
        "scuVolume": 0
      },
      {
        "name": "HADANITE",
        "scuVolume": 0,
        "demand": "Critical",
        "aUECPricePerUnit": 275000
      },
      {
        "name": "RECYCLED MATERIAL COMPOSITE",
        "scuVolume": 0,
        "demand": "Critical",
        "aUECPricePerUnit": 7699
      }
    ]
  },
  {
    "commodities": [
      {
        "name": "ALUMINUM",
        "aUECPricePerUnit": 348,
        "demand": "Critical",
        "scuVolume": 0
      },
      {
        "name": "AGRICULTURAL SUPPLIES",
        "aUECPricePerUnit": 120,
        "demand": "Critical",
        "scuVolume": 0
      },
      {
        "name": "PROCESSED FOOD",
        "scuVolume": 0,
        "demand": "Critical",
        "aUECPricePerUnit": 150
      },
      {
        "name": "HYDROGEN",
        "scuVolume": 0,
        "demand": "Critical",
        "aUECPricePerUnit": 110
      },
      {
        "name": "ASTATINE",
        "scuVolume": 0,
        "demand": "Critical",
        "aUECPricePerUnit": 900
      },
      {
        "name": "CHLORINE",
        "scuVolume": 0,
        "demand": "Critical",
        "aUECPricePerUnit": 170
      },
      {
        "name": "FLUORINE",
        "demand": "Critical",
        "scuVolume": 0,
        "aUECPricePerUnit": 295
      },
      {
        "name": "IODINE",
        "demand": "Critical",
        "scuVolume": 0,
        "aUECPricePerUnit": 43
      }
    ]
  },
  {
    "commodities": [
      {
        "name": "MEDICAL SUPPLIES",
        "aUECPricePerUnit": 1924,
        "demand": "Critical",
        "scuVolume": 0
      },
      {
        "name": "AGRICIUM",
        "demand": "Critical",
        "aUECPricePerUnit": 2795,
        "scuVolume": 0
      },
      {
        "name": "GOLD",
        "scuVolume": 0,
        "demand": "Critical",
        "aUECPricePerUnit": 8043
      },
      {
        "name": "TITANIUM",
        "scuVolume": 0,
        "demand": "Critical",
        "aUECPricePerUnit": 516
      },
      {
        "name": "TUNGSTEN",
        "scuVolume": 0,
        "demand": "Critical",
        "aUECPricePerUnit": 430
      },
      {
        "name": "BERYL",
        "demand": "Critical",
        "scuVolume": 0,
        "aUECPricePerUnit": 2549
      },
      {
        "name": "CORUNDUM",
        "demand": "Critical",
        "scuVolume": 0,
        "aUECPricePerUnit": 369
      },
      {
        "name": "DIAMOND",
        "demand": "Critical",
        "scuVolume": 0,
        "aUECPricePerUnit": 4453
      }
    ]
  },
  {
    "commodities": [
      {
        "scuVolume": 0
      },
      {
        "name": "DIAMOND",
        "aUECPricePerUnit": 4453,
        "demand": "Critical",
        "scuVolume": 0
      },
      {
        "name": "LARANITE",
        "aUECPricePerUnit": 2961,
        "demand": "Critical",
        "scuVolume": 0
      },
      {
        "name": "QUARTZ",
        "aUECPricePerUnit": 366,
        "demand": "Critical",
        "scuVolume": 0
      },
      {
        "name": "DISTILLED SPIRITS",
        "aUECPricePerUnit": 554,
        "demand": "Critical",
        "scuVolume": 0
      },
      {
        "name": "STIMS",
        "scuVolume": 0,
        "demand": "Critical",
        "aUECPricePerUnit": 379
      },
      {
        "name": "REVENANT TREE POLLEN",
        "demand": "Critical",
        "scuVolume": 0,
        "aUECPricePerUnit": 168
      },
      {
        "name": "TARANITE",
        "demand": "Critical",
        "scuVolume": 0,
        "aUECPricePerUnit": 7500
      },
      {
        "name": "QUANTANIUM",
        "demand": "Critical",
        "scuVolume": 0,
        "aUECPricePerUnit": 25150
      },
      {
        "name": "HEPHAESTANITE",
        "demand": "Critical",
        "scuVolume": 0,
        "aUECPricePerUnit": 2778
      }
    ]
  },
  {
    "commodities": [
      {
        "name": "HEPHAESTANITE",
        "aUECPricePerUnit": 2778,
        "demand": "Critical",
        "scuVolume": 0
      },
      {
        "name": "BEXALITE",
        "demand": "Critical",
        "aUECPricePerUnit": 7981,
        "scuVolume": 0
      },
      {
        "name": "COPPER",
        "scuVolume": 0,
        "demand": "Critical",
        "aUECPricePerUnit": 374
      },
      {
        "name": "BORASE",
        "scuVolume": 0,
        "demand": "Critical",
        "aUECPricePerUnit": 3447
      },
      {
        "name": "HADANITE",
        "scuVolume": 0,
        "demand": "Critical",
        "aUECPricePerUnit": 275000
      },
      {
        "name": "RECYCLED MATERIAL COMPOSITE",
        "scuVolume": 0,
        "aUECPricePerUnit": 7699,
        "demand": "Critical"
      },
      {
        "name": "IRON",
        "demand": "Critical",
        "scuVolume": 0,
        "aUECPricePerUnit": 401
      }
    ]
  }
].map(list => {
  return flattenCommodityList(list.commodities)
});

//TEST UTIL
export const compareToIdeal = (commodityLists) => {
  commodityLists = commodityLists.map(item => {
    return flattenCommodityList(item.commodities);
  });
  console.log({commodityLists:JSON.stringify(commodityLists, null, '  ')});

  let aUECOff = 0;
  let totalIdealaUEC = 0;
  let totalFoundaUEC = 0;
  let currentIdealaUEC = 0;
  let currentFoundaUEC = 0;
  let missingSCUVol = 0;
  let missingCommodity = 0;
  let missingDemand = 0;
  let currentCommodity;
  let currentIdealList;
  let currentIdealCommodity;

  commodityLists.map((commodityList, commodityListsIndex) => {
    currentIdealList = ideal[commodityListsIndex];

    for (let currentIdealCommodityName in currentIdealList) {
      currentCommodity = commodityList[currentIdealCommodityName];
      currentIdealCommodity = currentIdealList[currentIdealCommodityName];

      totalIdealaUEC += currentIdealCommodity.aUECPricePerUnit;
      currentIdealaUEC = currentIdealCommodity.aUECPricePerUnit;
      if (currentCommodity) {
        if (currentCommodity.aUECPricePerUnit !== currentIdealCommodity.aUECPricePerUnit) {
          // console.log( {
          //   name: currentIdealCommodityName,
          //   ideal: currentIdealCommodity.aUECPricePerUnit,
          //   current: currentCommodity.aUECPricePerUnit
          // } );
          totalFoundaUEC += currentCommodity.aUECPricePerUnit;
          currentFoundaUEC = currentCommodity.aUECPricePerUnit;
          aUECOff += Math.abs(currentIdealCommodity.aUECPricePerUnit - (currentCommodity.aUECPricePerUnit || 0));
        }
        if (currentCommodity.scuVolume || currentCommodity.scuVolume !== currentIdealCommodity.scuVolume) {
          missingSCUVol++;
        }
        if (currentCommodity.demand || currentCommodity.demand !== currentIdealCommodity.demand) {
          missingDemand++;
        }
      } else {
        missingCommodity++;
      }
      console.log({currentIdealCommodityName, currentIdealaUEC,currentFoundaUEC});
    }
  });

  return {
    totalIdealaUEC,
    totalFoundaUEC,
    aUECOff,
    aUECOffPerIdeal: aUECOff / totalIdealaUEC,
    aUECOffPerFound: aUECOff / totalFoundaUEC,
    missingCommodity,
    missingSCUVol,
    missingDemand
  };
};