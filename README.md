# Cuisine Courier 🍳

A modern recipe discovery and management application built with Next.js 14, Prisma, and MySQL. Discover, save, and organize your favorite recipes with a beautiful wood-themed UI.

## Features 🌟

### Authentication & Security
- Secure user signup and login system
- JWT-based session management with HTTP-only cookies
- Password encryption with bcrypt
- Protected routes with middleware

### Recipe Management
- Browse recipes from TheMealDB API
- Advanced search functionality
- Category-based filtering
- Detailed recipe information:
  - Ingredients and measurements
  - Step-by-step instructions
  - Difficulty indicators
  - Cuisine type
  - Category
  - Source links
- Favorite recipes functionality

### User Experience
- Responsive wood-textured UI design
- GSAP-powered animations
- Loading states and skeletons
- Modal-based recipe viewing
- Favorite recipe management
- Quick access dashboard

## Tech Stack 💻

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- GSAP for animations
- Heroicons
- Framer Motion
  - Heroicons

### Backend
- Next.js API Routes
- Prisma ORM
- MySQL
- JSON Web Tokens
- bcrypt for password hashing

### Development
- ESLint
- PostCSS
- TypeScript
- Prisma CLI

## Getting Started 🚀

1. Clone the repository:

bash
git clone https://github.com/yourusername/cuisine-courier.git
cd cuisine-courier

2. Install dependencies:

bash
npm install

3. Set up your database:

### Using MySQL Workbench
1. Download and install [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)
2. Open MySQL Workbench and create a new connection
3. Create a new schema (database):
   ```sql
   CREATE DATABASE cuisine_courier;
   ```
4. Set up your environment variables:
   ```env
   # Create a .env file with:
   DATABASE_URL="mysql://user:password@localhost:3306/cuisine_courier"
   JWT_SECRET="your-secret-key"
   ```
   Replace `user`, `password`, and `cuisine_courier` with your MySQL credentials and database name.

### Using PostgreSQL
```env
DATABASE_URL="mysql://user:password@localhost:3306/cuisine_courier"
JWT_SECRET="your-secret-key"
```

4. Initialize the database:
```bash
# Run Prisma migrations
npx prisma migrate dev

# Seed the database
npm run db:seed
```

5. Start the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see your application.

## Project Structure 📁

```
cuisine-courier/
├── src/
│   ├── app/                 # Next.js 14 app directory
│   │   ├── (auth)/         # Authentication routes
│   │   ├── api/            # API routes
│   │   └── dashboard/      # Protected routes
│   ├── components/         # Reusable components
│   ├── lib/               # Utilities and services
│   └── styles/            # Global styles
├── prisma/                # Database schema and migrations
└── public/               # Static assets
```

## API Integration 🔌

This project uses TheMealDB API for recipe data. The integration is handled through the `mealDBService` utility, providing:
- Random recipe fetching
- Search functionality
- Category-based filtering
- Detailed recipe information

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
- [ ] Social sharing features
- [ ] Personal recipe creation
- [ ] Shopping list generation
- [ ] Meal planning calendar
- [ ] Nutritional information
- [ ] Mobile app version

## License 📝

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments 🙏

- TheMealDB for their comprehensive recipe API
- Next.js team for the amazing framework
- Prisma team for the excellent ORM
- All contributors and users of the application
