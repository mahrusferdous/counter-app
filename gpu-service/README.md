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
