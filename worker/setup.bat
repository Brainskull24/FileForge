@echo off
echo ====================================
echo [1/4] Creating virtual environment...
echo ====================================
python -m venv venv

echo ====================================
echo [2/4] Activating virtual environment...
echo ====================================
call venv\Scripts\activate

echo ====================================
echo [3/4] Installing dependencies...
echo ====================================
pip install --upgrade pip
pip install -r requirements.txt

echo ====================================
echo [4/4] Running the FastAPI server...
echo ====================================
uvicorn app.main:app --reload

pause
