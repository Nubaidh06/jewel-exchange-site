<!-- BEGIN:nextjs-agent-rules -->
# Next.js Guidelines
This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Strict Workspace Rules

## Browser Subagent & Automated Chrome Testing Prohibition
- **NEVER** launch the `browser_subagent` tool or open the Chrome browser for automated testing/verification unless explicitly commanded by the user in that prompt.
- Do not run browser sessions automatically after code edits. Verify using terminal tools (curl/builds) or ask the user to verify in their own browser.
