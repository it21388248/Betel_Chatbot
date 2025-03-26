import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import DetectLanguage from "detectlanguage";

const detectlanguage = new DetectLanguage("1dc19ee0dfa61efae9874d97ae344829"); // Replace with your API Key

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    try {
      // Detect language using DetectLanguage API
      const detectionResult = await detectlanguage.detect(input);
      const detectedLang = detectionResult[0]?.language || "en";
      const isSinhala = detectedLang === "si";

      const newMessage = {
        sender: "user",
        text: input,
        lang: isSinhala ? "si" : "en",
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);

      const response = await axios.post("http://localhost:5000/api/chat", {
        message: input,
      });

      const botReply = {
        sender: "bot",
        text: response.data.reply,
        lang: isSinhala ? "si" : "en",
      };

      setMessages((prevMessages) => [...prevMessages, botReply]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "bot",
          text: "⚠️ **Error**: Could not get a response.",
          lang: "en",
        },
      ]);
    }

    setInput(""); // Clear input after sending
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center">🤖 AI Chatbot</h2>
      <div className="h-80 overflow-y-auto bg-white p-4 rounded-lg shadow-inner flex flex-col">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 my-2 max-w-xs rounded-lg break-words ${
              msg.sender === "user"
                ? "bg-blue-500 text-white self-end ml-auto text-right"
                : "bg-gray-300 text-black self-start"
            }`}
            style={{
              fontFamily:
                msg.lang === "si" ? "Iskoola Pota, sans-serif" : "inherit",
            }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  return !inline ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language="javascript"
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="bg-gray-200 text-red-600 p-1 rounded">
                      {children}
                    </code>
                  );
                },
                a({ node, ...props }) {
                  return (
                    <a className="text-blue-500 hover:underline" {...props} />
                  );
                },
              }}
            >
              {msg.text}
            </ReactMarkdown>
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border rounded-l-lg"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
