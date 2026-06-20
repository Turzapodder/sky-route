# SkyRoute — Flight Search & Booking Aggregator

A production-grade flight search and booking frontend application built with modern React, TypeScript, and TailwindCSS. It provides a seamless, dynamic user experience with features like infinite scroll, complex filtering, and a multi-step booking flow.

## Packages & Tech Stack

The application leverages a carefully selected modern tech stack to ensure performance, maintainability, and a premium user experience:

- **React 19 & TypeScript 5**: Core UI framework with strict type safety for robust development.
- **Vite 6**: Lightning-fast build tool and development server.
- **TailwindCSS 4**: Utility-first CSS framework for rapid, responsive UI development.
- **Zustand**: A small, fast, and scalable bearbones state-management solution.
- **React Hook Form**: Performant, flexible, and extensible forms with easy-to-use validation.
- **Zod**: TypeScript-first schema declaration and validation library (used alongside React Hook Form).
- **Framer Motion**: Powerful animation library used for micro-animations, layout transitions, and the booking modal.
- **Lucide React**: Beautiful, consistent icon set.
- **date-fns**: Modern JavaScript date utility library.

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+ (or yarn/pnpm)

### Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### Development
Start the Vite development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### Production Build
To create a production-ready bundle and preview it:
```bash
npm run build
npm run preview
```

## Folder Architecture

The project follows a feature-based, scalable architecture:

```text
src/
├── api/           # Simulated API services (flightService, bookingService)
├── components/    # Reusable React components grouped by feature domain
│   ├── booking/   # Booking flow components (Modal, Passenger Form, Confirmation)
│   ├── layout/    # Structural components (Header, Sidebar, Navigation)
│   ├── results/   # Display components (FlightCard, FlightTable, Infinite Scroll, Filters)
│   ├── search/    # Search form and inputs (Airport autocomplete, Date picker)
│   └── ui/        # Generic, reusable UI atoms (Button, Badge, Skeleton, Modal)
├── hooks/         # Custom React hooks (e.g., useIntersectionObserver)
├── lib/           # Utility functions, formatting, constants, airport data
├── store/         # Zustand state management stores
├── types/         # Global TypeScript interfaces & types
├── data/          # flights.json (Mock database)
├── pages/         # High-level page components (views)
├── App.tsx        # Root application component
└── main.tsx       # React DOM entry point
```

## Form Handling & Validation

Forms in SkyRoute, particularly the complex multi-passenger booking forms, are handled using a combination of **React Hook Form** and **Zod**.

1. **Schema Definition**: We define a strict schema using Zod (e.g., `passengerSchema`) that enforces rules like required fields, email format, minimum name length, and valid passport numbers.
2. **Integration via Resolver**: The `@hookform/resolvers/zod` package bridges Zod with React Hook Form, allowing the form to use the schema for real-time validation.
3. **Performance**: React Hook Form registers inputs without forcing full re-renders on every keystroke, keeping the UI highly responsive even with multiple passenger forms rendered simultaneously.
4. **Error Handling**: Validation errors are automatically caught and displayed beneath the respective inputs with styled error messages.

## Mock Data & API Simulation

Since there is no actual backend, the application simulates a real-world API experience:

1. **The Database**: We use a static `flights.json` file located in `src/data/` or imported directly. It contains an array of flight objects (origin, destination, airlines, prices, stops, etc.).
2. **The Service Layer**: Files like `src/api/flightService.ts` act as our backend. When the UI requests flights, it calls `searchFlights(params)`.
3. **Simulation**: 
   - **Latency**: The service uses a `delay(ms)` utility to simulate network latency (e.g., waiting 800ms to resolve).
   - **Logic**: It performs actual filtering (by stops, refundability), sorting (cheapest, fastest), and pagination entirely in memory before resolving the Promise.
4. **Infinite Scroll**: The mock API handles paginated requests, which the UI consumes using an Intersection Observer (`useIntersectionObserver`), revealing new results smoothly.

## State Management

Application state is decoupled from the UI components using **Zustand**, split into modular domains:

1. **`useSearchStore`**: Manages the global search parameters (origin, destination, dates, passengers) and active filters/sort controls. It also manages the UI view mode (Cards vs. Table).
2. **`useFlightStore`**: Handles the asynchronous fetching of flights. It stores the `flights` array, derived `airlines` summary data, and loading/error states.
3. **`useBookingStore`**: Manages the multi-step booking modal state (selected flight, current step, passenger details) and handles the final booking confirmation payload.

## Other Technical Essentials

- **Infinite Scrolling**: Implemented using a custom `useIntersectionObserver` hook. Skeletons are shown conditionally while the mock API "fetches" the next page of results.
- **View Toggling**: Users can switch seamlessly between a rich `FlightCard` layout and a condensed `FlightTable` layout without losing data or scroll position.
- **Animations**: `framer-motion` is used to orchestrate list staggering (when flight cards load in), modal pop-ups, and step transitions in the booking flow, providing a premium, fluid aesthetic.
- **Accessibility**: Built with semantic HTML, proper ARIA roles for custom controls (like the view toggles and rating chips), and keyboard navigation support.
