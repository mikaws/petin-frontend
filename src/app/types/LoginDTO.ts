export interface LoginHTTPRequestBody {
  email: string;
  password: string;
}

export interface LoginHTTPResponse {
  status: 200;
  data: {
    id: string;
    email: string;
  };
  error?: string;
}
