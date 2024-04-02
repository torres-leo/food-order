This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Prisma Commands

These commands are useful tools for managing and interacting with your database in a Prisma-based Node.js application.

`npx prisma migrate dev`: This command is used for managing database migrations in your Prisma project. Migrations are a way to make changes to your database schema over time while keeping track of those changes in a systematic manner. When you run npx prisma migrate dev, Prisma will generate migration files based on the changes you've made to your Prisma schema file (schema.prisma). These changes might include creating new tables, modifying existing tables, adding or removing columns, etc. The dev flag is used to indicate that you're working in a development environment.

`npx prisma db seed`: This command is used to seed your database with initial data. Seeding is the process of populating your database with predefined data that you can use for testing or to initialize your application with some default data. When you run npx prisma db seed, Prisma executes the seed script defined in your Prisma schema file (schema.prisma) if you have defined any. This script typically contains instructions to insert specific data into your database tables.

`npx prisma studio`: This command launches Prisma Studio, which is a graphical user interface (GUI) tool provided by Prisma for interacting with your database. Prisma Studio allows you to view and manage your database data visually. You can browse through your tables, view individual records, make changes to the data, and perform other database-related tasks. It provides a convenient way to inspect and manipulate your database without having to write SQL queries manually.