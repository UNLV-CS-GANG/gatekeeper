# Notes

Follow step by step to get this running.
## env

Create a .env file in Discord and add the following environment variable.

There should be an example ready.

DATABASE_URL=<URL_HERE>

Thien -- Ensure you have NodeJS installed on your machine first, before doing anything right after. INSTALLED LTS VERSION, NOT CURRENT VERSION. The latest Node 20.0.0 is not fully supported yet. The experimental features are gonna break this project. Recommend using Node 18.16.0 LTS.

-- Enter the visit-or-die folder and run the following commands in order.

1. npm install
2. npm run build
3. npm run dev

---

We will customize more later on, hopefully.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
