Hey, I have some notes I want to say

1- sorry the previous time I provided invalid urlParams at README.md file which was ?image={imageName} instadeOf filename={filename} so `my bad`, the new one is:

```
/api/image?filename={imageName}&width={width}&height={height}  /* to resize images */
```

2- about jasmine tests

I forget to handle if the output folder(shrpped folder) doesn't exist: so I made a condition if it doesn't exist It will be created

3- I modified the package.json file as you asked

4- I modified .eslintrc to remove the typescript syntax error
