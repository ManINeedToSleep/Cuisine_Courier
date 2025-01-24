# Cuisine Courier 🍳

A modern recipe discovery and management application built with Next.js 14, Prisma, and MySQL.

## Features 🌟

### Authentication
- Secure user authentication with NextAuth
- Session management
- Protected routes

### Recipe Discovery
- Browse recipes from TheMealDB API
- Search functionality
- Category filtering
- Detailed recipe modal with:
  - Ingredients list
  - Step-by-step instructions
  - Difficulty indicators
  - YouTube video tutorials (when available)
  - Source links
- Favorite recipes functionality

### User Interface
- Responsive design
- Modern glass-morphism UI
- Dynamic loading states
- Error handling
- Smooth animations
- Mobile-friendly layout

## Tech Stack 💻

- **Frontend**:
  - Next.js 14 (App Router)
  - React
  - Tailwind CSS
  - TypeScript
  - Heroicons

- **Backend**:
  - Next.js API Routes
  - Prisma ORM
  - MySQL Database

- **Authentication**:
  - NextAuth.js
  - Session-based authentication

- **External APIs**:
  - TheMealDB API

## Getting Started 🚀

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cuisine-courier.git
cd cuisine-courier
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
```env
DATABASE_URL="mysql://user:password@localhost:3306/cuisine_courier"
JWT_SECRET="your-super-"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

## Database Schema 📊

```prisma
model User {
  id          Int          @id @default(autoincrement())
  email       String       @unique
  password    String    
  name        String
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  recipes     Recipe[]     @relation("UserRecipes")
  favorites   Recipe[]     @relation("UserFavorites")
  collections Collection[]
}

model Recipe {
  id            String        @id
  name          String
  thumbnail     String
  category      String
  area          String
  instructions  String
  createdBy     User?        @relation("UserRecipes", fields: [userId], references: [id])
  userId        Int?
  favoritedBy   User[]       @relation("UserFavorites")
  collections   Collection[]  @relation("RecipeCollections")
  categories    Category[]
  favorites     Favorite[]
}

// ... other models
```

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Future Enhancements 🔮

- [x] Recipe saving functionality
- [ ] Personal recipe collections
- [ ] Recipe ratings and reviews
- [ ] Social sharing features
- [ ] Meal planning calendar
- [ ] Shopping list generation
- [ ] Dietary restriction filters
- [ ] Recipe scaling functionality
- [ ] Print-friendly recipe views
- [ ] Mobile app version

## License 📝

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments 🙏

- TheMealDB for their comprehensive recipe API
- Next.js team for the amazing framework
- Prisma team for the excellent ORM
- All contributors and users of the application


[View Prisma Schema Documentation](PRISMA.md) (For LP)

