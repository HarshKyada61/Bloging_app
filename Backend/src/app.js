import express from 'express';
import blogRouter from './routers/blog.js';
import userRouter from './routers/user.js';
import commentRouter from './routers/comment.js';
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors());
app.use(blogRouter);
app.use(userRouter);
app.use(commentRouter);

export default app;