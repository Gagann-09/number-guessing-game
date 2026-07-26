import random
from typing import Dict, Any, Tuple

MIN_NUMBER: int = 1
MAX_NUMBER: int = 30
MAX_ATTEMPTS: int = 6

# Simple state for a single running game
game_state: Dict[str, Any] = {
    "secret_number": 0,
    "attempts_used": 0,
    "is_active": False
}


def start_game() -> Dict[str, Any]:
    game_state["secret_number"] = random.randint(MIN_NUMBER, MAX_NUMBER)
    game_state["attempts_used"] = 0
    game_state["is_active"] = True
    return {
        "min_number": MIN_NUMBER,
        "max_number": MAX_NUMBER,
        "max_attempts": MAX_ATTEMPTS,
        "message": f"I'm thinking of a number between {MIN_NUMBER} and {MAX_NUMBER}."
    }


def validate_guess(raw_value: str) -> Tuple[bool, int, str]:
    try:
        guess = int(raw_value)
    except ValueError:
        return False, 0, "That's not a whole number. Try again."
    
    if guess < MIN_NUMBER or guess > MAX_NUMBER:
        return False, guess, f"Enter a number between {MIN_NUMBER} and {MAX_NUMBER}."
        
    return True, guess, ""


def evaluate_guess(raw_value: str) -> Dict[str, Any]:
    if not game_state["is_active"]:
        return {"error": "Game not started.", "attempts_left": 0}
        
    is_valid, guess, error_message = validate_guess(raw_value)
    if not is_valid:
        return {"error": error_message, "attempts_left": MAX_ATTEMPTS - game_state["attempts_used"]}
        
    game_state["attempts_used"] += 1
    secret_number = game_state["secret_number"]
    attempts_used = game_state["attempts_used"]
    remaining = MAX_ATTEMPTS - attempts_used
    
    if guess < secret_number:
        status = "Too Low"
    elif guess > secret_number:
        status = "Too High"
    else:
        status = f"Correct Guess! You got it in {attempts_used} attempt(s)."
        game_state["is_active"] = False
        return {"status": status, "game_over": True, "won": True, "attempts_left": remaining}

    if remaining <= 0:
        status = f"Out of attempts. The number was {secret_number}."
        game_state["is_active"] = False
        return {"status": status, "game_over": True, "won": False, "attempts_left": 0}
        
    return {"status": status, "game_over": False, "won": False, "attempts_left": remaining}
