import express from "express";
import routes from "../routes";
import {
    userDetail,
    changePassword,
    getEditProfile,
    postEditProfile
} from "../controller/userController";
import {  uploadAvatar, onlyPrivate } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;

/**
 * M data
 * V how does the data look
 * C function that looks for the data
 */