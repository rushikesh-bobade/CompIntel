<div align="center">
  <img src="https://raw.githubusercontent.com/rushikesh-bobade/CompIntel/main/src/app/icon.png" width="100" height="100" alt="CompIntel Logo">
  <h1>CompIntel</h1>
  <p><b>The most accurate, verified compensation intelligence platform for the Indian tech market.</b></p>
  
  <p>
    <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql" alt="PostgreSQL" />
    <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma" alt="Prisma" />
    <img src="https://img.shields.io/badge/Groq_AI-F56565?style=for-the-badge" alt="Groq AI" />
  </p>
</div>

---

## ⚡ Overview

CompIntel is a highly advanced, full-stack Next.js application designed to provide top-tier compensation intelligence. Unlike generic salary boards, CompIntel enforces strict, leveling-based comparisons (L3 through L7) ensuring that engineers are always comparing apples to apples when evaluating job offers.

It features industry-grade aesthetics, an interactive 3D particle system, flawless Light/Dark mode transitions, and deep integration with **Groq AI** to act as your personal negotiation expert.

## ✨ High-Impact Features

| Feature | Description |
| :--- | :--- |
| **📈 Interactive Scatter Plots** | Built with `recharts`, visualize the compensation curve (Total Comp vs Years of Experience) for any company instantly to spot outliers. |
| **🤖 AI Negotiation Playbooks** | Input an offer and our Groq AI engine will cross-reference it against our verified database to generate a personalized email script for you to send to your recruiter. |
| **⚖️ Smart Offer Comparison** | Put two offers head-to-head. CompIntel calculates base, stock, and bonus differences and generates an AI verdict on which offer provides better long-term leverage. |
| **🌌 3D Particle Canvas** | A custom WebGL background built with `@react-three/fiber` that renders a massive constellation of data nodes, responding dynamically to Light/Dark modes. |
| **🔐 Verified Anonymity** | Built-in database layers that keep user submissions entirely anonymous while enforcing strict data validation to prevent polluted datasets. |

## 📐 Architecture & Structure

The codebase is organized in a highly modular, App-Router-first pattern.

```text
compIntel/
├── prisma/
│   ├── schema.prisma       # Database schema and models
│   └── seed.ts             # 85+ realistic hand-crafted seed records
├── src/
│   ├── app/                # Next.js 14 App Router
│   │   ├── api/            # Backend REST endpoints (AI, DB queries)
│   │   ├── companies/      # Dynamic company routing & analytics
│   │   ├── compare/        # Offer comparison logic
│   │   ├── negotiate/      # AI playbook generator UI
│   │   └── salaries/       # Main data table view
│   ├── components/         # Reusable Client & Server components
│   │   ├── Background3D.tsx# WebGL Particle System
│   │   ├── ChatWidget.tsx  # Floating AI assistant
│   │   └── SalaryScatterPlot.tsx # Recharts integration
│   ├── lib/                # Utility functions & Singletons
│   │   ├── normalize.ts    # String & math normalizers
│   │   ├── prisma.ts       # Global Prisma client
│   │   └── validators.ts   # Zod schemas for API validation
│   └── types/              # TypeScript interfaces
└── tailwind.css            # Tailwind v4 theme configuration
```

## 🛠️ Getting Started

Follow these steps to deploy CompIntel locally on your machine.

### Prerequisites
- Node.js 18.x or later
- A local or remote PostgreSQL database instance
- A [Groq API Key](https://console.groq.com/) for the AI features

### 1. Clone the repository
```bash
git clone https://github.com/rushikesh-bobade/CompIntel.git
cd CompIntel
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add your credentials:
```env
# PostgreSQL Database URL
DATABASE_URL="postgresql://postgres:password@localhost:5432/compensation_intel?schema=public"

# Groq API Key for AI Integration (Required for Chat, Compare, and Negotiate features)
GROQ_API_KEY="gsk_your_api_key_here"
```

### 4. Database Setup
Push the schema to your database and seed it with the baseline Indian Tech compensation data:
```bash
npx prisma db push
npx prisma db seed
```

### 5. Run the Application
```bash
npm run dev
```
Navigate to `http://localhost:3000` to view the application.

## 🎨 Design System

CompIntel utilizes a bespoke **Glassmorphic Zinc** design system. 
- All cards and buttons use custom CSS blurs (`pro-card`, `pro-button`) defined in `globals.css`.
- Financial metrics strictly adhere to `tabular-nums` for perfect horizontal alignment.
- Tailwind v4 `@custom-variant dark` is explicitly configured to ensure the native OS themes don't conflict with the `next-themes` application toggle.

## 🤝 Contributing

Contributions are always welcome! If you'd like to improve the UI, add new data visualization charts, or enhance the AI prompts, feel free to open a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
