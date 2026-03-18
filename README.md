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
- **json placeholder** - Comments

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

## Future Improvements

- Implement user authentication (so comments have an owner)
- Backend API for persisting comments
- Add movie trailers
- Responsive image optimization with lazy loading