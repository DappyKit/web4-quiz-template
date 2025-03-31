# 🧩 Dappy Quiz Template

## What's This?

This is a template for creating interactive quizzes that can be integrated with the Web4 Apps platform. The template provides a framework for building quizzes on various topics, with examples for animal knowledge and Solidity programming already included.

## ✨ Features

- Fully responsive design for mobile and desktop
- Modern UI
- Multiple-choice question format
- Customizable quiz content
- Ready for Web4 Apps integration
- Farcaster integration out of the box

## 🌐 What is Web4 Apps?

This project follows the [Web4 Apps Specification](https://github.com/DappyKit/web4-apps-specification) and can be imported into the [Web4 Apps platform](https://github.com/DappyKit/web4-apps). Web4 Apps is a platform that enables decentralized applications in a user-friendly ecosystem.

## 📂 Project Structure

```
├── app/                        # Next.js app directory
│   ├── components/             # React components
│   ├── layout.tsx              # Main layout component
│   ├── page.tsx                # Homepage component
│   └── globals.css             # Global styles
├── public/                     # Static files
│   ├── data.json               # Animal quiz data
│   ├── solidity.json           # Solidity quiz data
│   └── favicon.ico             # Site favicon
├── schema.json                 # JSON Schema for quiz data validation
├── .eslintrc.json              # ESLint configuration
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This documentation
```

## 📝 Schema

The project uses a JSON schema to validate quiz data structures:

```json
{
  "type": "object",
  "properties": {
    "name": { 
      "type": "string" 
    },
    "description": { 
      "type": "string" 
    },
    "questions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "text": { "type": "string" },
          "options": {
            "type": "array",
            "items": { "type": "string" }
          }
        }
      }
    }
  }
}
```

This schema ensures your quiz data is properly structured with a name, description, and questions with multiple-choice options.

## 🛠️ Technologies

- **Next.js** - React framework for building the UI
- **TypeScript** - For type-safe code
- **JSON Schema** - For validating quiz data
- **Web4 Apps Integration** - For seamless deployment to the Web4 Apps platform
- **Farcaster** - Native integration with Farcaster social protocol

## 🚀 Getting Started

1. Clone this repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) to see your quiz in action!

## 📋 Create Your Own Quiz

1. Create a new JSON file in the `public` directory
2. Follow the schema structure (see existing examples in `public/data.json` and `public/solidity.json`)
3. Update your app to load your custom quiz data

## 🚢 Deployment

### Vercel (Easiest Method)

1. Push your repository to GitHub
2. Visit [Vercel](https://vercel.com) and sign up or login
3. Click "New Project" and import your repository
4. Vercel will automatically detect Next.js and apply the correct build settings
5. Click "Deploy" and your quiz will be live in seconds

### Netlify

1. Push your repository to GitHub
2. Visit [Netlify](https://netlify.com) and sign up or login
3. Click "New site from Git" and select your repository
4. Set build command to: `npm run build`
5. Set publish directory to: `out`
6. Click "Deploy site"

### Manual Build and Deploy

#### Static Export (For any static hosting)

1. Build the static site:
   ```bash
   npm run build
   ```
2. The `out` directory will contain all static files for deployment
3. Upload the contents of the `out` directory to your web hosting service

#### Test Locally

Test your static build locally before deployment:
```bash
npx serve out
```

#### Hosting on Your Own Server

1. Upload all files from the `out` directory to your web server
2. Configure your web server to:
   - Serve `index.html` for the root path
   - Set proper MIME types for JavaScript and CSS files
   - (Optional) Configure caching headers for static assets

## 🔮 Where to Next?

- Deploy your quiz to the Web4 Apps platform
- Customize the UI to match your brand
- Add more quiz features like timers or difficulty levels
- Share your quizzes with the world!
- Leverage the built-in Farcaster integration to share your quizzes on Farcaster

---

Happy quizzing!
