# Contributing to Gemini AI Starter Template

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Your environment (OS, Node version, browser)

### Suggesting Features

Feature requests are welcome! Please:
- Check existing issues first to avoid duplicates
- Clearly describe the feature and its use case
- Explain why it would benefit the project

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed
4. **Test your changes**
   - Ensure the app builds: `npm run build`
   - Test in development: `npm run dev`
5. **Commit with clear messages**
   ```bash
   git commit -m "Add: feature description"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Open a Pull Request** with a clear description

## 📝 Code Style

- Use TypeScript for type safety
- Follow the existing code formatting
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Keep components focused and reusable

## 🧪 Testing

Currently, this project doesn't have automated tests. When adding features:
- Manually test image generation
- Manually test video generation
- Test error handling scenarios
- Verify responsive design

## 📜 Code of Conduct

- Be respectful and constructive
- Welcome newcomers and help them learn
- Focus on what's best for the project
- Show empathy towards other community members

## 🎯 Development Setup

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env.local`
3. Add your `GEMINI_API_KEY`
4. Run dev server: `npm run dev`

## 🚀 Release Process

Maintainers will handle releases. Contributors don't need to worry about versioning.

## 📫 Questions?

Feel free to:
- Open a discussion on GitHub
- Comment on related issues
- Reach out to maintainers

Thank you for contributing! 🙌
