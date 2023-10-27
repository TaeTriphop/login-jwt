export function createResponse(
  status: string = "",
  message: string = "",
  data: any = null
): { status: string; message: string; data: any } {
  if (status.toLocaleLowerCase() === "success") {
    return {
      status: status,
      message: message,
      data: data,
    };
  } else {
    return {
      status: status,
      message: message,
      data: "",
    };
  }
}
