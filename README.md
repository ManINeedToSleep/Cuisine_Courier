# Cuisine Courier 🍳

A cozy recipe discovery web application built with Next.js, featuring a cabin-inspired design and robust authentication system.

## Tech Stack 🛠

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MySQL with Prisma ORM
- **Authentication**: JWT with HTTP-only cookies
- **Animations**: GSAP
- **Styling**: Tailwind CSS with custom wood textures

## Getting Started 🚀

### Prerequisites
- Node.js
- MySQL server running locally
- npm or yarn

### Installation Steps

1. Clone the repository:

bash
git clone [your-repo-url]
cd cuisine-courier

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
   - Copy `.env.example` to `.env`
   - Update the DATABASE_URL with your MySQL credentials:
```env
DATABASE_URL="mysql://your_username:your_password@localhost:3306/cuisine_courier"
JWT_SECRET="your-super-secret-key"
```

4. Initialize the database:
```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

## Project Structure 📁

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── signup/
│   ├── api/
│   │   └── auth/
│   ├── dashboard/
│   ├── layout.tsx
│   └── page.tsx
├── components/
├── lib/
│   ├── context/
│   ├── types/
│   └── utils/
└── styles/
```

## Features ✨

- User authentication (signup/login/logout)
- Protected routes
- Recipe management
- Collections and categories
- Cozy cabin-inspired UI
- Responsive design
- Animated transitions

## Database Schema 🗄

The application uses the following main models:
- User
- Recipe
- Collection
- Category

## Deployment Instructions 🚀

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

### Database Deployment
1. Set up a MySQL database on your preferred provider (PlanetScale, AWS RDS, etc.)
2. Update the DATABASE_URL in your production environment
3. Run migrations:
```bash
npx prisma migrate deploy
```

## Testing Setup 🧪

1. Install testing dependencies:
```bash
npm install -D jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
```

2. Create jest.config.js:
```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
```

3. Add test scripts to package.json:
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

## API Documentation 📚

### Authentication Endpoints

```typescript
POST /api/auth/signup
{
  "email": string,
  "password": string,
  "name": string
}

POST /api/auth/login
{
  "email": string,
  "password": string
}

POST /api/auth/logout
```

### Recipe Endpoints

```typescript
GET /api/recipes
Query params:
  - page: number
  - limit: number
  - category?: string
  - search?: string

POST /api/recipes
{
  "title": string,
  "description": string,
  "ingredients": string[],
  "instructions": string[],
  "cookingTime": number,
  "servings": number,
  "imageUrl"?: string,
  "categoryIds": number[]
}

GET /api/recipes/:id

PUT /api/recipes/:id

DELETE /api/recipes/:id
```

### Collection Endpoints

```typescript
GET /api/collections
POST /api/collections
{
  "name": string,
  "description"?: string
}

GET /api/collections/:id
PUT /api/collections/:id
DELETE /api/collections/:id
```

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📝

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
```

[PRISMA.md](PRISMA.md)

