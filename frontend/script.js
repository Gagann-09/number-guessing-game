document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-btn");
    const guessBtn = document.getElementById("guess-btn");
    const restartBtn = document.getElementById("restart-btn");
    
    const gameSetup = document.getElementById("game-setup");
    const gameActive = document.getElementById("game-active");
    const gameOver = document.getElementById("game-over");
    
    const guessInput = document.getElementById("guess-input");
    const statusText = document.getElementById("status-text");
    const attemptsText = document.getElementById("attempts-text");
    const card = document.getElementById("card");

    function clearAnimationClasses() {
        card.classList.remove("shake", "pulse");
        statusText.classList.remove("text-error", "text-success", "text-accent");
        // Force reflow to allow restarting animations on the same element
        void card.offsetWidth;
    }

    async function startGame() {
        startBtn.disabled = true;
        restartBtn.disabled = true;
        clearAnimationClasses();
        
        try {
            const response = await fetch("/start", { method: "POST" });
            const data = await response.json();
            
            gameSetup.style.display = "none";
            gameOver.style.display = "none";
            gameActive.style.display = "block";
            
            statusText.textContent = data.message;
            statusText.classList.add("text-accent");
            attemptsText.textContent = `Attempts left: ${data.max_attempts}`;
            guessInput.value = "";
            guessInput.disabled = false;
            guessBtn.disabled = false;
            guessInput.focus();
        } catch (error) {
            statusText.textContent = "Error: Could not reach the server.";
            statusText.classList.add("text-error");
            card.classList.add("shake");
        } finally {
            startBtn.disabled = false;
            restartBtn.disabled = false;
        }
    }

    async function submitGuess() {
        const guess = guessInput.value.trim();
        clearAnimationClasses();
        
        if (!guess) {
            statusText.textContent = "Please enter a number.";
            statusText.classList.add("text-error");
            card.classList.add("shake");
            guessInput.focus();
            return;
        }

        guessBtn.disabled = true;
        guessInput.disabled = true;
        
        try {
            const response = await fetch("/guess", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ guess: guess })
            });
            const data = await response.json();

            if (data.error) {
                statusText.textContent = data.error;
                statusText.classList.add("text-error");
                card.classList.add("shake");
                if (data.attempts_left !== undefined) {
                    attemptsText.textContent = `Attempts left: ${data.attempts_left}`;
                }
            } else {
                statusText.textContent = data.status;
                attemptsText.textContent = `Attempts left: ${data.attempts_left}`;
                
                if (data.status.toLowerCase().includes("correct") || data.status.toLowerCase().includes("win")) {
                    statusText.classList.add("text-success");
                    card.classList.add("pulse");
                } else {
                    statusText.classList.add("text-error");
                    card.classList.add("shake");
                }
                
                if (data.game_over) {
                    guessBtn.disabled = true;
                    guessInput.disabled = true;
                    gameOver.style.display = "block";
                    restartBtn.focus();
                    return; // exit early so finally block doesn't re-enable
                }
            }
            
            guessInput.value = "";
            guessInput.focus();
        } catch (error) {
            statusText.textContent = "Error: Could not reach the server.";
            statusText.classList.add("text-error");
            card.classList.add("shake");
        } finally {
            // Only re-enable if the game hasn't ended
            if (gameOver.style.display !== "block") {
                guessBtn.disabled = false;
                guessInput.disabled = false;
            }
        }
    }

    startBtn.addEventListener("click", startGame);
    restartBtn.addEventListener("click", startGame);
    guessBtn.addEventListener("click", submitGuess);
    
    guessInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            submitGuess();
        }
    });
});
