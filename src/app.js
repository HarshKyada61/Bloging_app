import express from 'express';
import blogRouter from './routers/blog.js';
import userRouter from './routers/user.js';

const app = express();
app.use(express.json());
app.use(blogRouter);
app.use(userRouter);

export default app;