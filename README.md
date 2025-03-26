# 🧩 Dappy Quiz Template

## What's This?

This is a template for creating interactive quizzes that can be integrated with the Web4 Apps platform. The template provides a framework for building quizzes on various topics, with examples for animal knowledge and Solidity programming already included.

## ✨ Features

- Fully responsive design for mobile and desktop
- Modern UI
- Multiple-choice question format
- Customizable quiz content
- Ready for Web4 Apps integration

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
├── next.config.js              # Next.js configuration
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

## 🚀 Getting Started

1. Clone this repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) to see your quiz in action!

## 📋 Create Your Own Quiz

1. Create a new JSON file in the `public` directory
2. Follow the schema structure (see existing examples in `public/data.json` and `public/solidity.json`)
3. Update your app to load your custom quiz data

## 🔮 Where to Next?

- Deploy your quiz to the Web4 Apps platform
- Customize the UI to match your brand
- Add more quiz features like timers or difficulty levels
- Share your quizzes with the world!

---

Happy quizzing!
