### Get started

1. install 

    ```
    pip freeze > requirements.txt
    pip install -r requirements.txt
   ```
2. Start Server

   ```bash
   uvicorn server:app --reload --host 0.0.0.0 --port 8000
   ```
