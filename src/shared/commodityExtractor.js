import { createScheduler, createWorker } from 'tesseract.js';

import { compareToIdeal } from '../test/testUtils.js';

(()=>console.log("H".repeat(51)))();
//hurston tdd missing the generic currency symbol for Medical supplies and diamond
//1 chokes on processed food and some digits...
//2 chokes on medical supplies and some digits... keeps thinking the currency symbol is a 1
//3 blends stims and RTP chokes on distilled spirits again... messes up prices when it chokes on the name
//4 chokes on RCM
//5 explodes
//6 chokes on medical supplies, titanium price, and some digits
//7 kind of falls apart and starts dropping data after distilled spirits and revenant tree pollen
//8
//9 slight accuracy improvement
//10

const config = {
  showResults: false,
  showTestMetrics: false
}

//https://www.30secondsofcode.org/js/s/levenshtein-distance/ 
const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

const demandsMap = {
  "OUT OF STOCK": {
      "displayName": "Out of Stock",
      "level": "Critical"
  },
  "INVENTORY UPDATING": {
      "displayName": "Inventory Updating",
      "level": "Emergent"
  },
  "LOW INVENTORY": {
      "displayName": "Low Inventory",
      "level": "High"
  },
  "HIGH INVENTORY": {
      "displayName": "High Inventory",
      "level": "Low"
  },
  "MEDIUM INVENTORY": {
      "displayName": "Medium Inventory",
      "level": "Medium"
  },
  "MAX INVENTORY": {
      "displayName": "Max Inventory",
      "level": "None"
  },
  "VERY LOW INVENTORY": {
      "displayName": "Very Low Inventory",
      "level": "VeryHigh"
  },
  "VERY HIGH INVENTORY": {
      "displayName": "Very High Inventory",
      "level": "VeryLow"
  },
  //bonus values
  "J00FSTOCKP": {
    "displayName": "Out of Stock",
    "level": "Critical"
  }
}

const demandNames = Object.keys(demandsMap);
const demandNameWords = [... new Set(demandNames.join(' ').split(' ')) ]
const demandNamesNospace = demandNames.map((name=>name.replaceAll(' ', '')));
const demandNamesNospaceToSpaceMap = demandNames.reduce((acc,name) => {
  acc[ name.replaceAll(' ', '') ] = `{"demand": "${demandsMap[name].level}"}`;
  return acc;
},{});

