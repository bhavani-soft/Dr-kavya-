const https = require('https');
const fs = require('fs');
const path = require('path');

const baseUrl = 'https://kushagrawal.in';
const images = [
  '/images/kusha.png',
  '/images/author-logo.jpeg',
  '/images/vi.png',
  '/images/gotrip1.png',
  '/images/gotrip2.png',
  '/images/blinkit1.jpg',
  '/images/blinkit2.jpg',
  '/images/hr1.png',
  '/images/hr2.png',
  '/images/snap1.png',
  '/images/snap2.png',
  '/images/books/iot.jpeg',
  '/images/2_DA.jpg',
  '/images/vi.jpg',
  '/images/1_IT.jpg',
  '/images/3_PY.png',
  '/images/4_DSA.jpg'
];

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

const run = async () => {
  console.log('Downloading assets...');
  for (const img of images) {
    const url = `${baseUrl}${img}`;
    const dest = path.join(__dirname, 'public', img);
    try {
      await download(url, dest);
      console.log(`Downloaded: ${img}`);
    } catch (err) {
      console.error(`Error downloading ${img}:`, err.message);
    }
  }
  console.log('Finished downloading all assets!');
};

run();
