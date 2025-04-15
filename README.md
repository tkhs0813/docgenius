# DocGenius

AI-powered documentation generator for your codebase.

## Features

- Automatically generates comprehensive documentation for your codebase
- Supports multiple programming languages and frameworks
- Generates both development guides and setup guides
- Supports English and Japanese output
- Uses Google's Gemini 2.5 Pro model for high-quality documentation

## Usage

Basic usage:

```bash
npx docgenius <api-key> <output-directory>
```

With language selection:

```bash
# English (default)
npx docgenius <api-key> <output-directory>

# Japanese
npx docgenius <api-key> <output-directory> ja
```

### Arguments

- `api-key`: Your Google GenAI API key
- `output-directory`: Directory where the generated documentation will be saved
- `language`: Output language (optional, default: 'en')
  - `en`: English
  - `ja`: Japanese

## Output

The tool generates two main documents:

1. `development.md`: Comprehensive development guide
2. `setup.md`: Setup and installation guide

## Requirements

- Node.js v20 or later
- Google GenAI API key

## Development

### Setup

```bash
git clone https://github.com/your-username/docgenius.git
cd docgenius
npm install
```

### Starting Development Server

```bash
npm run dev --apikey YOUR-API-KEY
```

## Limitations

- Currently only supports Gemini 2.5 Pro model
- Does not support other AI models or versions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- Google GenAI (especially Gemini 2.5 Pro)
- Mermaid.js
- Authors of other dependency libraries

## License

MIT