// thanks SCTT discord user Remarkable#3131 for some initial typoo finds on "CORONDUM" to "CORUNDUM" and "TUNGESTEN" to "TUNGSTEN"
// thanks to SC-Trade.tools for the base commodity list
// full
//const splitWords = [ "AUDIO-VISUAL EQUIPMENT", "CK13-GID SEED BLEND", "CONSTRUCTION MATERIALS", "CONSUMER GOODS", "GASPING WEEVIL EGGS", "HLX99 HYPERPROCESSORS", "HUMAN FOOD BARS", "LIFECURE MEDSTICKS", "OSOIAN HIDES", "PARTY FAVORS", "RS1 ODYSEY SPACESUITS", "REDFIN ENERGY MODULATOR", "ACRYLIPLEX COMPOSITE", "AGRICIUM (ORE)", "AGRICULTURAL GOODS", "AGRICULTURAL SUPPLIES", "REVENANT TREE POLLEN", "ALUMINUM (ORE)", "AMIOSHI PLAGUE", "APHORITE (RAW)", "BERYL (RAW)", "BEXALITE (RAW)", "BLUE BILVA", "BORASE (ORE)", "CADMIUM ALLINIDE", "COPPER (ORE)", "CORUNDUM (RAW)", "CRUDE OIL", "DECARI POD", "DEGNOUS ROOT", "DIAMOND (RAW)", "DIAMOND LAMINATE", "DISTILLED SPIRITS", "DOLIVINE (RAW)", "FOTIA SEEDPOD", "FRESH FOOD", "GOLD (ORE)", "GOLDEN MEDMON", "HADANITE (RAW)", "HEART OF THE WOODS", "HEPHAESTANITE (RAW)", "INERT MATERIALS", "JANALITE (RAW)", "JUMPING LIMES", "LARANITE (RAW)", "MEDICAL SUPPLIES", "MIXED MINING", "MOBYGLASS PERSONAL COMPUTERS", "PINGALA SEEDS", "PROCESSED FOOD", "QUANTAINIUM (RAW)", "QUARTZ (RAW)", "RANTA DUNG", "REVENANT POD", "LUMINALIA GIFT", "YEAR OF THE HORSE ENVELOPE", "YEAR OF THE MONKEY ENVELOPE", "YEAR OF THE RAM ENVELOPE", "YEAR OF THE ROOSTER ENVELOPE", "LUNES (SPIRAL FRUIT)", "SULFER MOSS", "SUNSET BERRIES", "TARANITE (RAW)", "TITANIUM (ORE)", "TUNGSTEN (ORE)", "HEXAPOLYMESH COATING", "RECYCLED MATERIAL COMPOSITE", "AGRICULTURAL SUPPLY", "CONSUMER GOODS", "MEDICAL SUPPLY", "NATURAL MATERIALS", "PLASMA FUEL", "PROCESSED GOODS", "QUANTUM FUEL", "UNCUT SLAM"];
//custom attempt
const splitExtras = [
  "AUDIO-VISUAL EQUIPMENT",
  "CONSTRUCTION MATERIALS",
  "PARTY FAVORS",
  "OSOIAN HIDES",
];
const splitWords = [ ...splitExtras, "ACRYLIPLEX COMPOSITE", "AGRICULTURAL SUPPLIES", "AMIOSHI PLAGUE", "DEGNOUS ROOT", "DISTILLED SPIRITS", "GOLDEN MEDMON", "HEART OF THE WOODS", "INERT MATERIALS", "LUMINALIA GIFT", "MEDICAL SUPPLIES", "PROCESSED FOOD", "RANTA DUNG", "RECYCLED MATERIAL COMPOSITE", "REVENANT POD", "REVENANT TREE POLLEN", "SUNSET BERRIES", "YEAR OF THE ROOSTER ENVELOPE"]
const splitWordChains = splitWords.reduce( (acc, splitWord) => {
  acc.push( ...splitWord.split(' ').map( ( word, index, arr ) => {
      if( arr[ index + 1 ] ){
        return `${ word } ${ arr[ index + 1 ] }`;
      }
    }).filter( item => !!item));
  return acc;
}, []);

//custom attempt
const extras = [
  "FIREWORKS",
  "SOUVENIRS",
  "HELIUM",
  "GLOW",
  "THRUST",
  "ZIP",
  "DOPPLE",
];
const resourceNames = [ 
  ...extras, ...splitWords, 
  "AGRICIUM", "ALTRUCIATOXIN", "ALUMINUM", "APHORITE", "ASTATINE", "ATLASIUM", 
  "BERYL", "BEXALITE", "BORASE", 
  "CHLORINE", "COMPBOARD", "COPPER", "CORUNDUM", 
  "DIAMOND", "DILUTHERMEX", "DOLIVINE", "DYMANTIUM", 
  "E'TAM", 
  "FLUORINE", 
  "GOLD", 
  "HADANITE", "HEPHAESTANITE", "HYDROGEN", 
  "IRON", "IODINE", 
  "JANALITE", 
  "LARANITE", 
  "MAZE", 
  "NEON", 
  "PITAMBU", "PROTA", 
  "QUANTAINIUM", "QUARTZ", 
  "SLAM", "SCRAP", "STIMS", 
  "TARANITE", "TITANIUM", "TUNGSTEN", 
  "WASTE", "WIDOW", 
  "ZETA-PROLANIDE"
];

