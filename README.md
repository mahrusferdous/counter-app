# counter-app

A simple counter application with user authentication and click tracking.

### Live Demo

[Live Demo](https://counter-app-counter.web.app/)

# Cloud run and Google Compute Engine (GCE) with GPU Setup

# Backend API Endpoints

---

## Install Google Cloud SDK

Download and install: [Google Cloud SDK install guide](https://cloud.google.com/sdk/docs/install)

-   Initialize your account:

```bash
gcloud init
```

-   Enable required Google Cloud services:

```bash
gcloud services enable compute.googleapis.com
gcloud services enable container.googleapis.com
```

**Build the Docker Image**: First, you need to build your Docker image. Navigate to the directory containing your `Dockerfile` and run:

```bash
# Use official Node.js LTS image
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy backend source code
COPY . .

# Expose backend port
EXPOSE 3001

# Run the server
CMD ["node", "server.js"]
```

Test the Docker image locally:

```bash
docker build -t backend-api .
docker run -p 3001:3001 backend-api
```

Deploy to Google Cloud Run:

```bash
gcloud run deploy backend-api \
  --source . \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated
```

# Google Cloud Engine (GCE) with GPU Setup

This guide walks you through the steps to set up a Google Cloud Engine (GCE) instance with a GPU. Follow the instructions below to create a project, enable the necessary APIs, and set up a virtual machine with GPU support.

## 1. Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Click on **Select a project** and then click **New Project**.
3. Give your project a name (e.g., `gpu-service-project`).

## 2. Enable Billing

You must have billing enabled for your project. Google provides a $300 free credit when you first sign up for Google Cloud.

## 3. Enable APIs

1. In the Google Cloud Console, navigate to **APIs & Services**.
2. Enable the **Compute Engine API**.

## 4. Create a GCE Instance with GPU

1. In the Google Cloud Console, navigate to **Compute Engine > VM Instances**.
2. Click **Create Instance**.
3. Choose the **Region** and **Zone** that supports GPUs (e.g., `us-west1-b`).
4. Under **Machine Configuration**, select a machine type (e.g., `n1-standard-4`).
5. In the **GPU** section, choose a GPU type, such as:
    - NVIDIA Tesla T4
    - NVIDIA Tesla P100
      (Choose based on availability in your region).
6. Select **Ubuntu** as the operating system under **Boot Disk**.
7. Under **Firewall**, check **Allow HTTP traffic** and **Allow HTTPS traffic**.
8. Click **Create** to start the VM instance.

## 5. Install NVIDIA Drivers and CUDA on the VM

1. SSH into your GCE instance.
2. Install the NVIDIA drivers and CUDA toolkit to enable GPU support by running the following commands:

```bash
sudo apt update
sudo apt install -y nvidia-driver-460
sudo reboot
```
