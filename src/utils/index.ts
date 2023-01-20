import { promises as fs } from 'fs';

const checkIfImageNameExist = async (
  dirName: string,
  imageName: string
): Promise<boolean> => {
  // if user enterd a wrong dirName
  if (!(dirName === 'full' || dirName === 'sharped')) return false;

  // get all files in this dir
  try {
    const allFiles = await fs.readdir('./assets/' + dirName);

    // return if the file exist or not
    return allFiles.includes(imageName + '.jpg');
  } catch (err) {
    return false;
  }
};

export { checkIfImageNameExist };
