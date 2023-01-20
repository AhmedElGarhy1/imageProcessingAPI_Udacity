# Image Processing API Udacity Project

## who to

- install

`npm i`

- start a server

`npm run start`

- test

`npm run test`

- formate

`npm run prettier`

## how to use

the goal is to be able to resize any image using sharp lib

you will a **assets** folder that contains **full** and **sharped** folders

the **full** folder contains some images that needs to resized so we need to run the server by going to

```
/api/image?image={imageName}&width=${width}&height={height}

```

imageName should be exist at assets/full folder

width should be number

height should be number

then you will see the image in the endpoint you visited and you will find the file exist in assets/shaped/{imageName}

## explaning the src folder

src

```
- controllers /* it contains all router controler files */
- routes      /* it contains all router files           */
- tests       /* it contain the jasmine tests           */
- utils       /* it contains some utility function      */
```
