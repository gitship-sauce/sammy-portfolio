# Sammy's portfolio

A portfolio website with an admin page, built with AI in the Gitship Sauce video
"Build a portfolio with admin access, for real". Live at https://sammy-gitship.vercel.app

Each chapter of the video has a git tag. Check out the tag to get the code exactly as it was at
the end of that chapter. If you follow along with your own AI chat, your code will differ a
little; these tags are Sammy's exact code.

| Tag | Chapter |
| --- | --- |
| `ch3-plan` | The requirements and the rules for Claude, before any code |
| `ch4-pages` | Home page, project page and contact links, with sample projects |
| `ch5-admin` | Projects saved in a database, plus an admin page to add, edit and delete them |

> **`ch5-admin` has a security hole on purpose.** It's the one found in chapter 6. Run it on your
> own computer only; never put it online.

## Run it on your computer

You need Node.js 20 or newer, pnpm, and a free [Neon](https://neon.com) account.

1. **Get the code:** `pnpm install`
2. **Create the database:** in Neon, create a project. On its dashboard, click **Connect** and
   copy the connection string.
3. **Fill in your settings:** copy `.env.example` to a new file called `.env.local`, then put in
   the connection string, the email and password you want for the admin page, and a session
   secret (the command to make one is in the file).
4. **Create the table:** `pnpm db:setup`
5. **Start it:** `pnpm dev`, then open http://localhost:3000

Log in at http://localhost:3000/admin with the email and password from `.env.local`. To get
Sammy's three projects, add them there with the pictures in `sample-pictures/`.
