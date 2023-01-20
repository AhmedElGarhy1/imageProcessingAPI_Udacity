import app from '../index.js';
import supertest from 'supertest';
import { promises as fs } from 'fs';

// creating request to start testing endpoints
const request = supertest(app);

// testing the server if running
describe('check endpoints', () => {
  describe('check if server is working', () => {
    it('check if server response status code less than 500', async () => {
      const response = await request.get('/');
      // status 500 or more means server isn't working
      expect(response.status).toBeLessThan(500);
    });
  });

  describe('check the api/image endpoint', () => {
    const name = 'icelandwaterfall';
    const width = 654;
    const height = 963;
    it('if the given image name exist', async () => {
      const response = await request.get(
        `/api/image?name=${name}&width=${width}&height=${height}`
      );

      const imageBuffer = await fs.readFile(
        `./assets/sharped/${name}-${width}x${height}.jpg`
      );
      expect(response.body).toEqual(imageBuffer);

      await fs.rm(`./assets/sharped/${name}-${width}x${height}.jpg`);
    });

    describe('if the given image name doesnt exist throw expected error', () => {
      const missingName = 'Please put a name query';
      const missingWidth = 'Please put a width query';
      const missingHeight = 'Please put a height query';
      const invalidNameResponse = `image name doesn't exist, Please provide a valid name`;

      it('invalid imageName test', async () => {
        const response = await request.get(
          `/api/image?name=test&width=${width}&height=${height}`
        );
        expect(response.body.msg).toBe(invalidNameResponse);
      });
      it('missing name test', async () => {
        const response = await request.get(
          `/api/image?width=${width}&height=${height}`
        );
        expect(response.body.msg).toBe(missingName);
      });
      it('missing width test', async () => {
        const response = await request.get(
          `/api/image?name=${name}&height=${height}`
        );
        expect(response.body.msg).toBe(missingWidth);
      });
      it('missing height test', async () => {
        const response = await request.get(
          `/api/image?name=${name}&width=${width}`
        );
        expect(response.body.msg).toBe(missingHeight);
      });
      it('entering a string type width or height', async () => {
        const response = await request.get(
          `/api/image?name=${name}&width=test&height=${height}`
        );
        expect(response.body.msg).toBe(missingWidth);
      });
    });
  });
});
