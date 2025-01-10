export type User = {
  id: number
  email: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface UserLogin {
  email: string
  password: string
}

export interface UserSignup {
  name: string
  email: string
  password: string
} 