# Check GPU Availability

To check if a GPU is available on your system, you can use the following command:

```bash
.\env\Scripts\Activate # Activate your virtual environment
uvicorn gpu_service:app --host 0.0.0.0 --port 8000 --reload
```

Then, in browser or using `curl`, navigate to:

```bash
http://localhost:8000/run-compute
```

If a GPU is available, you should see output similar to:

```json
{ "status": "success", "result": 0.123456789 }
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
