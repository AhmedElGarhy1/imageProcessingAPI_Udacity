import sharp from 'sharp';
import { checkIfImageNameExist } from './index.js';
import { promises as fs } from 'fs';

interface MSG {
  ok: boolean;
  msg: string;
}

// function that takes imageName, width and height then return true if ok and false if not
const resizeImage = async (
  imageName: string,
  width: number,
  height: number
): Promise<MSG> => {
  const isImageExist = await checkIfImageNameExist('full', imageName);
  if (!isImageExist)
    return {
      ok: false,
      msg: 'image filename is not exist',
    };

  //
  const imageBuffer: Buffer = await fs.readFile(
    `./assets/full/${imageName}.jpg`
  );

  const res = await sharp(imageBuffer)
    .resize(width, height)
    .toFile(`./assets/sharped/${imageName}-${width}x${height}.jpg`)
    .then(() => {
      return {
        ok: true,
        msg: 'done',
      };
    })
    .catch(() => {
      return {
        ok: false,
        msg: 'error on sharp lib',
      };
    });
  return res;
};

export { resizeImage };
