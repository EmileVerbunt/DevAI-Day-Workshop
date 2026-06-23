# DevAI Day Workshop

Master AI-powered coding with GitHub Copilot through hands-on exercises and real-world examples.

**🚀 [Start the Workshop](https://emileverbunt.github.io/DevAI-Day-Workshop/)**

## Overview

This workshop provides a comprehensive learning experience for GitHub Copilot, covering everything from basic code completion to advanced features like the Coding Agent. It's designed for developers who want to leverage AI assistance throughout their development workflow.

## Features

- **Interactive Learning Paths**: Choose from beginner-friendly or advanced learning tracks
- **Hands-on Exercises**: Practical exercises with real code examples
- **Step-by-Step Guidance**: Clear instructions with screenshots and code snippets
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark/Light Mode**: Toggle between themes for comfortable reading

## Learning Paths

### Path 1: Start Coding with AI

Learn IDE-based Copilot features through hands-on exercises. Perfect for developers new to AI-assisted coding.

**Topics Covered:**
1. Project Setup with Codespaces
2. Code Completion
3. Copilot Chat
4. Agent Mode
5. End-to-End App Development
6. Plan Mode
7. Add Functionality
8. Add Unit Tests
9. Add Documentation
10. Custom Agents (Optional)

### Path 2: Copilot Pro Features

Explore advanced Copilot features for professional development workflows.

**Topics Covered:**
1. Create Repos with Coding Agent
2. Plan & Design with Custom Agents
3. Develop with Coding Agent
4. Copilot Instructions Setup
5. PR Generation & Code Review
6. Copilot Spaces
7. Agent Mission Control

### Path 3: Extended Copilot Capabilities

Go beyond the IDE and explore the broader Copilot ecosystem — CLI, SDK, agent extensibility, and memory. Ideal for developers who have completed Path 1 or Path 2.

**Topics Covered:**
1. Copilot CLI
2. Copilot SDK
3. Agent Skills
4. Sub-Agents
5. Copilot Memory

### Path 4: Spec-Driven Development

Write specs first, then let Copilot plan, break down tasks, and implement. An advanced track for experienced developers, blending spec-driven concepts with GitHub Spec Kit.

**Topics Covered:**
1. What is Spec-Driven Development?
2. Writing Specs with Copilot
3. Introducing GitHub Spec Kit
4. The Spec Kit Workflow (`/speckit.specify`, `/speckit.plan`, `/speckit.tasks`, `/speckit.implement`)
5. Hands-on: Build a Feature Spec-First

### Path 5: Agentic Workflows

Build AI-powered automation with GitHub Agentic Workflows (`gh-aw`) — natural-language markdown compiled into hardened GitHub Actions. An advanced, hands-on track.

**Topics Covered:**
1. What are Agentic Workflows?
2. Installing gh-aw & Workflow Anatomy
3. Triggers, Permissions & Safe-Outputs
4. Compiling & Running
5. Hands-on: Build an Issue-Triage Agent

## Prerequisites

A core setup applies to every path (GitHub account, an activated **GitHub Copilot license**, **VS Code** with the GitHub Copilot and Copilot Chat extensions, and **Git**). Individual paths add their own extras (e.g., the GitHub CLI, Node.js/Python, `uv`, or a repo with Actions enabled).

- **Visual Studio Code** installed on your machine
- **GitHub Copilot license** activated
- **GitHub account** set up and ready to use

> 📋 Share the **[full prerequisites page](devai-day-workshop/prerequisites.html)** with attendees in advance — it lists the core requirements, per-path specifics, and a "verify your setup" command checklist.

## Getting Started

### Option 1: Access Online

Visit the workshop at **[https://emileverbunt.github.io/DevAI-Day-Workshop/](https://emileverbunt.github.io/DevAI-Day-Workshop/)** - no installation required!

### Option 2: Local Development

1. Clone this repository:
   ```bash
   git clone <REPOSITORY_URL>
   ```

2. Navigate to the project directory:
   ```bash
   cd DevAI-Day-Workshop
   ```

3. Open `index.html` in your browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   ```

4. Open `http://localhost:8000` in your browser.

## Project Structure

```
DevAI-Day-Workshop/
├── index.html                      # Main landing page
├── README.md                       # This file
└── devai-day-workshop/
    ├── prerequisites.html          # Attendee prerequisites (core + per-path)
    ├── start-coding.html           # Path 1: Start Coding with AI
    ├── pro-features.html           # Path 2: Copilot Pro Features
    ├── extended-capabilities.html  # Path 3: Extended Copilot Capabilities
    ├── spec-driven-development.html # Path 4: Spec-Driven Development
    ├── agentic-workflows.html      # Path 5: Agentic Workflows
    ├── codelab.json                # Workshop metadata
    ├── css/
    │   └── styles.css              # Stylesheet
    ├── js/
    │   └── main.js                 # JavaScript functionality
    └── img/                        # Screenshots and images
```

## Additional Resources

- [GitHub Copilot Documentation](https://docs.github.com/copilot)
- [GitHub Copilot Best Practices](https://docs.github.com/copilot/using-github-copilot/best-practices-for-using-github-copilot)
- [Awesome Copilot Repository](https://github.com/github/awesome-copilot)

## Contributing

Contributions are welcome! If you'd like to improve the workshop:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add new content'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## License

This project is provided for educational purposes as part of the GitHub Universe Recap 2025 Jakarta Indonesia workshop. No specific license has been designated.
