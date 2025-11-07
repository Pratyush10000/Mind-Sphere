# MindSphere

A comprehensive mental health assessment platform that helps users track their anxiety, depression, and stress levels through personalized questionnaires and insights.

## 🌟 Features

- **Mental Health Assessments**: Complete comprehensive questionnaires to evaluate anxiety, depression, and stress levels
- **Personalized Insights**: Receive detailed assessments and recommendations based on your responses
- **Progress Tracking**: View your assessment history and track your mental wellness journey over time
- **Secure Authentication**: User accounts with secure authentication via Supabase
- **Responsive Design**: Beautiful, modern UI that works seamlessly on all devices
- **Real-time Results**: Get instant feedback and recommendations after completing assessments

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account (for backend services)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mind-sphere
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

4. Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## 📦 Build for Production

```bash
npm run build
```

The production build will be created in the `dist` directory.

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Supabase** - Backend and authentication
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Zod** - Schema validation
- **React Query** - Data fetching and caching

## 📁 Project Structure

```
mind-sphere/
├── public/          # Static assets
├── src/
│   ├── components/  # React components
│   │   ├── ui/      # UI component library
│   │   └── ...      # Other components
│   ├── pages/       # Page components
│   ├── hooks/       # Custom React hooks
│   ├── integrations/ # External service integrations
│   │   └── supabase/ # Supabase client and types
│   ├── lib/         # Utility functions
│   ├── App.jsx      # Main app component
│   └── main.jsx     # Entry point
├── supabase/        # Supabase migrations
└── package.json
```

## 🔐 Authentication

MindSphere uses Supabase for user authentication. Users can:
- Sign up with email and password
- Sign in to existing accounts
- Access protected routes after authentication

## 📊 Assessment System

The platform includes a comprehensive mental health questionnaire that evaluates:
- **Anxiety Levels**: Based on frequency of anxious feelings and worries
- **Depression Levels**: Based on mood, interest, and sleep patterns
- **Stress Levels**: Based on overwhelm, concentration, and physical symptoms

After completing an assessment, users receive:
- Detailed scores for each category
- Overall assessment and recommendations
- Actionable steps to improve mental wellness

## 🎨 Customization

The project uses Tailwind CSS for styling. You can customize:
- Colors in `src/index.css` (CSS variables)
- Theme configuration in `tailwind.config.js`
- Component styles in individual component files

## 📝 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. For questions or support, please contact the project maintainers.

## 📧 Support

For support, please open an issue in the repository or contact the development team.

## 🙏 Acknowledgments

Built with modern web technologies and best practices for mental health applications.

---

**MindSphere** - Taking control of your mental wellness journey.
