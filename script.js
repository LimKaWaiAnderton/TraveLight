// Elements
const sendBtn = document.getElementById("sendBtn");
const input = document.getElementById("userInput");
const chatBox = document.getElementById("chat");

// Click handler
sendBtn.addEventListener("click", sendMessage);

// Enter key handler
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  // Show user message
  chatBox.innerHTML += `<p><b>You:</b> ${message}</p>`;
  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch(
      "https://n8ngc.codeblazar.org/webhook/travelight/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userMessage: message
        })
      }
    );

    // IMPORTANT: n8n returns JSON
    const data = await response.json();

    // Display AI reply
    chatBox.innerHTML += `<p><b>TraveLight:</b> ${data.reply}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;

  } catch (error) {
    console.error(error);
    chatBox.innerHTML +=
      `<p style="color:red;">Error contacting chatbot</p>`;
  }
}
