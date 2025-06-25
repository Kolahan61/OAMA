# BJJ Academy Website

A modern website for a Brazilian Jiu-Jitsu academy built with Next.js 14, TypeScript, and Tailwind CSS. The project is prepared for integration with the Mindbody API for class schedules and customer logins.

## Features

- 🥋 Modern, responsive design
- 📅 Class schedule display (currently using mock data)
- 👤 Member login preparation
- 🎨 Built with Tailwind CSS for easy styling
- ⚡ Next.js 14 with App Router
- 🔒 Environment variable setup for API keys

## Prerequisites

Before you begin, ensure you have installed:
- Node.js 18.17 or later
- npm or yarn package manager

## Installation

1. Install Node.js from [nodejs.org](https://nodejs.org/) if you haven't already

2. Install dependencies:
```bash
npm install
```

3. Set up your Mindbody API credentials:
   - Open `.env.local` file
   - Replace `YOUR_API_KEY_GOES_HERE` with your actual Mindbody API key

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                # Next.js app router pages
│   ├── layout.tsx      # Root layout with header/footer
│   ├── page.tsx        # Homepage
│   └── schedule/       # Schedule page
│       └── page.tsx
├── components/         # React components
│   ├── ui/            # Generic UI components
│   ├── layout/        # Layout components (Header, Footer)
│   ├── ClassCard.tsx  # Individual class display
│   └── ClassSchedule.tsx # Schedule container
├── lib/               # Utilities and API
│   └── mindbody.ts    # Mindbody API integration
└── styles/            # Global styles
    └── globals.css
```

## Available Scripts

- `npm run dev` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm run start` - Runs the built app in production mode
- `npm run lint` - Runs the linter

## Mindbody API Integration

The project is set up for Mindbody API integration. Currently using mock data in `src/lib/mindbody.ts`. To connect to the real API:

1. Add your Mindbody API key to `.env.local`
2. Update the functions in `src/lib/mindbody.ts` to make actual API calls
3. Adjust the data types as needed based on the Mindbody API response

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **date-fns** - Date formatting
- **lucide-react** - Icon library

## License

This project is private and proprietary. 