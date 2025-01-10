export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegistration extends UserLogin {
  name: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
} 