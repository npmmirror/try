function getCanvas({ width, height }) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

async function loadImage(path) {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = path;
    image.onload = function () {
      resolve(image);
    };
  });
}

function getDistance(imageData, x, y, targetRGB) {
  const coordinate = (x + y * imageData.width) * 4;
  const r = imageData.data[coordinate];
  const g = imageData.data[coordinate + 1];
  const b = imageData.data[coordinate + 2];
  const distance =
    (r - targetRGB[0]) * (r - targetRGB[0]) +
    (g - targetRGB[1]) * (g - targetRGB[1]) +
    (b - targetRGB[2]) * (b - targetRGB[2]);
  return { distance, coordinate };
}

const tolerance = Math.pow(3, 2);
const targetRGB = [0, 0, 0];

// 遍历所有坐标点，将黑色的点改成白色
// 注：这个方法不好，所以不用
async function transformImage(imagePath) {
  const img = await loadImage(imagePath);
  const canvas = getCanvas({
    width: img.width,
    height: img.height,
  });
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, img.width, img.height);
  for (let left = 0; left < imageData.width; left++) {
    for (let top = 0; top < imageData.height; top++) {
      const { distance, coordinate } = getDistance(
        imageData,
        left,
        top,
        targetRGB
      );
      if (distance <= tolerance) {
        // rgba(255,255,255,0)
        imageData.data[coordinate] = 255;
        imageData.data[coordinate + 1] = 255;
        imageData.data[coordinate + 2] = 255;
        imageData.data[coordinate + 3] = 0;
      }
    }
  }
  ctx.putImageData(imageData, 0, 0);
  const dataURL = canvas.toDataURL("image/png", 1);
  return dataURL;
}

// 画出矩形，再将矩形以外的部分设置为白色
async function transformImageByRect(imagePath) {
  const img = await loadImage(imagePath);
  const canvas = getCanvas({
    width: img.width,
    height: img.height,
  });
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, img.width, img.height);
  let left = img.width,
    right = 0,
    top = img.height,
    bottom = 0;
  for (let x = 0; x < imageData.width; x++) {
    for (let y = 0; y < imageData.height; y++) {
      const { distance, coordinate } = getDistance(imageData, x, y, targetRGB);
      if (distance <= tolerance) {
        // imageData.data[coordinate] = 255;
        // imageData.data[coordinate + 1] = 255;
        // imageData.data[coordinate + 2] = 255;
      } else {
        left = Math.min(left, x);
        right = Math.max(right, x);
        top = Math.min(top, y);
        bottom = Math.max(bottom, y);
      }
    }
  }
  for (let x = 0; x < imageData.width; x++) {
    for (let y = 0; y < imageData.height; y++) {
      const coordinate = (x + y * imageData.width) * 4;
      if (x < left || x > right || y < top || y > bottom) {
        // rgba(255,255,255,0)
        imageData.data[coordinate] = 255;
        imageData.data[coordinate + 1] = 255;
        imageData.data[coordinate + 2] = 255;
        imageData.data[coordinate + 3] = 0;
      }
    }
  }
  ctx.putImageData(imageData, 0, 0);
  const dataURL = canvas.toDataURL("image/png", 1);
  return dataURL;
}

$(async function () {
  const imageSrc = $("#image").attr("src");
  const dataURL = await transformImageByRect(imageSrc);
  const dataURL2 = await transformImage(imageSrc);
  $("#after").append(`<img src="${dataURL}" />`);
  $("#after").append(`<img src="${dataURL2}" />`);
});
