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

    // UX: Auto-select existing value on focus
    guessInput.addEventListener("focus", () => {
        guessInput.select();
    });

    function clearAnimationClasses() {
        card.classList.remove("shake", "pulse");
        statusText.classList.remove("text-error", "text-success", "text-accent", "text-warning", "text-info");
        // Force reflow to allow restarting animations on the same element
        void card.offsetWidth;
    }

    function setLoading(btn, isLoading) {
        if (isLoading) {
            btn.classList.add("is-loading");
            btn.setAttribute("aria-busy", "true");
        } else {
            btn.classList.remove("is-loading");
            btn.removeAttribute("aria-busy");
        }
    }

    async function startGame(e) {
        const btn = e.target || startBtn;
        btn.disabled = true;
        setLoading(btn, true);
        
        clearAnimationClasses();
        
        try {
            const response = await fetch("/start", { method: "POST" });
            const data = await response.json();
            
            gameSetup.style.display = "none";
            gameOver.style.display = "none";
            gameActive.style.display = "block";
            
            statusText.textContent = data.message;
            statusText.classList.add("text-info");
            attemptsText.textContent = data.max_attempts;
            
            guessInput.value = "";
            guessInput.disabled = false;
            guessBtn.disabled = false;
            
            // UX: Auto-focus input after a game starts
            guessInput.focus();
        } catch (error) {
            statusText.textContent = "Error: Could not reach the server.";
            statusText.classList.add("text-error");
            card.classList.add("shake");
        } finally {
            btn.disabled = false;
            setLoading(btn, false);
        }
    }

    async function submitGuess() {
        const guess = guessInput.value.trim();
        clearAnimationClasses();
        
        if (!guess) {
            statusText.textContent = "Please enter a number.";
            statusText.classList.add("text-warning");
            card.classList.add("shake");
            guessInput.focus();
            return;
        }

        // Disable controls to prevent duplicate requests while processing
        guessBtn.disabled = true;
        guessInput.disabled = true;
        setLoading(guessBtn, true);
        
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
                statusText.classList.add("text-warning");
                card.classList.add("shake");
                if (data.attempts_left !== undefined) {
                    attemptsText.textContent = data.attempts_left;
                }
            } else {
                statusText.textContent = data.status;
                attemptsText.textContent = data.attempts_left;
                
                const statusLower = data.status.toLowerCase();
                
                if (statusLower.includes("correct") || statusLower.includes("win")) {
                    statusText.classList.add("text-success");
                    card.classList.add("pulse");
                } else if (statusLower.includes("high") || statusLower.includes("low")) {
                    statusText.classList.add("text-warning");
                    card.classList.add("shake");
                } else if (statusLower.includes("over") || statusLower.includes("out of")) {
                    statusText.classList.add("text-error");
                    card.classList.add("shake");
                } else {
                    statusText.classList.add("text-info");
                }
                
                if (data.game_over) {
                    // UX: Ensure controls remain disabled after game ends
                    guessBtn.disabled = true;
                    guessInput.disabled = true;
                    gameOver.style.display = "block";
                    restartBtn.focus();
                    return; // Exit early to prevent finally block from re-enabling
                } else {
                    // UX: Clear field after valid submission
                    guessInput.value = "";
                    guessInput.focus();
                }
            }
        } catch (error) {
            statusText.textContent = "Error: Could not reach the server.";
            statusText.classList.add("text-error");
            card.classList.add("shake");
        } finally {
            setLoading(guessBtn, false);
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
    
    // UX: Pressing Enter submits the guess
    guessInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            submitGuess();
        }
    });
});
