import express from "express";
import { checkSignin, getAllUsers, getUser, signin, signup } from "../controllers/auth.js";
const routerAuth = express.Router();

routerAuth.post("/signup", signup);
routerAuth.post("/very-signin", signin);
routerAuth.post("/signin", checkSignin);
routerAuth.get("/:userId", getUser);
routerAuth.get("/", getAllUsers);





export default routerAuth;
