type ChatMsg = { role: "user" | "assistant" | "system", content: string };

export async function sendChatMessage(messages: ChatMsg[]) {
  const res = await fetch("/api/chat", { 
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ messages })
  });
  const data = await res.json();
  return data.reply;
}


