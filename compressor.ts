/* eslint-disable */
import { readdirSync, lstatSync, createReadStream, createWriteStream, readFileSync, writeFile } from 'fs';
import { createGzip } from 'zlib';
import { join } from 'path';
import brotli from 'brotli';

const brotliSettings = {
  extension: 'br',
  skipLarger: true,
  mode: 1, // 0 = generic, 1 = text, 2 = font (WOFF2)
  quality: 10, // 0 - 11,
  lgwin: 12 // default
};

const root = join(__dirname, '/dist/client');
const resources: string[] = [];

function getFiles(folder: string, ext: RegExp) {
  const files = readdirSync(folder);
  files.forEach(file => {
    const fileName = join(folder, file);
    const stat = lstatSync(fileName);
    if (stat.isDirectory()) {
      getFiles(fileName, ext);
    } else if (ext.test(fileName)) {
      resources.push(fileName);
    }
  });
}

async function compressGZip() {
  return Promise.all(resources.map(file => {
    return new Promise((resolve, reject) => {
      const compress = createGzip();
      const input = createReadStream(file);
      const output = createWriteStream(file + '.gz');
      input.pipe(compress).pipe(output);
      output.on('finish', () => {
        resolve();
      });
      output.on('error', ex => {
        reject(ex);
      });
    });
  }));
}

async function compressBrotli() {
  return Promise.all(resources.map(file => {
    return new Promise((resolve, reject) => {
      const result = brotli.compress(readFileSync(file), brotliSettings);
      writeFile(file + '.br', result, (err) => {
        if (err)
          return reject(err);
        resolve();
      });
    });
  }));
}

getFiles(root, /\.js$|\.css$/);

Promise.all([compressGZip(), compressBrotli()]).then(() => {
  console.log('compression complete');
}).catch(err => {
  console.error('error occured during compress');
  console.error(err);
});
