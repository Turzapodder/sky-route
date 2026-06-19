# SkyRoute — Flight Search & Booking Aggregator

A production-grade flight search and booking frontend application built with modern React, TypeScript, and TailwindCSS.

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI framework with concurrent features |
| TypeScript 5 | Strict type safety throughout |
| Vite 6 | Build tool and dev server |
| TailwindCSS 4 | Utility-first styling |
| Zustand | Lightweight state management |
| React Router 7 | Client-side routing |
| React Hook Form + Zod | Form handling and validation |
| Framer Motion | Animations and transitions |
| Lucide React | Icon library |
| date-fns | Date utilities |

## Getting Started

### Prerequisites

- Node.js 18+ and npm 9+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## Architecture

```
src/
├── api/           # Mock API service layer (simulated async)
├── types/         # TypeScript interfaces & enums
├── store/         # Zustand state management stores
├── hooks/         # Custom React hooks
├── components/
│   ├── layout/    # AppLayout, Sidebar, Header, MobileNav
│   ├── search/    # SearchForm, AirportInput (autocomplete)
│   ├── results/   # FlightResults, FlightCard, AirlineChips, Sort/Filter
│   ├── booking/   # BookingModal, PassengerForm, Confirmation
│   └── ui/        # Button, Badge, Skeleton, Modal, EmptyState, ErrorState
├── pages/         # Page-level components
├── lib/           # Utilities, constants, airport data
└── data/          # flights.json mock data (42 flights, 8 airlines)
```

## Features

### Flight Search
- Search by origin, destination, date, and passenger count
- Airport autocomplete with keyboard navigation
- Trip type selection (One Way / Round Trip / Multi City)
- Swap origin and destination

### Results & Filtering
- Sort by: Cheapest, Fastest, Departure time, Duration
- Filter by: Airline (chip carousel), Stops (Direct/1 Stop/2 Stops), Refundable
- Airline quick-filter chips showing minimum prices
- Clear all filters
- Results count with airline count
- Expandable flight detail cards with route visualization

### Booking Flow
- 3-step modal: Flight Summary → Passenger Details → Confirmation
- Per-passenger form with real-time Zod validation
- Simulated booking with PNR generation
- Success confirmation with copy-to-clipboard PNR

### UX & Accessibility
- Responsive design (mobile, tablet, desktop)
- Dark sidebar navigation with collapse toggle
- Loading skeletons, empty states, error states with retry
- Keyboard navigable (Tab, Enter, Escape, Arrow keys)
- ARIA labels, roles, and live regions
- Skip-to-content link
- Focus visible indicators
- Semantic HTML throughout

## Mock Data

The application uses `src/data/flights.json` containing 42 flights across 8 airlines on the DAC → IST route, each with:
- Airline info (code, name, logo URL)
- Departure/arrival times and airports
- Duration, stops count, stop details
- Pricing (total fare, commission, agent fare)
- Tags (cheapest, fastest, refundable, partial payment)

## State Management

Three Zustand stores manage application state:

1. **useSearchStore** — Search parameters, filters, sort option, view mode
2. **useFlightStore** — Flight results, loading/error states, airline summaries
3. **useBookingStore** — Selected flight, booking step, passenger info, confirmation

## License

MIT
