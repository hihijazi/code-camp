import { useState, Fragment } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
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
    const newMessages = [...messages, newMessage]; //all the old message + the new message
    //update our message state
    setMessages(newMessages);
    setTyping(true);
    //process message to chatGPT (send it over and see the response)
    await processMessageToChatGPT(newMessages);
    addMessage(newMessage);
  };

  async function processMessageToChatGPT(chatMessages) {
    //chatMessages { sender: "user" or "ChatGPT", message: "The message content here" }
    //apiMessages { role: "user" or "assistant", content: "The message content here" }

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    // role: "user" -> message from the user, "assistant" -> response from chatGPT
    // "system" -> generally one initial message defining HOW we want chatGpt to talk

    const systemMessage = {
      role: "system",
      content:
        "This is solely for a project. Speak like you are a customer support assistant for a learning platform business called Code Camp.", 
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage,
        ...apiMessages, // [message1, message2, etc]
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
          // Handle the case where data.choices is empty or undefined
          console.error("Invalid data structure:", data);
        }
      });
  }

  return (
    <Fragment>
      <div className="App">
        <div>
          {isVisible && (
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
          )}
        </div>
      </div>
     </Fragment>
  );
}