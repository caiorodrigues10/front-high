interface AppResponse {
  message: string;
  result: string | "success" | "error";
  statusCode: number;
  data?: any;
}

interface AppResponseNew<T> {
  message: string;
  result: string | "success" | "error";
  statusCode: number;
  data?: T;
}
export type { AppResponse, AppResponseNew };
