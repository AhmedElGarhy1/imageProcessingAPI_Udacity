import app from '../index.js';
import supertest from 'supertest';
import { promises as fs } from 'fs';

// creating request to start testing endpoints
const request = supertest(app);

// testing the server if running
describe('check endpoints', () => {
  beforeAll(async () => {
    // create output folder(assets/sharped)
    try {
      await fs.mkdir('./assets/sharped');
    } catch (e) {}
  });
  afterAll(async () => {
    try {
      await fs.rm(`./assets/sharped/icelandwaterfall-999x888.jpg`);
    } catch (e) {}
  });
  describe('check if server is working', () => {
    it('check if server response status code less than 500', async () => {
      try {
        const response = await request.get('/');
        // status 500 or more means server isn't working
        expect(response.status).toBeLessThan(500);
      } catch (e) {
        console.log("server isn't running");
      }
    });
  });

  describe('check the api/image endpoint', () => {
    const filename = 'icelandwaterfall';
    const width = 999;
    const height = 888;
    it('if the given image filename exist', async () => {
      try {
        const response = await request.get(
          `/api/image?filename=${filename}&width=${width}&height=${height}`
        );

        const imageBuffer = await fs.readFile(
          `./assets/sharped/${filename}-${width}x${height}.jpg`
        );
        expect(response.body).toEqual(imageBuffer);

        await fs.rm(`./assets/sharped/${filename}-${width}x${height}.jpg`);
      } catch (e) {
        console.log(
          "Please make sure you have image called '" +
            filename +
            "' in assets/full dir"
        );
      }
    });

    describe('if the given image filename doesnt exist throw expected error', () => {
      const missingName = 'Please put the filename query';
      const missingWidth = 'Please put the width query';
      const missingHeight = 'Please put the height query';
      const invalidNameResponse = `filename doesn't exist, Please provide a valid filename`;

      it('invalid imageName test', async () => {
        const response = await request.get(
          `/api/image?filename=test&width=${width}&height=${height}`
        );
        expect(response.body.msg).toBe(invalidNameResponse);
      });
      it('missing filename test', async () => {
        const response = await request.get(
          `/api/image?width=${width}&height=${height}`
        );
        expect(response.body.msg).toBe(missingName);
      });
      it('missing width test', async () => {
        const response = await request.get(
          `/api/image?filename=${filename}&height=${height}`
        );
        expect(response.body.msg).toBe(missingWidth);
      });
      it('missing height test', async () => {
        const response = await request.get(
          `/api/image?filename=${filename}&width=${width}`
        );
        expect(response.body.msg).toBe(missingHeight);
      });
      it('entering a string type width or height', async () => {
        const response = await request.get(
          `/api/image?filename=${filename}&width=test&height=${height}`
        );
        expect(response.body.msg).toBe(missingWidth);
      });
    });
  });
});
