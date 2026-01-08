document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("sendBtn");
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chat");

  // Safety check
  if (!sendBtn || !input || !chatBox) {
    console.error("Missing HTML elements");
    return;
  }

  sendBtn.addEventListener("click", sendMessage);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  async function sendMessage() {
    const message = input.value.trim();
    if (!message) return;

    chatBox.innerHTML += `<p><b>You:</b> ${message}</p>`;
    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
      const response = await fetch(
        "https://n8ngc.codeblazar.org/webhook/travelight/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userMessage: message })
        }
      );

      const data = await response.json();

      chatBox.innerHTML += `<p><b>TraveLight:</b> ${data.reply}</p>`;
      chatBox.scrollTop = chatBox.scrollHeight;

    } catch (err) {
      console.error(err);
      chatBox.innerHTML += `<p style="color:red;">Error contacting chatbot</p>`;
    }
  }
});
