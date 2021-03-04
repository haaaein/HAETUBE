import express from "express";
import passport from "passport";
import routes from "../routes";
import { 
    getJoin, 
    getLogin, 
    logout, 
    postJoin, 
    postLogin,
    githubLogin,
    postGithubLogIn,
    kakaoLogin,
    postKakaoLogin,
    getMe
} from "../controller/userController";
import { home, search } from "../controller/videoController";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.github, githubLogin);

globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: "/login" }),
  postGithubLogIn
);

globalRouter.get(routes.kakao, kakaoLogin);

globalRouter.get(
  routes.kakaoCallback,
  passport.authenticate("kakao", { failureRedirect: "/login" }),
  postKakaoLogin
);

globalRouter.get(routes.me, getMe);

export default globalRouter;