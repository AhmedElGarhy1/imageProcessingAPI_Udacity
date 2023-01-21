# Image Processing API Udacity Project

## who to

- install

`npm i`

- start the server

`npm run start`

- test

`npm run test`

- build

`npm run build`

- formate

`npm run prettier`

## accessed endpoints

```
GET - /
GET - /api/image?filename={imageName}&width=${width}&height={height}

```

## functionality that made and tested

src/utils

it contains some functions like
checkIfImageNameExist at src/utils/index.ts

```Javascript
/*
  here it needs the imageName to search for it in dirName and return ? true if found : false if not
*/
checkIfImageNameExist(dirName, imageName)
```

and

resizeImage at src/utils/resize.ts

```Javascript
/*
  here it needs the imageName, width and height then it resize it with sharp library then return
  {
    ok: bool,
    msg: string // message
  }
*/
resizeImage(imageName, width, height)
```

## how to use

the goal is to be able to resize any image using sharp lib

you will a have **assets** folder that contains **full** and **sharped** subfolders

the **full** folder contains some images that can be resized so we need to run the server and going to

```
/api/image?filename={imageName}&width=${width}&height={height}

```

imageName it should be exist at assets/full folder

width should be a number

height should be a number

then you will see the image in the endpoint you visited and you will find the file exist in assets/shaped/{imageName}

## explaning the src folder

src

```
- controllers /* it contains all router controler files */
- routes      /* it contains all router files           */
- tests       /* it contain the jasmine tests           */
- utils       /* it contains some utility function      */
```
