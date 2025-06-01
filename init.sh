#!/bin/bash

# Step 1: Initialize Vite project
npm create vite@latest . --template react-ts

# Step 2: Install Tailwind CSS and related dependencies
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Step 3: Update index.css
cat > ./src/index.css <<EOL
@tailwind base;
@tailwind components;
@tailwind utilities;
EOL

# Step 4: Update Tailwind configuration
cat > tailwind.config.js <<EOL
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOL

# Step 5: Update tsconfig.json
cat > tsconfig.json <<EOL
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.node.json"
    }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
EOL

# Step 6: Update tsconfig.app.json
cat > tsconfig.app.json <<EOL
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
    // ...
  }
}
EOL

# Step 7: Install TypeScript node types
npm install -D @types/node

# Step 8: Update Vite configuration
cat > vite.config.ts <<EOL
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
EOL

# Step 9: Initialize ShadCN
npx shadcn@latest init

echo "Project setup complete!"
