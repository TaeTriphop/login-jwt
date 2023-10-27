import { Get, Route } from "tsoa";
import { createResponse } from "./responseHelper";
const jwt = require("jsonwebtoken");
interface PingResponse {
  message: string;
}

@Route("ping")
export default class PingController {
  @Get("/")
  public async getMessage(): Promise<PingResponse> {
    const response = createResponse("success", "hello");
    return response
  }
}
