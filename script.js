const sendBtn = document.querySelector("button");
const input = document.querySelector("input");
const chatBox = document.querySelector(".chat-box");

sendBtn.addEventListener("click", async () => {
  const message = input.value.trim();
  if (!message) return;

  chatBox.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
  input.value = "";

  try {
    const response = await fetch(
      "https://n8ngc.codeblazar.org/webhook/travelight/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userMessage: message,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response not OK");
    }

    const data = await response.json();
    console.log("Bot response:", data);

    chatBox.innerHTML += `<p><strong>Travelight:</strong> ${data.reply}</p>`;
  } catch (error) {
    console.error(error);
    chatBox.innerHTML += `<p style="color:red;">Error contacting chatbot</p>`;
  }
});
