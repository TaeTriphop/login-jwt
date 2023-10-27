import { Post, Route, Body, Tags } from "tsoa";
import { createResponse } from "./responseHelper";
const dotenv = require("dotenv");

dotenv.config();
const jwt = require("jsonwebtoken");


interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  status:boolean;
  message: string;
  token: string;
}

type User = {
  username: string;
  password: string;
  name: string;
  email: string;
};

const users: User[] = [
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

@Route("login")
@Tags("Login") // เพิ่ม decorator Tags เพื่อกำหนดหมวดหมู่
export default class LoginController {
  @Post("/")
  public async login(
    @Body() body: LoginRequest
  ): Promise<LoginResponse | null> {
    // ตรวจสอบชื่อผู้ใช้และรหัสผ่านจาก body.username และ body.password

    const user = users.find(
      (u) => u.username === body.username && u.password === body.password
    );

    if (!user) {
      return {
        status: false,
        message: "Login failed",
        token: "",
      };
    } else {
      const token = generateToken(body.username);
      return {
        status: true,
        message: "Login success",
        token,
      };
    }
  }
}

function generateToken(username: string): string {
  const payload = { username: username };
  const secretKey = process.env.JWT_SECRET_KEY;

  const jwtToken = jwt.sign(payload, secretKey, { expiresIn: "1h" });

  return jwtToken;
}
