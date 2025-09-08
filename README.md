# 🗂️ My Own Ticketing Tool

Hi! 👋 This is a side project I built to **learn Next.js in depth**.  
It's mainly for learning purposes, so sorry if some commits are a bit messy 😅.

This app is a **Kanban-style board (similar to Trello)** where you can:
- ✅ Create multiple **Columns**
- ✅ Create, edit, and delete **Tickets**
- ✅ Drag & drop tickets between columns
- ✅ Filter tickets by any information

---

## 🚀 Tech Stack

- [Next.js](https://nextjs.org/) + React (App Router)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/) with SQLite
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [next-intl](https://next-intl-docs.vercel.app/) for i18n

---
## 📝 Learning Roadmap

### Core Features
- [x] Create the Login screen
- [ ] Create the Board screen loading Tickets from SQLite
- [ ] Implement CRUD for Tickets
- [ ] Add filtering options on the Board screen

### Authentication
- [ ] Add Auth with email & password
- [ ] Add Auth with Google

### Testing
- [ ] Write Unit tests (Vitest)
- [ ] Write E2E tests (Playwright)

### Extras
- [ ] Implement i18n
- [ ] Toggle between dark and light theme

---

## 🌐 Live Demo

👉 [Check it on Vercel](https://my-own-ticketing-tool.vercel.app)

---

## 🛠️ Local Development

Clone the repo and run the development server:

```bash
git clone https://github.com/hernantomassini/my-own-ticketing-tool.git
cd my-own-ticketing-tool

npm install
npm run dev
# or yarn dev / pnpm dev / bun dev
