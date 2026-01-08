const sendBtn = document.querySelector("button");
const input = document.querySelector("input");
const chatBox = document.querySelector(".chat-box");

sendBtn.addEventListener("click", async () => {
  const message = input.value.trim();
  if (!message) return;

  chatBox.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
  input.value = "";

  try {
    const res = await fetch(
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

    const text = await res.text();
    console.log("RAW RESPONSE:", text);

    const data = JSON.parse(text);

    chatBox.innerHTML += `<p><strong>Travelight:</strong> ${data.reply}</p>`;
  } catch (err) {
    console.error("Fetch error:", err);
    chatBox.innerHTML += `<p style="color:red;">Error contacting chatbot</p>`;
  }
});
