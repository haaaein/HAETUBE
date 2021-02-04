/**
 * 서버를 생성하고 route를 생성하고 그리고 그것에 응답하는 방식.
 * express와 node.js로 할 수 있음.
 * helmet은 보안을 위한 것.
 */

import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./Routers/userRouter";
import videoRouter from "./Routers/videoRouter";
import globalRouter from "./Routers/globalRouter";
import routes from "./routes";
const app = express();

//use는 누군가가 접속하면 이 router 전체를 사용하겠다는 의미
app.set("view engine", "pug");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true }));
app.use(helmet());
app.use(morgan("dev"));

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;