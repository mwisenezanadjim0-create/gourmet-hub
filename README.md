# Aslan Cafe Luxe & Resto — Gourmet Hub

Welcome to the official repository for the Aslan Cafe Luxe & Resto platform in Kigali.

## ✨ Luxury Branding Rules
To maintain the high-end feel of the brand, please follow these design rules:
- **The 3-Second Rule**: All global transitions are set to 3000ms.
- **Palette**: Use the custom CSS variables:
  - `--gold`: Premium accent color.
  - `--espresso`: Primary dark brown.
  - `--cream`: Background latte shade.
- **Logo**: Use `/aslanlogo.png` for all branding.

## 🚀 Quick Start
1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Start Dev Server**:
   ```bash
   npm run dev
   ```
3. **Build for Production**:
   ```bash
   npm run build
   ```

## 🤝 Collaborative Workflow
To work together effectively:
1. **Pull before you start**: Always run `git pull origin main` before you start working to get the latest changes from your teammate.
2. **Commit often**: Use clear messages like `feat: add new dessert menu item`.
3. **Push your work**: Run `git push origin main` when you finish a task.
4. **Handle Conflicts**: If you both edit the same file, Git will ask you to resolve the "Merge Conflict". Look for the `<<<< HEAD` markers in your code.

## 📁 Project Structure
- `src/routes`: Pages and routing (TanStack Router).
- `src/components`: Reusable UI elements.
- `public/`: Static assets like the logo.
- `src/styles.css`: Global design system and timing rules.
