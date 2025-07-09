#!/bin/bash
set -e

echo "📁 Creating AjiriNow folder structure..."

mkdir -p src/{components,pages,hooks,utils,lib,context,routes,assets}

touch src/App.jsx
touch src/main.jsx
touch src/components/index.js
touch src/pages/LandingPage.jsx
touch src/pages/RegisterPage.jsx
touch src/pages/LoginPage.jsx
touch src/hooks/useAuth.js
touch src/context/AuthContext.jsx
touch src/routes/index.js
touch src/utils/api.js
touch src/lib/axios.js
touch src/assets/logo.svg

echo "🛡️ Adding .gitignore..."
echo "node_modules/" > .gitignore
echo "dist/" >> .gitignore
echo ".env" >> .gitignore

echo "🔧 Initializing Git..."
git init
git add .
git commit -m '🎉 Initial project structure with empty files'

echo "✅ Done. You’re ready to build!"

