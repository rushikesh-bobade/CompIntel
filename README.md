# CompIntel

<div align="center">
  <h3>Don't guess your worth. Know it precisely.</h3>
  <p>The most accurate, verified compensation intelligence platform for the Indian tech market.</p>
</div>

---

## ⚡ Overview

CompIntel is a highly advanced, full-stack Next.js application designed to provide top-tier compensation intelligence. Unlike generic salary boards, CompIntel enforces strict, leveling-based comparisons (L3 through L7) ensuring that you are always comparing apples to apples when evaluating job offers.

It features industry-grade aesthetics, an interactive 3D particle system, flawless Light/Dark mode transitions, and deep integration with Groq AI to act as your personal negotiation expert.

## 🚀 Key Features

- **Level-Based Indexing**: Strict adherence to engineering levels (L3-L7) across all companies for highly accurate market alignments.
- **Interactive Scatter Plots**: Built with `recharts`, visualize the compensation curve (Total Comp vs Years of Experience) for any company instantly.
- **AI Negotiation Playbooks**: Input an offer and our Groq AI engine will cross-reference it against our verified database to generate a personalized, step-by-step negotiation script.
- **Smart Comparisons**: Put two offers head-to-head. CompIntel calculates base, stock, and bonus differences with AI-driven verdicts.
- **Top-Tier Architecture**: Built on Next.js 14 (App Router), Tailwind CSS v4, Prisma, PostgreSQL, and React Three Fiber.
- **Flawless UI/UX**: Premium `zinc` design system with dynamic, glassmorphic UI elements and native Light/Dark themes.

## 🛠 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router, Server Actions)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Database:** PostgreSQL managed via [Prisma ORM](https://www.prisma.io/)
- **AI Engine:** [Groq](https://groq.com/) API (`llama-3.1-8b-instant`)
- **3D Graphics:** [Three.js](https://threejs.org/) & [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/)
- **Data Viz:** [Recharts](https://recharts.org/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🏗 Local Development

### 1. Clone the repository
```bash
git clone https://github.com/rushikesh-bobade/CompIntel.git
cd CompIntel
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add the following:
```env
# PostgreSQL Database URL
DATABASE_URL="postgresql://postgres:password@localhost:5432/compensation_intel?schema=public"

# Groq API Key for AI Integration
GROQ_API_KEY="your_groq_api_key_here"
```

### 4. Setup Database
Initialize the Prisma schema and seed the database with realistic market data:
```bash
npx prisma db push
npx prisma db seed
```

### 5. Start the Development Server
```bash
npm run dev
```
Navigate to `http://localhost:3000` to view the application.

## 📄 License

This project is licensed under the MIT License.