const wordList = [
  'UNIT',
  ...resourceNames.reduce( ( acc, item ) => {
    acc.push( ...item.split(' ') )
    return acc;
  },[]), 
  ...demandNameWords,
  ...demandNamesNospace,
  // all 2+ part words split into overlapping pairs, like 'REVENANT TREE POLLEN' -> 'REVENANT TREE', 'TREE POLLEN'
  ...splitWordChains,
  // all 2+ part words split into sub-component words, like 'REVENANT TREE POLLEN' -> 'REVENANT', 'TREE', 'POLLEN'
  ...splitWords.reduce( (acc, splitWord) => {
    acc.push( ...splitWord.split(' ') );
    return acc;
  }, []),
];

const partialMatcher = ( word, list, threshold = 0.41, text ) => {
  if( !word.startsWith('{"scuVolume') && !word.startsWith('{"aUECPricePerUnit') ){ // don't try to fuzzy-match scuVolumes (TODO: pre-parse any other "clean" resource names, etc. to improve performance)
    const matches = list.map((listWord)=>{
      const levDist = levenshteinDistance(word, listWord);
      return {
        word: listWord,
        dist: levDist,
        percentDiff: levDist / word.length
      };
      //sort this on percent-diff, but when equal sort by length descending, so the longest match wins, especially where 100% match
    }).sort((a,b)=>{return (a.percentDiff - b.percentDiff) || (b.word.length - a.word.length) });

    if(matches[0].percentDiff <= threshold){
      return demandNamesNospaceToSpaceMap[matches[0]?.word] || matches[0]?.word;
    } else {
      return word;
    }
  } else {
    return word;
  }
}

const wholeTextMatcher = (text) => {
  text = text.replaceAll( /\s+/g, ' ');
  const textArray = text.split(' ');
  const convertedTextArray = textArray.map( ( word ) => partialMatcher( word, wordList, 0.41, text ) );
  console.log( {
    wholeTextMatcher: convertedTextArray.join(' ')
  } );
  return convertedTextArray.join(' ');
}

const rejoinSplitWords = (text) => {
    // make a pattern of every 2-part word that looks for scuVolume in the middle and moves it to the end
  const rejoinedSplitWords = splitWordChains.reduce( ( text, splitWord ) =>{
    const prePattern = splitWord.replaceAll( /([(\)])/g, '\\\$1').replace( /((\\\()?[A-Z-']+(\\\))?) ((\\\()?[A-Z-']+(\\\))?)/, "\($1) ([^ ]+) ($4)" );
    // what this is doing: escape parens around sub-words, then convert that to a regex that will batch either "word word", "word (word)", "(word) word", or "(word) (word)" and paren-wrap each specific word, 
    //   then add a non-specific word-like pattern in between to turn pattern A B C into A C B
    //   as this works through word chain parts, like "a b c" to "a b" and "b c", single interceeding words will be pushed one word right 
    //   in the text all the way down the line of any multi-word resource names
    //   This covers split-line words like: RECYCLED        0SCU
    //                                      MATERIALS   
    const pattern = new RegExp( prePattern, "g" );
    text = text.replace(pattern, '$1 $3 $2');
    return text;
  }, text);
  console.log( {
    rejoinedSplitWords
  } );
  return rejoinedSplitWords;
}

const breakOutNames = (text) => {
  const withNamesBrokenOut = resourceNames
  //pre-sort by length descending so smaller subsets of longer words get matched second
  .sort( (a,b) => b.length - a.length )
  .reduce( ( text, word ) =>{

    if( word === 'FOOD'){
      console.log( {text} );
    }
  //match non-quotes to prevent smaller subsets from being replaces
  const pattern = new RegExp( `([^"])(${word})([^"])` );
  return text.replace(pattern, '$1{"name":"$2"}$3');
}, text);
console.log( { withNamesBrokenOut } );
  return withNamesBrokenOut;
}

const parseAbbreviatedNumber = (numString) => {
  if( numString.endsWith('K') ){
    return (parseFloat( numString.replace('K', '') ) * 1_000);
  } else if( numString.endsWith('M') ){
    return (parseFloat( numString.replace('M', '') ) * 1_000_000);
  } else if( numString.endsWith('G') ){
    return (parseFloat( numString.replace('G', '') ) * 1_000_000_000);
  } else {
    const float = parseFloat( numString );
    //it would be denoted w/ a K or M and a decimal if it were > 1000, so if it's not a leading 1 got added by the OCR
    return parseInt( float.toString().split('').splice(-3).join('') );
  }
}

