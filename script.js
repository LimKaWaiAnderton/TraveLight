async function sendMessage() {
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chat-box");

  const userMessage = input.value;
  if (!userMessage) return;

  // Show user message
  chatBox.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
  input.value = "";

  try {
    const response = await fetch(
      "https://n8ngc.codeblazar.org/webhook/travelight/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userMessage: userMessage
        })
      }
    );

    const data = await response.json();

    // Adjust key if your Respond to Webhook uses another field
    chatBox.innerHTML += `<p><strong>TraveLight:</strong> ${data.reply}</p>`;
  } catch (error) {
    chatBox.innerHTML += `<p style="color:red;">Error contacting chatbot</p>`;
  }
}
