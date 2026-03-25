# Cloudflare AI Chat Starter Template

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/mikeschlottig/nexuslms-next-generation-ai-powered-learning-platform)

A production-ready full-stack AI chat application built with **Cloudflare Workers**, **Durable Objects**, and **Cloudflare AI Gateway**. Features multi-session conversations, real-time streaming, tool calling (web search, weather, custom MCP tools), and a modern React UI.

## ✨ Key Features

- **Multi-Session Chat**: Persistent chat sessions with titles, timestamps, and activity tracking
- **AI-Powered Conversations**: Integration with Gemini models via Cloudflare AI Gateway
- **Streaming Responses**: Real-time message streaming for natural chat experience
- **Tool Calling**: Built-in tools for web search (SerpAPI), weather, and extensible MCP tools
- **Model Switching**: Switch between Gemini 2.5 Flash/Pro/2.0 on-the-fly
- **Responsive UI**: Modern React app with Tailwind CSS, Shadcn/UI components, and dark mode
- **Session Management**: Create, list, update, delete sessions via REST API
- **Type-Safe**: Full TypeScript with Workers types and Zod validation
- **Production-Ready**: Error handling, logging, CORS, health checks, and observability

## 🛠️ Technology Stack

- **Backend**: Cloudflare Workers, Hono, Durable Objects (Agents SDK), OpenAI SDK
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Shadcn/UI, TanStack Query
- **AI/ML**: Cloudflare AI Gateway (Gemini models), SerpAPI, Model Context Protocol (MCP)
- **State Management**: Zustand, React Query
- **UI/UX**: Lucide icons, Framer Motion, Sonner toasts
- **Dev Tools**: Bun, ESLint, Wrangler CLI

## 🚀 Quick Start

### Prerequisites
- [Bun](https://bun.sh/) installed (`curl -fsSL https://bun.sh/install | bash`)
- Cloudflare account with Workers enabled
- Cloudflare AI Gateway setup (for `@vars.CF_AI_BASE_URL`)
- Optional: SerpAPI key for web search

### Installation
```bash
bun install
```

### Configuration
Copy `wrangler.jsonc` and update environment variables:
```json
{
  "vars": {
    "CF_AI_BASE_URL": "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai",
    "CF_AI_API_KEY": "your-gateway-api-key",
    "SERPAPI_KEY": "your-serpapi-key",
    "OPENROUTER_API_KEY": "optional-openrouter-key"
  }
}
```

Generate types:
```bash
bun run cf-typegen
```

### Local Development
```bash
bun dev
```
Opens at `http://localhost:3000` (or `$PORT`).

### Production Build
```bash
bun run build
```

## 📖 Usage

### Chat Sessions API
All chat endpoints under `/api/chat/{sessionId}`:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/sessions` | GET | List all sessions |
| `/api/sessions` | POST | Create new session `{ title?, firstMessage? }` |
| `/api/sessions/{id}` | DELETE | Delete session |
| `/api/sessions/{id}/title` | PUT | Update title `{ title }` |
| `/api/chat/{sessionId}/messages` | GET | Get chat state |
| `/api/chat/{sessionId}/chat` | POST | Send message `{ message, model?, stream? }` |
| `/api/chat/{sessionId}/clear` | DELETE | Clear messages |
| `/api/chat/{sessionId}/model` | POST | Update model `{ model }` |

### Frontend
- New chat: Creates session automatically
- Switch models: Dropdown in UI
- Streaming: Real-time typing effect
- Sessions sidebar: Manage chats

## 🔧 Development Workflow

1. **Edit UI**: Modify `src/pages/HomePage.tsx` and components in `src/components/`
2. **Add Tools**: Extend `worker/tools.ts` or MCP servers in `worker/mcp-client.ts`
3. **Custom Routes**: Add to `worker/userRoutes.ts`
4. **AI Prompts**: Update system message in `worker/chat.ts`
5. **Lint & Type Check**:
   ```bash
   bun lint
   bun tsc --noEmit
   ```
6. **Hot Reload**: `bun dev` supports HMR for frontend and worker

## ☁️ Deployment to Cloudflare

1. **Login**:
   ```bash
   wrangler login
   ```

2. **Deploy**:
   ```bash
   bun run deploy
   ```

3. **Configure Secrets** (required for production):
   ```bash
   wrangler secret put CF_AI_API_KEY
   wrangler secret put SERPAPI_KEY  # Optional
   ```

4. **Custom Domain** (optional):
   Update `wrangler.jsonc` with `routes` and redeploy.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/mikeschlottig/nexuslms-next-generation-ai-powered-learning-platform)

## 🐛 Troubleshooting

- **AI Gateway 401**: Verify `CF_AI_BASE_URL` and API key
- **Durable Objects Migration**: Run `wrangler deploy --dry-run` to check
- **Bun Issues**: Ensure `bun --version` ≥ 1.1.0
- **Type Errors**: Run `bun run cf-typegen`
- **Worker Logs**: `wrangler tail`

## 🤝 Contributing

1. Fork & clone
2. `bun install`
3. Create feature branch
4. `bun dev` & test
5. PR with clear description

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

## 🙌 Acknowledgments

Built on [Cloudflare Workers Templates](https://developers.cloudflare.com/workers/), [Shadcn/UI](https://ui.shadcn.com/), and [Agents SDK](https://developers.cloudflare.com/agents/).

---

⭐ **Star on GitHub** · 💬 **Join Discord** · 🐛 **Report Issues**