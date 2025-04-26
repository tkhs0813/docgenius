# DocGenius

AI-powered documentation generator for your codebase.

## Example Output

The generated documentation will be saved in the output directory. For example:

- [Example](./output)

## Features

- Automatically generates comprehensive documentation for your codebase
- Supports multiple programming languages and frameworks
- Generates both development guides and setup guides
- Supports English and Japanese output
- Uses Google's Gemini 2.5 Pro model for high-quality documentation

## Usage

Basic usage:

```bash
npx docgenius --apiKey YOUR_API_KEY
```

Change output directory:

```bash
# default ./output
npx docgenius --apiKey YOUR_API_KEY --output ./docgenius-output
```

With language selection:

```bash
# English (default)
npx docgenius --apiKey YOUR_API_KEY

# Japanese
npx docgenius --apiKey YOUR_API_KEY --language ja
```

### Arguments

- `apiKey`: Your Google GenAI API key
- `output`: Directory where the generated documentation will be saved
- `language`: Output language (optional, default: 'en')
  - `en`: English
  - `ja`: Japanese

## Output

The tool generates two main documents:

1. `development.md`: Comprehensive development guide

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
tsx ./src/index.ts --apikey YOUR-API-KEY
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
