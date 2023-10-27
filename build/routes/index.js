"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const ping_1 = __importDefault(require("../controllers/ping"));
const login_1 = __importDefault(require("../controllers/login"));
const router = express_1.default.Router();
router.use(body_parser_1.default.json()); // ใช้ body-parser เพื่อ parse request body
const app = (0, express_1.default)();
// Middleware สำหรับอนุญาตการร้องขอจากทุกรูปแบบ
app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
router.get("/ping", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new ping_1.default();
    const response = yield controller.getMessage();
    return res.send(response);
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new login_1.default();
    const response = yield controller.login(req.body);
    return res.send(response);
}));
exports.default = router;
