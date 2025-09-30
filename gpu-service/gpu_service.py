from fastapi import FastAPI
import time
import random

app = FastAPI()

@app.get("/run-compute")
async def run_computation():
    # Simulate a GPU task (e.g., inference)
    time.sleep(5)  # Simulate computation delay
    
    # Simulate result from the GPU computation
    result = random.random()  # Random result (to simulate AI model result)
    return {"status": "success", "result": result}
