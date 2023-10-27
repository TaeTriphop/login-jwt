import express from "express";
import bodyParser from "body-parser";
import PingController from "../controllers/ping";
import LoginController from "../controllers/login";

const router = express.Router();
router.use(bodyParser.json()); // ใช้ body-parser เพื่อ parse request body

const app = express();

// Middleware สำหรับอนุญาตการร้องขอจากทุกรูปแบบ
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


router.get("/ping", async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});

router.post("/login", async (req, res) => {
  const controller = new LoginController();
  const response = await controller.login(req.body);
  return res.send(response);
});


export default router;