# MovieBox - Movie Recommendations

A movie recommendations website built with React, TypeScript, Chakra UI, and React Router.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** - Build tool
- **Chakra UI v3** - Component library
- **React Router v7** - Client-side routing
- **Axios** - HTTP client
- **Vitest** + **React Testing Library** - Testing
- **OMDb API** - Movie data

## Getting Started

### Prerequisites

- Node.js 20+
- npm 9+

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
VITE_OMDB_API_KEY=your_api_key_here
```

You can get a free API key at [omdbapi.com](http://www.omdbapi.com/apikey.aspx).

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Testing

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with coverage
npm run test:coverage
```

## Project Structure

```
src/
├── components/
│   ├── comments/       # Comment form & list
│   ├── favorites/      # Favorite button
│   ├── layout/         # Header, layout components
│   ├── movie/          # Movie card, grid, search
│   └── rating/         # Star rating component
├── hooks/              # Custom React hooks
├── mocks/              # Mock data for development
├── pages/              # Page components (Home, Detail)
├── services/           # API client & localStorage helpers
├── test/               # Test setup
├── theme/              # Chakra UI custom theme
└── types/              # TypeScript type definitions
```

## Future Improvements

- Integrate with OMDb API for real movie search
- Add pagination for search results
- Add loading states and error handling
- Implement user authentication
- Backend API for persisting comments
- Add movie trailers (YouTube integration)
- Responsive image optimization with lazy loading
- E2E tests with Playwright
- Deploy to Vercel
- Accessibility improvements (ARIA labels, keyboard navigation)
- Add movie recommendations based on user favorites

## Time Invested

~4 hours
