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

    // Auto-select existing value on focus
    guessInput.addEventListener("focus", () => guessInput.select());

    function resetAnimations() {
        card.classList.remove("shake", "pulse");
        statusText.classList.remove("text-error", "text-success", "text-accent", "text-warning", "text-info");
        // Force reflow
        void card.offsetWidth;
    }

    function toggleLoading(btn, isLoading) {
        if (isLoading) {
            btn.classList.add("is-loading");
            btn.setAttribute("aria-busy", "true");
        } else {
            btn.classList.remove("is-loading");
            btn.removeAttribute("aria-busy");
        }
    }

    function toggleGameState(isGameActive, isGameOver) {
        gameSetup.style.display = isGameActive || isGameOver ? "none" : "block";
        gameActive.style.display = isGameActive ? "block" : "none";
        gameOver.style.display = isGameOver ? "block" : "none";
    }

    function updateStatus(message, type, animationClass = null) {
        statusText.textContent = message;
        statusText.classList.add(`text-${type}`);
        if (animationClass) {
            card.classList.add(animationClass);
        }
    }

    function updateAttempts(attempts) {
        if (attempts !== undefined) {
            attemptsText.textContent = attempts;
        }
    }

    function toggleInputs(disabled) {
        guessBtn.disabled = disabled;
        guessInput.disabled = disabled;
    }

    async function startGame(e) {
        const btn = e.target || startBtn;
        btn.disabled = true;
        toggleLoading(btn, true);
        resetAnimations();
        
        try {
            const response = await fetch("/start", { method: "POST" });
            const data = await response.json();
            
            toggleGameState(true, false);
            updateStatus(data.message, "info");
            updateAttempts(data.max_attempts);
            
            guessInput.value = "";
            toggleInputs(false);
            guessInput.focus();
        } catch (error) {
            updateStatus("Error: Could not reach the server.", "error", "shake");
        } finally {
            btn.disabled = false;
            toggleLoading(btn, false);
        }
    }

    function handleGameEnd() {
        toggleInputs(true);
        toggleGameState(true, true);
        restartBtn.focus();
    }
    
    function processGuessStatus(data) {
        const statusLower = data.status.toLowerCase();
        if (statusLower.includes("correct") || statusLower.includes("win")) {
            updateStatus(data.status, "success", "pulse");
        } else if (statusLower.includes("high") || statusLower.includes("low")) {
            updateStatus(data.status, "warning", "shake");
        } else if (statusLower.includes("over") || statusLower.includes("out of")) {
            updateStatus(data.status, "error", "shake");
        } else {
            updateStatus(data.status, "info");
        }
    }

    async function submitGuess() {
        const guess = guessInput.value.trim();
        resetAnimations();
        
        if (!guess) {
            updateStatus("Please enter a number.", "warning", "shake");
            guessInput.focus();
            return;
        }

        toggleInputs(true);
        toggleLoading(guessBtn, true);
        
        try {
            const response = await fetch("/guess", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ guess })
            });
            const data = await response.json();

            if (data.error) {
                updateStatus(data.error, "warning", "shake");
                updateAttempts(data.attempts_left);
            } else {
                updateAttempts(data.attempts_left);
                processGuessStatus(data);
                
                if (data.game_over) {
                    handleGameEnd();
                    return;
                } else {
                    guessInput.value = "";
                    guessInput.focus();
                }
            }
        } catch (error) {
            updateStatus("Error: Could not reach the server.", "error", "shake");
        } finally {
            toggleLoading(guessBtn, false);
            if (gameOver.style.display !== "block") {
                toggleInputs(false);
            }
        }
    }

    startBtn.addEventListener("click", startGame);
    restartBtn.addEventListener("click", startGame);
    guessBtn.addEventListener("click", submitGuess);
    
    guessInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") submitGuess();
    });
});
