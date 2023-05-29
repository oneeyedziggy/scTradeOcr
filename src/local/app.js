import { readdir, readFile } from 'node:fs/promises';
import { cpus } from 'os';
import imageSize from 'image-size';

import { getCommodityJson } from '../shared/commodityExtractor.js'

const allowedFileExtensions = [ 'jpg','jpeg','png' ];
let files = [];
try {
  const dirContents = await readdir('./');
  files = await Promise.all(
    dirContents.filter( item => 
      allowedFileExtensions.includes(item.split('.').at(-1))
    ).map(
      async ( filename ) => {
        const file = await readFile(filename, (err, data) => {
            if (err) throw err;
            return data;
          });
        return {
          data: file,
          ...imageSize(file)
        }
      }
    )
  )
} catch (err) {
  console.error(err);
} 
console.log( await getCommodityJson( files, cpus().length - 1 ) );




