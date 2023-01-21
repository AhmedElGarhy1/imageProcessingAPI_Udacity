import express from 'express';

// import routes
import routes from './routes/index.js';

// the app
const app = express();

// routes
app.use(routes);

// listening with port
const PORT = 8000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

// for testing
export default app;
