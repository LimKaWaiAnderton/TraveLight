// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get elements
  const sendBtn = document.getElementById("sendBtn");
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chat");

  // Safety check (prevents silent crashes)
  if (!sendBtn || !input || !chatBox) {
    console.error("❌ Missing HTML elements. Check IDs.");
    return;
  }

  // Click handler
  sendBtn.addEventListener("click", sendMessage);

  // Enter key handler
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  async function sendMessage() {
    const message = input.value.trim();
    if (!message) return;

    // Show user message
    chatBox.innerHTML += `<p><b>You:</b> ${escapeHtml(message)}</p>`;
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

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();

      // Validate response
      if (!data || !data.reply) {
        throw new Error("Invalid response from server");
      }

      // Show bot reply
      chatBox.innerHTML += `<p><b>TraveLight:</b> ${formatReply(
        data.reply
      )}</p>`;

      chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {
      console.error(error);
      chatBox.innerHTML +=
        `<p style="color:red;"><b>Error:</b> Unable to contact TraveLight</p>`;
    }
  }

  // Escape user input (prevents HTML injection)
  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Format multiline replies nicely
  function formatReply(text) {
    return escapeHtml(text).replace(/\n/g, "<br>");
  }
});
