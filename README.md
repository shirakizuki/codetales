# CodeTales

CodeTales is a digital book and comic platform that originated in the Philippines as a project for Literature 11. This interactive application brings stories and comics to life in a digital format, making literature more accessible and engaging for readers.

## About the Project

CodeTales started as a solo project with the goal of modernizing the way literature is consumed and experienced. By combining traditional storytelling with digital innovation, CodeTales creates an immersive reading experience for users of all ages.

### Features

- **Digital Library**: Browse a collection of books and comics
- **Story Mode**: Read stories with interactive elements
- **Comic Viewer**: Experience comics with enhanced digital features
- **Responsive Design**: Enjoy content on any device
- **Filipino Literature Focus**: Highlighting works from Philippine authors and artists

## Technical Details

This project is built with:

- React 18
- TypeScript
- Vite (for fast development)
- React Router (for navigation)

### Route Structure

- `/library/list_all` - Browse all available books and comics
- `/story/element_id=:id/:title/:filters?` - View a specific story
- `/comic/element_id=:id/:title/:filters?` - View a specific comic
- `/about` - Learn more about CodeTales

## Development

### Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/codetales.git
   cd codetales
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

### Build for Production

```bash
npm run build
```

## Original Vite Template Information

This project was bootstrapped with Vite's React TypeScript template.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### ESLint Configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules.

## License

[MIT](LICENSE)

## Contact

For questions or feedback about CodeTales, please open an issue in this repository.