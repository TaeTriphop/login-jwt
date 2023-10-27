"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponse = void 0;
function createResponse(status = "", message = "", data = null) {
    if (status.toLocaleLowerCase() === "success") {
        return {
            status: status,
            message: message,
            data: data,
        };
    }
    else {
        return {
            status: status,
            message: message,
            data: "",
        };
    }
}
exports.createResponse = createResponse;
