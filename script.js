const chatbox = document.getElementById("chatbox");
const input = document.getElementById("userInput");

// WARNING: This key is private — don't share it publicly!
const OPENAI_API_KEY = "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";

async function sendMessage() {
  const question = input.value.trim();
  if (!question) return alert("Please type a question!");

  // Show user question
  appendMessage("You", question);

  input.value = "";
  input.disabled = true;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are Akin AI, a helpful assistant." },
          { role: "user", content: question }
        ]
      })
    });

    const data = await response.json();
    const answer = data.choices[0].message.content;

    appendMessage("Akin AI", answer);
  } catch (error) {
    appendMessage("Akin AI", "Sorry, something went wrong.");
    console.error(error);
  }

  input.disabled = false;
  input.focus();
}

function appendMessage(sender, message) {
  const div = document.createElement("div");
  div.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatbox.appendChild(div);
  chatbox.scrollTop = chatbox.scrollHeight;
}
