# Mosano Frontend

## Technologies Used

### Core Framework

- **React 19** - JavaScript library for building user interfaces
- **TypeScript** - Type-safe JavaScript superset
- **Vite** - Next-generation frontend build tool
- **React Router 7** - Client-side routing and navigation

### Features & Libraries

- **i18next** - Internationalization (i18n) framework for multi-language support
- **React Hook Form** - Efficient form state management
- **React Toastify** - Toast notifications
- **Day.js** - Lightweight date manipulation library

### Development Tools

- **TypeScript 6** - Static type checking
- **ESLint 10** - Code linting and quality
- **Vite** - Fast development server with HMR (Hot Module Replacement)

## Project Structure

```
src/
├── api/                      # API constants
├── assets/                   # Static assets (images, styles, etc.)
├── components/               # Reusable React components
│   ├── birthdayGreeting/     # Birthday greeting component
│   ├── button/               # Button component
│   ├── datePicker/           # Date picker component
│   ├── header/               # Header component
│   ├── input/                # Input field component
│   ├── navLink/              # Navigation link component
│   ├── requiredSymbol/       # Required field indicator
│   ├── select/               # Select dropdown component
│   ├── spinner/              # Loading spinner component
│   ├── table/                # Data table component
│   └── MainLayout.tsx        # Main layout wrapper
├── contexts/                 # React Context for global state
│   ├── AuthContext.tsx       # Authentication state
│   ├── CountriesContext.tsx  # Countries data
│   ├── LanguageContext.tsx   # Language/localization state
│   └── VisitorsContext.tsx   # Visitors data management
├── hooks/                    # Custom React hooks
├── pages/                    # Page components
│   ├── home/                 # Home/dashboard page
│   └── revisited/            # Revisited visitors page
├── utils/                    # Utility functions
├── App.tsx                   # Main application component
└── main.tsx                  # Application entry point
```

## How to Install and Use

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd mosano/frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables** (if needed)

   ```bash
   cp .env.example .env
   ```

### Development (you need to have the backend running)

Start the development server with hot module replacement (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build locally

## Multi-Language Support

The application uses i18next for internationalization. Language files are located in the public directory and can be extended to support additional languages.
