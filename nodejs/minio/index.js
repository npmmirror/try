const Minio = require('minio');

const minioClient = new Minio.Client({
  endPoint: 'play.min.io',
  // port: 9000,
  // useSSL: true,
  useSSL: true, // 如果使用ssl的话需要额外配置
  accessKey: 'Q3AM3UQ867SPQQA43P2F',
  secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG',
});

async function main() {
  const res1 = await minioClient.listBuckets();
  console.log('listBuckets', res1);

  const stream = await minioClient.listObjects('5ddfe44282319c500c3a4f9b');
  let idx = 1;
  stream.on('data', (obj) => {
    console.log(idx++, obj);
  });
  stream.on('error', (err) => {
    console.error(err);
  });
}

main()
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    // process.exit(0);
  });
