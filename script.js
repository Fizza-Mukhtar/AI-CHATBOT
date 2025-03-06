const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

async function sendMessage() {
    let message = userInput.value.trim();
    if (message === "") return;

    appendMessage("You", message);
    userInput.value = "";

    try {
        const response = await fetch("http://localhost:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });

        if (!response.ok) throw new Error("Failed to get response from server");

        const data = await response.json();
        appendMessage("Bot", data.error || data.content || "Unexpected response");
        
    } catch (error) {
        console.error("Error:", error);
        appendMessage("Bot", "Sorry, I couldn't process your request.");
    }
}

function appendMessage(sender, text) {
    let messageDiv = document.createElement("div");
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

