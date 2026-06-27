# Emo key: Cryptographic Authentication & Biometric Identity

This project provides a secure backend middleware designed to handle API requests, validate user sessions via Supabase, and interface with LLM providers.

## 🚀 Live Site & Architectural Module Build
### Emo key Engine: Core System Integration Parameters

- ✔ **WebAuthn Passkey Registration:** Supporting hardware biometric scanners.
- ✔ **Advanced Private Key Segmentation:** Protecting against client-side memory scraping.
- ✔ **Zero-knowledge Proof (ZKP) Identity Synchronization:** Synchronizing identities across devices without revealing raw private keys.
- ✔ **Encrypted Cloud Backups:** Utilizing distributed IPFS encrypted nodes.

## 🎮 Interactive Project Simulator
The **Emo key** simulator offers a hands-on, interactive look into our multi-layered authentication pipeline.

**Key capabilities include:**
- **Biometric & Emotion-Entropy Registration:** Capture custom biometric emotional signatures mapped to high-security hardware passkeys via the WebAuthn API.
- **Rust-Powered Key Segmentation:** Utilizes a Rust Core (compiled to WebAssembly) to slice private keys into segmented cryptographic shares, preventing client-side RAM-scraping attacks.
- **Zero-Knowledge Proof (ZKP) Identity Sync:** Witness cryptographic ZKP handshakes synchronize master identities across devices securely.
- **Distributed IPFS Backup Routing:** Simulate fragmentation, encryption, and distribution of key segments across mock IPFS nodes with secure IndexedDB local caching.

## 🛠 Tech Stack
- **Runtime:** Node.js
- **Hosting:** Vercel (Serverless Functions)
- **Database/Auth:** Supabase
- **Core Security:** Rust/WASM, WebAuthn, IPFS, ZKP

## ⚙️ Setup & Deployment
### Prerequisites
- A Vercel account.
- A Supabase project with configured Row Level Security (RLS).
- Your LLM API Key (e.g., OpenAI, Gemini, etc.).

### Environment Variables
Configure the following in your Vercel Project Settings:

| Variable | Description |
| :--- | :--- |
| SUPABASE_URL | Your project's API URL. |
| SUPABASE_ANON_KEY | Your project's anonymous public key. |
| LLM_API_KEY | The secret key for your AI provider. |
| EMO_KEY | The active safety key: `emo_guardian_AI_safety_active_2026` |

### Deployment
This repository is configured for automatic deployment. Simply push your changes to the main branch, and Vercel will handle the build and deployment process.

## 🔒 Security Best Practices
- Keep Keys Secret: Never hardcode your API keys in server.js or package.json. Always use Vercel environment variables.
- RLS Enabled: Ensure your Supabase tables have Row Level Security enabled to prevent unauthorized access to your API endpoints.
- Emo Key: The Emo Key (`emo_guardian_AI_safety_active_2026`) is used for AI safety monitoring and MUST be protected.

## 📝 License
This project is open-source and available for use.
