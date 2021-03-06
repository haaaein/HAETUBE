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
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import path from "path";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import userRouter from "./Routers/userRouter";
import videoRouter from "./Routers/videoRouter";
import globalRouter from "./Routers/globalRouter";
import apiRouter from "./Routers/apiRouter";

import passportConfig from "./passport";

const app = express();

const CookieStore = MongoStore(session);

//use는 누군가가 접속하면 이 router 전체를 사용하겠다는 의미
app.use(helmet( { contentSecurityPolicy: false } ));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(morgan("dev"));
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection })
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;