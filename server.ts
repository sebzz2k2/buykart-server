import express, { Request, Response } from "express";
import dotenv from "dotenv";
import passport from 'passport';
import { connect } from "./config/db";
import { router as userRoutes } from "./routes";

import passportStrategy from "./config/passport";

const app = express();

dotenv.config();
connect();

passportStrategy(passport);
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(userRoutes);

app.get("/", (req: Request, res: Response) => {
   res.json({ status: "ok" });
});


const PORT: any = process.env.PORT || 5000;

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});