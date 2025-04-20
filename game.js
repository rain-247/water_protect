document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start-game");
    const gameScreen = document.getElementById("game-screen");
    const gameArea = document.getElementById("game-area");
    const scoreElement = document.getElementById("score");
    const pollutionElement = document.getElementById("pollution-level");
    let river;
    let score = 0;
    let pollutionLevel = 0;
    let gameInterval;

    function startGame() {
        score = 0;
        pollutionLevel = 0;
        scoreElement.textContent = score;
        pollutionElement.textContent = pollutionLevel + "%";
        gameScreen.classList.remove("hidden");
        gameArea.innerHTML = "";

        // 重新建立河流，確保遊戲開始時顯示
        river = document.createElement("div");
        river.id = "river";
        gameArea.appendChild(river);

        gameInterval = setInterval(generateTrash, 1000);
    }

    function generateTrash() {
        if (pollutionLevel >= 100) {
            endGame();
            return;
        }
        const trash = document.createElement("div");
        trash.classList.add("game-item");
        trash.textContent = Math.random() > 0.5 ? "🌿" : "🛢️";
        trash.style.left = `${Math.random() * 90}%`;
        gameArea.appendChild(trash);

        let fallInterval = setInterval(() => {
            let currentTop = parseInt(window.getComputedStyle(trash).top);
            if (isNaN(currentTop)) currentTop = 0;
            if (currentTop >= 250) {
                if (trash.textContent === "🛢️") {
                    pollutionLevel += 20;
                    pollutionElement.textContent = pollutionLevel + "%";
                    updateRiverAppearance();
                }
                trash.remove();
                clearInterval(fallInterval);
            } else {
                trash.style.top = `${currentTop + 5}px`;
            }
        }, 100);

        trash.addEventListener("click", () => {
            if (trash.textContent === "🌿") {
                score += 10;
            } else {
                score -= 5;
            }
            scoreElement.textContent = score;
            trash.remove();
            clearInterval(fallInterval);
        });
    }

    function updateRiverAppearance() {
        let opacity = pollutionLevel / 100;
        river.style.backgroundColor = `rgba(50, 50, 150, ${1 - opacity})`;
    }

    function endGame() {
        clearInterval(gameInterval);
        alert(`遊戲結束！您的最終得分為 ${score}`);
        resetGame();
    }

    function resetGame() {
        score = 0;
        pollutionLevel = 0;
        scoreElement.textContent = score;
        pollutionElement.textContent = pollutionLevel + "%";
        gameArea.innerHTML = "";
        gameScreen.classList.add("hidden");
    }

    startButton.addEventListener("click", startGame);
});