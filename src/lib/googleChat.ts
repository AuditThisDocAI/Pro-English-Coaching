export interface ChatSpace {
  name: string; // e.g. "spaces/AAAA"
  displayName?: string;
  type?: string;
  spaceType?: 'SPACE' | 'GROUP_CHAT' | 'DIRECT_MESSAGE' | string;
  description?: string;
}

export interface ChatSender {
  name?: string;
  displayName?: string;
  avatarUrl?: string;
  type?: string;
}

export interface ChatMessage {
  name: string; // e.g. "spaces/AAAA/messages/BBBB"
  text?: string;
  createTime?: string;
  sender?: ChatSender;
  formattedText?: string;
}

export async function fetchSpaces(accessToken: string): Promise<ChatSpace[]> {
  const response = await fetch('https://chat.googleapis.com/v1/spaces?pageSize=50', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errText = await response.text();
    let errMsg = `Google Chat error: ${response.status}`;
    try {
      const errJson = JSON.parse(errText);
      errMsg = errJson.error?.message || errMsg;
    } catch {
      errMsg = errText || errMsg;
    }
    throw new Error(errMsg);
  }

  const data = await response.json();
  return data.spaces || [];
}

export async function fetchMessages(spaceName: string, accessToken: string): Promise<ChatMessage[]> {
  const cleanSpace = spaceName.startsWith('spaces/') ? spaceName : `spaces/${spaceName}`;
  const response = await fetch(`https://chat.googleapis.com/v1/${cleanSpace}/messages?pageSize=20`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errText = await response.text();
    let errMsg = `Failed to fetch messages: ${response.status}`;
    try {
      const errJson = JSON.parse(errText);
      errMsg = errJson.error?.message || errMsg;
    } catch {
      errMsg = errText || errMsg;
    }
    throw new Error(errMsg);
  }

  const data = await response.json();
  return data.messages || [];
}

export async function sendChatMessage(spaceName: string, text: string, accessToken: string): Promise<ChatMessage> {
  const cleanSpace = spaceName.startsWith('spaces/') ? spaceName : `spaces/${spaceName}`;
  const response = await fetch(`https://chat.googleapis.com/v1/${cleanSpace}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const errText = await response.text();
    let errMsg = `Failed to send chat message: ${response.status}`;
    try {
      const errJson = JSON.parse(errText);
      errMsg = errJson.error?.message || errMsg;
    } catch {
      errMsg = errText || errMsg;
    }
    throw new Error(errMsg);
  }

  return await response.json();
}
