# Next.js Express Middleware Application

This is a modern web application built with [Next.js 15](https://nextjs.org) that demonstrates the use of Next.js API Route Handlers for building robust APIs. The application includes authentication, database management with Prisma, and form validation, all implemented using Next.js's native API routing capabilities.

## Features

- 🔐 Authentication system with JWT
- 📊 Database management with Prisma
- ✅ Form validation using Zod
- 🚀 Express-like middleware pattern for API routes

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm, yarn, or pnpm package manager
- A database (the application is configured to work with Prisma)

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd next-express-middleware
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up your environment variables: Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="your-database-url"
JWT_SECRET="your-jwt-secret"
JWT_EXPIRY="your-jwt-expiry-in-secs" # e.g., "86400" for 1 day
```

4. Set up the database:

```bash
# Generate Prisma client
npm run prisma:generate
# or
yarn prisma:generate

# Run database migrations
npm run prisma:migrate
# or
yarn prisma:migrate
```

5. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code linting
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio for database management

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page component
├── prisma/                # Prisma schema and migrations
├── public/                # Static assets
└── types.d.ts            # TypeScript type definitions
```

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Zod Documentation](https://zod.dev)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
