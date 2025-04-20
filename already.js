document.addEventListener("DOMContentLoaded", function() {
    const eventContainer = document.querySelector(".event-container");
    const registerButtons = document.querySelectorAll(".register-btn");
    let registeredEvents = JSON.parse(localStorage.getItem("registeredEvents")) || [];

    function openRegistrationForm(eventId) {
        const popup = document.createElement("div");
        popup.classList.add("popup-form");
        popup.innerHTML = `
            <div class="popup-content">
                <h2>活動報名</h2>
                <form id="popup-event-form">
                    <label for="popup-name">姓名：</label>
                    <input type="text" id="popup-name" required>
                    
                    <label for="popup-email">電子郵件：</label>
                    <input type="email" id="popup-email" required>
                    
                    <button type="submit">提交報名</button>
                    <button type="button" id="close-popup">取消</button>
                </form>
            </div>
        `;
        document.body.appendChild(popup);

        document.getElementById("popup-event-form").addEventListener("submit", function(e) {
            e.preventDefault();
            const name = document.getElementById("popup-name").value;
            const email = document.getElementById("popup-email").value;

            registeredEvents.push({ id: eventId, name, email });
            localStorage.setItem("registeredEvents", JSON.stringify(registeredEvents));
            alert("報名成功！");
            document.body.removeChild(popup);
        });

        document.getElementById("close-popup").addEventListener("click", function() {
            document.body.removeChild(popup);
        });
    }

    registerButtons.forEach(button => {
        button.addEventListener("click", function() {
            const eventId = this.dataset.id;
            openRegistrationForm(eventId);
        });
    });
});