const postProcessTextToJson = (text) => {
  const JSONString = `{ "commodities": [${breakOutNames( //convert resource names from resourceNames list to labeled JSON
     rejoinSplitWords( //rejoin words interrupted by line breaks that confuse the OCR ( "some B thing" => "some thing B" for list of known "some thing"s )
          wholeTextMatcher( //convert raw OCRd words by levenstine distance+ comparison to a known-words list
            text
            .replaceAll( //convert scuVolumes to JSON
              /(\d{1,3}(,\d{1,3})?)(SC?U?)/g, 
              (one) => `{"scuVolume":${parseInt(one.replaceAll(/[^\d]/g,''))}}`
            )
            .replaceAll( //convert prices to JSON
            /\.?([\d\.]{1,5}[MK]?)\/([^ ]{0,2}NIT|U[^ ]{0,2}IT|UN[^ ]{0,2}T|UNI[^ ]{0,2})/g,
              (_base, one) => `{"aUECPricePerUnit":${parseAbbreviatedNumber(one)}}`
            )
         ) 
       )
     )
      .replaceAll( /}[^{]+{/g, '}{') //wipe out the remaining noise between brackets
      .replace( /^[^{]+{/g, '{') //and remaining noise at the start
      .replaceAll( /}{"(scuVolume|demand|aUECPricePerUnit)/g, ', "$1') //close in sets of brackets to form resource entities
      .replaceAll( /}/g, '},') //add comas between commodity objects
      .replace( /}[^{]*$/, '}') //remove trailing noise
  }]}` //some wrapper to make it real json
  console.log( { JSONString } ); //cool thing?
  return JSON.parse(JSONString);
}

// this cll checks how many cores you have configures the workers, and splins up either one per file or 
//   one fewer than your core count, whichever is smaller.
// It then pumps the result of each into an SC commodity specific text cleanup process, then interprets the 
//   combined result as json and outputs it
export const getCommodityJson = async ( files, coreCount = 3 ) => {
  const scheduler = createScheduler();
  const requiredWorkers = files.length > (coreCount - 1) ? coreCount -1 : files.length;
  // a var to hold workers awaiting creation
  const workerPromises = [];
  const characters = "¤1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ,./▶▷"; //()-'
  for( let i = 0; i < requiredWorkers; i++){
    workerPromises.push((async () => {
      const worker = await createWorker();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      await worker.setParameters({
        //tessedit_pageseg_mode notes
        //0
        //1
        //2
        //3 - pretty clean
        //4 - fine
        //5 - complete garbage
        //6 - slightly less fine
        //7 - fail
        //8 - fail
        //9 - fail
        //10- fail
        //11- really interesting, but would slightly break parsing
        //12- similar to 11
        //13- fail
        //14- fail
        tessedit_pageseg_mode: '11',
        tessedit_char_whitelist: characters,
        preserve_interword_spaces: '1',
      });
      scheduler.addWorker(worker);
    })())
  }
  //wait for all the workers to be created
  await Promise.all(workerPromises);

  const result = await Promise.all(
    files.map( file => { 
      return scheduler.addJob( 
          'recognize',
          file.data, 
          {
            // just look at the right half of the screen
            // rectangle: {
            //   top: 0,
            //   left: Math.floor(file.width / 2),
            //   height: file.height,
            //   width: Math.floor(file.width / 2)
            // }
          } 
        )
        .then(
          (result) => postProcessTextToJson(result.data.text)
        ).catch( ( err ) => {
          console.error( err );
        }
      )}
    )
  ).then( result => {
    if( config.showResults ){
        console.log( {result} );
        console.log( {result: JSON.stringify( result )} );
    }
    if( config.showTestMetrics ){
      console.log(compareToIdeal(result))
    }
    return result;
  }).catch( ( err ) => {
    console.error( err );
  });
  await scheduler.terminate(); // It also terminates all workers.
  return JSON.stringify( result );
};