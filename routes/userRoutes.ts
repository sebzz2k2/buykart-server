import { Router } from "express";
import passport from 'passport';
import { registerUser, loginUser, getUser, updateUser, deleteUser } from "../controller/user.controller";

// import { protect } from "../middleware/auth.middleware";

const router: Router = Router();

router.get("/get-user", passport.authenticate("jwt", { session: false }), getUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update", passport.authenticate("jwt", { session: false }), updateUser);
router.delete("/delete", passport.authenticate("jwt", { session: false }), deleteUser);

export { router };

