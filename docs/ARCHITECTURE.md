# Architecture Overview

## Hybrid Enterprise Platform
This platform represents a unified entity: **GEM Cybersecurity & Alliance Trust Realty**.

### Core Stack
- **Frontend:** Next.js 16+ (App Router)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Language:** TypeScript

### Route Architecture
- `/` - Unified Homepage
- `/services` - Solutions Hub (Cyber & Trust divisions)
- `/intelligence` - Canonical Intelligence Hub (Threat feed)
- `/about-us` - Combined Mission & Leadership
- `/contact-us` - Unified Contact Form
- `/qfs` - Quantum Financial System Section
- `/cyber-sentinel-trust` - Zero Trust Section
- `/bridge/alliance-trust` - Partner Integration Page

### Backend API
Next.js Server Actions and API Routes:
- `app/api/contact/route.ts` - Handles contact submissions via Nodemailer.
- `app/api/newsletter/route.ts` - Handles newsletter subscriptions.
