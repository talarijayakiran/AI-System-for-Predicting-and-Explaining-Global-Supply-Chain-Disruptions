#!/bin/bash
set -e

echo "=========================================================="
echo " SUPPLY CHAIN AI PLATFORM - AWS EC2 BACKEND SETUP SCRIPT "
echo "=========================================================="

# 1. Update system packages
echo "--> Updating system packages..."
sudo apt-get update -y
sudo apt-get install -y python3-pip python3-venv git curl libgomp1

# 2. Configure 4GB Swap Space (Essential for Free-Tier 1GB RAM)
if [ ! -f /swapfile ]; then
    echo "--> Configuring 4GB Swap Space for ML model loading..."
    sudo fallocate -l 4G /swapfile
    sudo chmod 600 /swapfile
    sudo mkswap /swapfile
    sudo swapon /swapfile
    echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
    echo "--> Swap space active: $(free -h | grep -i swap)"
else
    echo "--> Swap space already configured."
fi

# 3. Setup Python Virtual Environment
echo "--> Setting up Python virtual environment..."
cd ~/AI-System-for-Predicting-and-Explaining-Global-Supply-Chain-Disruptions || cd ~/supply-chain-ai-system || cd .
python3 -m venv venv
source venv/bin/activate

# 4. Install CPU PyTorch and Backend Dependencies
echo "--> Installing dependencies (CPU-optimized)..."
pip install --upgrade pip
pip install --no-cache-dir --index-url https://download.pytorch.org/whl/cpu "torch==2.12.0+cpu"
pip install --no-cache-dir -r backend/requirements.txt

# 5. Create Systemd Service for Auto-Restart
echo "--> Creating Systemd background service..."
PROJECT_DIR=$(pwd)
USER_NAME=$(whoami)

sudo bash -c "cat > /etc/systemd/system/supplychain-backend.service <<EOF
[Unit]
Description=Supply Chain AI Backend Service
After=network.target

[Service]
User=$USER_NAME
WorkingDirectory=$PROJECT_DIR
Environment=PYTHONPATH=$PROJECT_DIR/backend:$PROJECT_DIR
EnvironmentFile=$PROJECT_DIR/backend/.env
ExecStart=$PROJECT_DIR/venv/bin/python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF"

sudo systemctl daemon-reload
sudo systemctl enable supplychain-backend
sudo systemctl restart supplychain-backend

echo "=========================================================="
echo " Backend Service Status:"
echo "=========================================================="
sudo systemctl status supplychain-backend --no-pager
echo ""
echo "Setup Complete! Test locally on EC2: curl http://localhost:8000/health"

