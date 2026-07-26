from fastapi import FastAPI
from fastapi.responses import FileResponse
from pydantic import BaseModel
from backend import game_logic

app = FastAPI(title="Number Guessing Dashboard")

class GuessRequest(BaseModel):
    guess: str

@app.get("/")
def read_root():
    return FileResponse("frontend/index.html")

@app.get("/style.css")
def get_style():
    return FileResponse("frontend/style.css")

@app.get("/script.js")
def get_script():
    return FileResponse("frontend/script.js")

@app.post("/start")
def start():
    return game_logic.start_game()

@app.post("/guess")
def guess(req: GuessRequest):
    return game_logic.evaluate_guess(req.guess)

@app.post("/restart")
def restart():
    return game_logic.start_game()
