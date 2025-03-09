import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/Auth";
import confessionRouter from "./routes/Confessions";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

app.use("/", confessionRouter);
app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
