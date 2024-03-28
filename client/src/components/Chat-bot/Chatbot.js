import { useState, Fragment } from "react";
import Header from "../Header/Header";

import { useChat } from "./ChatContext";
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
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am your Code Camp Support Bot!",
      sender: "ChatGPT",
    },
  ]);
  const { isVisible, addMessage } = useChat();

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };
    let newMessages = [...messages, newMessage]; 
  
    if (newMessage.message.startsWith("Hello my name is")) {
      newMessages.push({
        message: "Hi, how may I assist you today?",
        sender: "ChatGPT",
      });
    }
    
    if (newMessage.message.startsWith("Can you tell me more about Code Camp")) {
      newMessages.push({
        message: "Sure, I can tell you more about Code Camp. Code Camp is a free or affordable, online coding bootcamp that teaches you to code. It covers a wide range of programming languages and frameworks, including HTML, CSS, JavaScript, React, Node.js, and more.",
        sender: "ChatGPT",
      });
    }
  
    if (newMessage.message.startsWith("Thank you for your help today")) {
      newMessages.push({
        message: "I'm glad I was able to assist you today. Have a great day!",
        sender: "ChatGPT",
      });
    }
  
    setMessages(newMessages);
    setTyping(true);
    await processMessageToChatGPT(newMessages);
    addMessage(newMessage);
  };
  async function processMessageToChatGPT(chatMessages) {

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });


    const systemMessage = {
      role: "system",
      content:
        "This is solely for a project. Speak like you are a customer support assistant for a learning platform business called Code Camp.", 
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage,
        ...apiMessages, 
      ],
    };

    await fetch("/api/chat-completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        if (
          data &&
          data.choices &&
          data.choices.length > 0 &&
          data.choices[0].message
        ) {
          console.log(data.choices[0].message.content);
          setMessages([
            ...chatMessages,
            {
              message: data.choices[0].message.content,
              sender: "ChatGPT",
            },
          ]);
          setTyping(false);
        } else {
        
          console.error("Invalid data structure:", data);
        }
      });
  }

  return (
    <Fragment>
      <Header />
      <div className="App">
  <div>
    <div
      className=""
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "100",
        width: "100%",
        maxWidth: "700px",
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
              {messages.map((message, index) => {
              return <Message key={index} model={message} />;
             })}
          </MessageList>
          <MessageInput
            placeholder="Type message here"
            onSend={handleSend}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  </div>
</div>
     </Fragment>
  );
}