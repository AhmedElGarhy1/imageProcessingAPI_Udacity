import { checkIfImageNameExist } from '../../utils/index.js';
import { resizeImage } from '../../utils/resize.js';
import { promises as fs } from 'fs';
import sharp from 'sharp';

describe('utilites functions', () => {
  const fullDir = './assets/full';
  const sharpedDir = './assets/sharped';

  describe('see if checkIfImageNameExist utilites function works', () => {
    it('when image exist return true', async () => {
      const file = 'palmtunnel.jpg';
      const dir = await fs.readdir(fullDir);
      expect(dir).toContain(file);
    });
    it('when image doesnt exist return false', async () => {
      const file = 'test.jpg';
      const dir = await fs.readdir(fullDir);
      expect(dir).not.toContain(file);
    });
  });

  describe('see if resizeImage utilites function works ', () => {
    afterEach(async () => {
      try {
        fs.rm(`${sharpedDir}/encenadaport-999x888.jpg`);
      } catch (err) {}
    });
    it('when image name is correct it returns ok: true', async () => {
      const res = await resizeImage('encenadaport', 999, 888);
      expect(res.ok).toBeTrue();
    });
    it('when image name isnt correct it returns ok: false and msg: image name is not exist', async () => {
      const res = await resizeImage('test', 999, 888);
      expect(res).toEqual({
        ok: false,
        msg: 'image name is not exist',
      });
    });
  });
});
