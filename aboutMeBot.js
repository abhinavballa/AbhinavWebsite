document.getElementById("sendBtn").onclick = async () => {
    const input = document.getElementById("userInput").value;
    if (!input) return;
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: input }),
    });
    const data = await res.json();
    document.getElementById("chatbox").innerHTML += `<div><b>You:</b> ${input}</div>`;
    document.getElementById("chatbox").innerHTML += `<div><b>Bot:</b> ${data.response}</div>`;
    document.getElementById("userInput").value = "";
  };