import { useState } from "react";
import { useChat } from "./ChatContext";
import "./Chatbot.css";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

export default function Chatbot() {
  const { isVisible, addMessage } = useChat() || {} 
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am your Code Camp Support Bot!",
      sender: "ChatGPT",
    },
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setTyping(true);
    await processMessageToChatGPT(newMessages);
    addMessage(newMessage);
  };

  async function processMessageToChatGPT(chatMessages) {
    // Your existing code here
  }

  return (
    <div className="App">
      <div>
        {isVisible && (
          <div
            className="modal"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: "1000",
              width: "80%",
              maxWidth: "600px",
              height: "600px",
              borderRadius: "40px",
            }}
          >
            <MainContainer>
              <ChatContainer>
                <MessageList
                  scrollBehavior="smooth"
                  typingIndicator={
                    typing ? (
                      <TypingIndicator content="ChatGPT is typing" />
                    ) : null
                  }
                >
                  {messages.map((message, index) => (
                    <Message key={index} model={message} />
                  ))}
                </MessageList>
                <MessageInput
                  placeholder="Type message here"
                  onSend={handleSend}
                />
              </ChatContainer>
            </MainContainer>
          </div>
        )}
      </div>
    </div>
  );
}