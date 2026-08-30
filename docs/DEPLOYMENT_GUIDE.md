# Complete Production Deployment Guide

This guide walks you through deploying the 3-tier architecture:
- **Database**: Neon PostgreSQL (Serverless Cloud DB)
- **Backend API**: AWS EC2 (Free-Tier Ubuntu Instance)
- **Frontend App**: Vercel (Next.js Edge Network)

---

## Architecture Diagram

```
[ Vercel: Next.js Frontend ] (HTTPS / WSS)
              │
              ▼
[ AWS EC2: FastAPI Backend + ML/RAG Models ] (Port 8000)
              │
              ▼
[ Neon: Cloud PostgreSQL Database ] (SSL / Port 5432)
```

---

## Step 1: Database Setup (Neon PostgreSQL)

1. Sign in to [neon.tech](https://neon.tech) and click **Create Project**.
2. Name your project (e.g. `supply-chain-ai-db`) and select Postgres version `16` or `17`.
3. Copy your **Connection String** from the Neon dashboard:
   ```env
   DATABASE_URL=postgresql://neondb_owner:<PASSWORD>@ep-<endpoint-id>.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
4. **Create Database Tables & Seed Data**:
   From your local terminal with `DATABASE_URL` pointing to Neon:
   ```bash
   python backend/create_tables.py
   python backend/scripts/generate_data.py
   ```

---

## Step 2: Backend Deployment (AWS EC2 Free Tier)

### 1. Launch EC2 Instance
- **OS**: Ubuntu 24.04 LTS or 22.04 LTS (x86_64)
- **Instance Type**: `t2.micro` or `t3.micro` (Free Tier eligible)
- **Key Pair**: Create or download your `.pem` key
- **Storage**: 25–30 GB `gp3` root volume (Free Tier includes up to 30 GB EBS)

### 2. Configure EC2 Security Group (Inbound Rules)
Add the following Inbound Rules in the AWS EC2 Console:
| Type | Port Range | Source | Description |
| :--- | :--- | :--- | :--- |
| **SSH** | `22` | `My IP` | Secure remote access |
| **HTTP** | `80` | `0.0.0.0/0` | Web HTTP |
| **HTTPS** | `443` | `0.0.0.0/0` | Secure Web HTTPS |
| **Custom TCP** | `8000` | `0.0.0.0/0` | FastAPI & WebSocket Stream |

### 3. SSH into your EC2 Instance
```bash
ssh -i /path/to/your-key.pem ubuntu@<EC2_PUBLIC_IP>
```

### 4. Clone Repository & Configure Environment
```bash
# Clone the repository
git clone https://github.com/talarijayakiran/AI-System-for-Predicting-and-Explaining-Global-Supply-Chain-Disruptions.git
cd AI-System-for-Predicting-and-Explaining-Global-Supply-Chain-Disruptions

# Create backend .env file
cat << 'EOF' > backend/.env
DATABASE_URL=postgresql://neondb_owner:<PASSWORD>@ep-<endpoint-id>.us-east-2.aws.neon.tech/neondb?sslmode=require
GEMINI_API_KEY=<YOUR_GEMINI_API_KEY>
EOF
```

### 5. Run Automated Setup Script
```bash
chmod +x backend/setup_ec2.sh
./backend/setup_ec2.sh
```

The setup script automatically:
- Configures 4GB swap space (prevents Out-Of-Memory on 1GB RAM EC2).
- Installs CPU PyTorch and backend requirements.
- Registers a `systemd` service that keeps the backend running 24/7 and restarts it on server reboots.

### 6. Verify Backend Health
From your local browser or terminal:
```bash
curl http://<EC2_PUBLIC_IP>:8000/health
```
Response: `{"status":"healthy","service":"ai-supply-chain-platform","version":"1.0.0"}`

---

## Step 3: Frontend Deployment (Vercel)

1. Go to [vercel.com](https://vercel.com) and click **Add New > Project**.
2. Select your repository: `AI-System-for-Predicting-and-Explaining-Global-Supply-Chain-Disruptions`.
3. Configure the project settings:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: `frontend` (Click *Edit* and select the `frontend` folder)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
4. Add **Environment Variable**:
   - `NEXT_PUBLIC_API_URL` = `http://<EC2_PUBLIC_IP>:8000` (or your backend domain)
5. Click **Deploy**.

---

## Step 4: Verification Checklist

Once deployed:
1. Open your Vercel URL: `https://<your-project>.vercel.app`.
2. Navigate to `/dashboard` to verify:
   - Live telemetry status indicator is **Green (Connected)**.
   - Real-time WebSocket risk ticks update every 5 seconds.
   - Historical risk chart displays data fetched from Neon PostgreSQL.
   - AI Copilot RAG queries respond with grounded operational intelligence.

