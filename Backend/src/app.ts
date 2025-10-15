import express, { Request, Response } from 'express';
import router from './Routes/AuthenticationRoutes.js';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 3000;
app.use(cookieParser());

app.use("/api", router);

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
