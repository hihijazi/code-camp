import React, { useState } from "react";
import { useChat } from "./ChatContext";
import "./chatbot.css";
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
  const { addMessage } = useChat() || {};
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
  
    // Update messages state with the new message
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  
    // Set typing state to true
    setTyping(true);
  
    try {
      // Process the message asynchronously
      await processMessageToChatGPT(newMessage);
  
      // If successful, add the message to the chat
      addMessage(newMessage);
    } catch (error) {
      // Handle errors, if any
      console.error("Error processing message:", error);
    }
  };
  

  async function processMessageToChatGPT(chatMessages) {
    // Your existing code here
  }

  return (
    <div className="App">
      <div style={{ position: "relative", height: "500px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList>
              {messages.map((message, index) => (
                <Message key={index} model={message} />
              ))}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}