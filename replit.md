# AccessiPDF - AI-Powered Document Accessibility Platform

## Overview

AccessiPDF is a web application that automatically analyzes and fixes accessibility issues in PDF documents using AI. The platform transforms inaccessible documents into fully accessible ones by adding semantic structure, proper tags, form labels, and generating audio summaries. Built as a full-stack TypeScript application with React frontend and Express backend, it aims to make essential documents like bank statements and medical bills accessible to screen reader users.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming support
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation via @hookform/resolvers

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Session Management**: Express sessions with PostgreSQL storage via connect-pg-simple
- **Build System**: ESBuild for production builds, TSX for development

### Data Storage Solutions
- **Primary Database**: PostgreSQL configured through Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless) for serverless PostgreSQL
- **Schema Management**: Drizzle Kit for migrations and schema management
- **In-Memory Storage**: Fallback MemStorage class for development/testing with user management

### Authentication and Authorization
- **Session-based Authentication**: Express sessions with PostgreSQL persistence
- **User Schema**: Simple username/password model with UUID primary keys
- **Storage Interface**: Abstracted IStorage interface supporting both in-memory and database implementations

### Development and Build Configuration
- **Monorepo Structure**: Shared schema and types between client/server in `/shared` directory
- **Development Server**: Vite dev server with HMR integrated into Express
- **Path Aliases**: TypeScript path mapping for clean imports (@/, @shared/, @assets/)
- **Error Handling**: Replit runtime error overlay for development
- **Code Quality**: TypeScript strict mode with comprehensive type checking

## External Dependencies

### Core Frameworks and Runtime
- **React Ecosystem**: React 18, React DOM, React Hook Form, TanStack Query
- **Backend**: Express.js, Node.js with TypeScript support
- **Build Tools**: Vite, ESBuild, TSX for development runtime

### Database and ORM
- **Database**: PostgreSQL via Neon Database serverless driver
- **ORM**: Drizzle ORM with Drizzle Kit for schema management
- **Validation**: Zod for runtime type validation and schema generation

### UI and Styling
- **Component Library**: Radix UI primitives with Shadcn/ui components
- **Styling**: Tailwind CSS with PostCSS and Autoprefixer
- **Icons**: Lucide React icon library
- **Utilities**: clsx and tailwind-merge for conditional styling

### Development Tools
- **Type Checking**: TypeScript with strict configuration
- **Session Storage**: connect-pg-simple for PostgreSQL session storage
- **Development**: Replit-specific plugins for error handling and development environment
- **Routing**: Wouter for lightweight client-side routing

### Accessibility and UX
- **Date Handling**: date-fns for date manipulation and formatting
- **Carousel**: Embla Carousel React for interactive UI components
- **Command Interface**: cmdk for command palette functionality
- **Utility Classes**: class-variance-authority for component variant management