# Game-Web

Game-Web is a web-based gaming platform built with **Next.js** that offers a seamless and interactive gaming experience. This project is designed to provide users with a wide variety of games, while also offering administrators powerful tools to manage games, policies, and analytics. The platform is built with modern web technologies, ensuring a smooth and responsive user experience.

---

## Features

### User-Facing Features
- **Game Play**: Play a wide variety of games directly in the browser without downloads.
- **Game Categories**: Games are organized into categories for easy navigation.
- **Featured Games**: Highlighted games on the main page for quick access.
- **Social Interaction**: Play with friends and engage in community features.
- **Responsive Design**: Optimized for both desktop and mobile devices.

### Admin Panel Features
- **Add Game**: Easily add new games to the platform.
- **Manage Games**: Edit, update, or remove existing games.
- **Mass Upload Games**: Upload multiple games at once using bulk upload functionality.
- **Edit Pages**: Customize policy pages such as:
  - About Us
  - Contact Us
  - DMCA Policy
  - Privacy Policy
  - Terms of Service
  - Cookies Policy
- **Analytics Dashboard**: Track game plays, user engagement, and other key metrics.
- **Settings Management**:
  - **General Settings**: Configure site name, description, and metadata.
  - **Favicon Settings**: Upload and manage favicons for different platforms (e.g., ICO, PNG, SVG).
  - **User Management**: Manage user roles, promote users, and delete users.
  - **Header and Body Script Management**: Add, edit, and delete scripts for SEO, analytics, and ads.
  - **Ad Management**: Configure Google AdSense and other ad settings for carousel, sidebar, game view, and comment section ads.

---

## Screenshots

### Main Page
![Main Page](https://github.com/user-attachments/assets/135e6afc-a5d8-4bfc-9bca-b7a1891f6315)

### Game Play Page
![Game Play Page](https://github.com/user-attachments/assets/d9da8fef-0996-4099-8ce9-4e6648d16f02)

### Admin Panel - Analytics Dashboard
![Admin Dashboard](https://github.com/user-attachments/assets/2c4ca45d-f6c9-4238-80f5-4a108865e735)

### Admin Panel - Edit Policy Pages
![Edit Policy Pages](https://github.com/user-attachments/assets/486d29c2-24e7-42c7-9586-dd2a83f0a131)

### Admin Panel - Preview Pages Edited
![Preview Pages Edited](https://github.com/user-attachments/assets/14ca8bca-5d48-4068-8e86-e1301c61c6b6)

### Admin Panel - Manage Games
![Manage Games](https://github.com/user-attachments/assets/e88984be-1f08-487d-a799-644118b76fac)

### Admin Panel - Settings Page
![Settings](https://github.com/user-attachments/assets/17827cfe-5b8e-4c1d-84a3-cec17b233811)

### Admin Panel - User Management
![User Management](https://github.com/user-attachments/assets/55a04377-461d-4a7e-9311-69b031368db3)

### Admin Panel - Ads & Scripts Management
![Ads   Scripts Management](https://github.com/user-attachments/assets/4f70948f-202a-430a-aad2-87399c20b0c0)

### Admin Panel - Mass Import
![Mass Import](https://github.com/user-attachments/assets/611c1abd-93cc-4a22-a012-b0c315c8ac53)

---

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Supabase](https://supabase.com/) account for authentication
- [Resend](https://resend.com/) account for sending emails for forgot password
- [Google Adsense](https://www.google.com/adsense) account for integrating ads

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/game-web.git
   cd game-web
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```
3. Set up environment variables:
   - Create a `.env.local` file in the root directory.
   - Add your Supabase credentials and other necessary environment variables:
     ```env
      NEXT_PUBLIC_SUPABASE_URL=
      NEXT_PUBLIC_SUPABASE_ANON_KEY=
      SUPABASE_SERVICE_ROLE_KEY=
      NEXT_PUBLIC_SITE_URL==
      NEXT_PUBLIC_IMAGE_HOST=
      SERVICE_ACCOUNT_KEY=
      PROPERTY_ID=
     ```
4. Start the development server:
   ```sh
   npm run dev  # or yarn dev
   ```
---

## Technologies Used

- **Frontend**: React, Next.js, Tailwind CSS
- **State Management**: Zustand
- **Authentication**: Supabase
- **Charts**: ApexCharts
- **UI Components**: Radix UI, Shadcn UI
- **Editor**: Monaco Editor (for policy page editing)
- **Ad Management**: Google AdSense integration

---

Enjoy building and managing your gaming platform with Game-Web! 🎮

