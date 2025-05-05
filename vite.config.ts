import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"
import { copyFileSync, mkdirSync, existsSync, readdirSync, type PathLike } from 'fs'

// Function to copy directory recursively
function copyDir(src: PathLike, dest: PathLike) {
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }
  
  const entries = readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src as string, entry.name);
    const destPath = path.join(dest as string, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'copy-src-folder',
      closeBundle() {
        // Copy src directory to dist/src
        const srcDir = path.resolve(__dirname, './src');
        const destDir = path.resolve(__dirname, './dist/src');
        copyDir(srcDir, destDir);
        console.log('✅ Source files copied to dist/src');
      }
    }
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
    }
  }
})
