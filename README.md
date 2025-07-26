# Life Graph App

Visualize your life's journey with highs and lows, connecting your most significant events on an interactive, customizable timeline. Gain insights into your emotional patterns and celebrate your personal growth!

## Features

MVP (Minimum Viable Product)
User Authentication (Frontend UI): User interface for login and registration. (Requires backend integration for full functionality).

Event Creation (Frontend UI): Easily add life events with a date, description, and an emotional valence (positive, negative, or neutral). (Requires backend integration to save data).

Interactive Life Graph: Visualize your events plotted on a graph, showing emotional highs and lows over time.

Initial MVP will use linear connections between events.

Ability to specify the intensity of an event's emotional impact.

Event Management (Frontend UI): User interface to view, edit, and delete your recorded life events. (Requires backend integration to manage data).

Responsive Design: Accessible and usable on various screen sizes.

Planned Enhancements (Post-MVP)
Customizable Graph Curves: Choose different line styles (e.g., smooth splines, steps) to connect events.

Advanced Filtering: Filter events by date range (year, decade, custom).

Rich Event Details: Attach photos, videos, or audio clips to your events.

AI-Powered Insights: Identify recurring emotional patterns, periods of sustained highs or lows, and correlations between event types and emotional impact.

Goal Setting & Tracking: Plot future aspirations on your timeline and track your progress.

Secure Sharing: Option to privately share your graph with trusted individuals (e.g., a therapist or family member).

Data Export: Export your graph as an image (PNG, SVG) or your data as CSV/JSON.

## Tech Stack

Frontend
React: A JavaScript library for building user interfaces.

Vite: A fast build tool that provides an instant server start and lightning-fast HMR (Hot Module Replacement) for React development.

D3.js: A powerful JavaScript library for creating custom, data-driven documents and complex data visualizations, perfect for your unique life graph.

Tailwind CSS (or your preferred CSS framework/approach): For rapid UI development and styling.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

Node.js (LTS version recommended)

npm or Yarn (npm comes with Node.js)

1. Frontend Setup
   Clone the repository:

git clone [your-repo-url]
cd life-graph-app/frontend # or your frontend directory name

Install dependencies:

npm install

### or

yarn install

Create a .env file in the frontend directory. This is where you would typically configure your API base URL when you integrate a backend. For now, you can leave it empty or add a placeholder:

### VITE_API_BASE_URL="http://localhost:5000/api" # Uncomment and adjust when you have a backend

Start the Vite development server:

npm run dev

### or

yarn dev

The frontend application will typically open in your browser at http://localhost:5173 (Vite's default port).

## Security & Privacy

Your personal life data is extremely sensitive. When you integrate a backend and handle user data, remember that privacy and security are paramount.

Data Encryption: Ensure all data in transit and at rest is encrypted.

Strong Authentication: Implement secure password hashing and robust authentication mechanisms.

User Data Ownership: Users should explicitly own their data, with the ability to export and delete it at any time.

Clear Privacy Policy: A comprehensive privacy policy must detail how data is handled.

No Unconsented Data Use: Personal data should never be used for secondary purposes (e.g., marketing, research) without explicit, informed consent.

Compliance: Plan for relevant data protection regulations like GDPR (if targeting EU users).

## Contributing

We welcome contributions! If you have suggestions for features, bug reports, or want to contribute code, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

