# Text Enhancer Extension

A browser extension that uses AI model running locally on Ollama to improve your text's grammar, spelling, and clarity with a simple right-click.

## Features

-   Enhance selected text from any input field
-   Uses local Ollama API for privacy

## Setup

1. Install [Ollama](https://ollama.ai/) for macOS, Linux, or Windows (preview)

2. Pull a model:
   ```bash
   # For smaller, faster models:
   ollama pull gemma2:2b
   
   # Alternative models (choose one):
   ollama pull llama3.1
   ollama pull phi3
   ollama pull mistral
   ```

3. Start the server:
   ```bash
   ollama serve
   ```

## Installation

### Chrome

-   Go to `chrome://extensions/`
-   Enable "Developer mode"
-   Click "Load unpacked" and select the extension directory

## Usage

1. Select text in any input field
2. Right-click and select "Enhance with Ollama"
3. Wait briefly for your text to be enhanced

## Project Structure

```
Directory structure:
└── ollama_enhancer_extension/
    ├── package.json
    ├── webpack.config.js
    ├── .babelrc
    ├── extension/
    │   ├── background.js
    │   ├── background.js.LICENSE.txt
    │   ├── content.js
    │   ├── manifest.json
    │   └── icons/
    └── src/
        ├── background/
        │   └── index.js
        ├── content/
        │   └── index.js
        └── utils/
            └── domHelpers.js
```
