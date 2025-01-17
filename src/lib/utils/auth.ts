// Authentication utilities - where the magic happens!
// Warning: Contains actual magic. Handle with care.

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Makes passwords go POOF into gibberish
export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 12); // 12 rounds of hashing - because 11 is too little and 13 is too much
}

// Checks if the password matches the gibberish
export async function verifyPassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
}

// Creates a magical token that lets users stay logged in
export function generateToken(userId: number) {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '7d' });
}

// Checks if the magical token is still valid
// If it returns null, someone tried to forge the cookie...
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
  } catch {
    return null; // Nice try, hacker! 😎
  }
} 