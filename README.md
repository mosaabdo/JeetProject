# Jeet Badki Portfolio

High-performance, single-page professional portfolio for Civil Engineer Jeet Badki and upcoming firm InfraToday.

## Tech Stack
- **HTML5**: Semantic and accessible.
- **Tailwind CSS**: Utility-first styling with custom configuration.
- **Vanilla JavaScript**: Lightweight interactivity and smooth scrolling.

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Build CSS**:
   ```bash
   npm run build
   ```

3. **Watch for Changes** (Development):
   ```bash
   npm run watch
   ```

4. **Serve**:
   Open `index.html` in any modern browser or use a live server extension.

## Structure
- `src/input.css`: Main CSS entry point (Tailwind directives).
- `dist/output.css`: Compiled CSS (do not edit directly).
- `index.html`: Main content file.
- `script.js`: Interactive logic (scrolling, form sanitization).

## Customization
- **Colors**: Edit `tailwind.config.js` to change the `primary`, `secondary`, or `accent` colors.
- **Content**: Update the HTML sections directly. Images currently use placeholders.

## Security
- External links use `rel="noopener noreferrer"`.
- Form inputs are sanitized in JS before processing (mock submission).
