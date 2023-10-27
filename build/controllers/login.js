"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsoa_1 = require("tsoa");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const users = [
    {
        username: "john_doe",
        password: "password123",
        name: "John Doe",
        email: "john.doe@example.com",
    },
    {
        username: "jane_doe",
        password: "password456",
        name: "Jane Doe",
        email: "jane.doe@example.com",
    },
    {
        username: "tae",
        password: "123456",
        name: "Tae",
        email: "Tae.za@example.com",
    },
    // เพิ่มข้อมูลผู้ใช้เพิ่มเติมตามต้องการ
];
let LoginController = class LoginController {
    login(body) {
        return __awaiter(this, void 0, void 0, function* () {
            // ตรวจสอบชื่อผู้ใช้และรหัสผ่านจาก body.username และ body.password
            const user = users.find((u) => u.username === body.username && u.password === body.password);
            if (!user) {
                return {
                    status: false,
                    message: "Login failed",
                    token: "",
                };
            }
            else {
                const token = generateToken(body.username);
                return {
                    status: true,
                    message: "Login success",
                    token,
                };
            }
        });
    }
};
__decorate([
    (0, tsoa_1.Post)("/"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "login", null);
LoginController = __decorate([
    (0, tsoa_1.Route)("login"),
    (0, tsoa_1.Tags)("Login") // เพิ่ม decorator Tags เพื่อกำหนดหมวดหมู่
], LoginController);
exports.default = LoginController;
function generateToken(username) {
    const payload = { username: username };
    const secretKey = process.env.JWT_SECRET_KEY;
    const jwtToken = jwt.sign(payload, secretKey, { expiresIn: "1h" });
    return jwtToken;
}
