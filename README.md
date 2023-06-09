# 🚧 Work In Progress 🚧

## Overview

When it comes to private events, it becomes a tedious process to have to verify each guest by reading through a list of names. So we provide a full-stack app solution, called **Gatekeeper**.

**Gatekeeper** enables users to manage who is allowed into their private events by sending invitation links to authorized guests. Upon acceptance, a unique QR code is generated and sent to the guest. Then this QR code can be validated within our database by a Verifier, a system that can scan QR codes to check if the individual is authorized.

Overall, **Gatekeeper** makes for a simple, efficient, and reliable validation process.

---

## Milestones

- `[x]` Setup Clerk signup/login auth
- `[x]` Setup database schema w/ Prisma
- `[x]` Setup page where user can configure an Event
- `[ ]` Setup public page where one can accept an invite for some Event
- `[ ]` Generate a unique QR code that is emailed to the invitee
- `[ ]` Setup Verifier side that can scan QR codes for a specific event
- `[ ]` Flesh out UI styling

---

## Running the app

Recommend using Node 18.16.0 LTS (- Thien)

1. Create a .env file from Discord
2. Open the project and run the following:
	```bash
	npm install
	npm run dev
	```
3. Open [http://localhost:3000](http://localhost:3000) to view the app.
