import express from 'express';

const getHome = (req: express.Request, res: express.Response): void => {
  res.send(`
<h2 style="text-align: center">
  Hey can you go to 
  <a href="/api/image?name=encenadaport&width=300&height=300">here</a>
  to see a sharped image
</h2>`);
};

export { getHome };
