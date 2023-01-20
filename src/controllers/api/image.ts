import express from 'express';
import { checkIfImageNameExist } from '../../utils/index.js';
import { resizeImage } from '../../utils/resize.js';

interface ImageResponse {
  name: string;
  width: string;
  height: string;
}

const getImage = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const query = req.query;
  const { name, width, height } = query as unknown as ImageResponse;
  const imageName = name;
  const imageWidth = parseInt(width);
  const imageHeight = parseInt(height);

  try {
    // check if all queries are exist
    if (!imageName) throw Error('Please put a name query');
    if (!imageWidth) throw Error('Please put a width query');
    if (!imageHeight) throw Error('Please put a height query');

    // check if image exist in the full folder
    const isImageExist = await checkIfImageNameExist('full', imageName);
    if (!isImageExist)
      throw Error("image name doesn't exist, Please provide a valid name");

    // check if image sharped before
    const isImageSharpedBefore = await checkIfImageNameExist(
      'sharped',
      `${imageName}-${imageWidth}x${imageHeight}`
    );
    if (!isImageSharpedBefore) {
      const sharpRes = await resizeImage(imageName, imageWidth, imageHeight);
      if (!sharpRes.ok) throw Error(sharpRes.msg);
    }
    res
      .status(200)
      .sendFile(
        `${process.cwd()}/assets/sharped/${imageName}-${imageWidth}x${imageHeight}.jpg`
      );
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).json({ msg: e.message });
    } else {
      res.status(500).json({ msg: 'Sorry somthing happend' });
      console.log(e);
    }
  }
};

export { getImage };
