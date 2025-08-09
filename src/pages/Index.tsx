import { useState } from "react";
import { ChatList } from "@/components/ChatList";
import { ChatWindow } from "@/components/ChatWindow";

// Mock data - this will be replaced with real data from Supabase
const mockChats = [
  {
    id: "1",
    name: "John Doe",
    lastMessage: "Hey, how are you doing?",
    timestamp: "12:30",
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: "2",
    name: "Sarah Wilson",
    lastMessage: "Thanks for the help!",
    timestamp: "11:45",
    isOnline: false,
  },
  {
    id: "3",
    name: "Mike Johnson",
    lastMessage: "See you tomorrow",
    timestamp: "Yesterday",
    unreadCount: 1,
    isOnline: true,
  },
];

const mockMessages = {
  "1": [
    {
      id: "msg1",
      content: "Hey there! How are you doing?",
      timestamp: "12:25",
      type: "received" as const,
    },
    {
      id: "msg2",
      content: "I'm doing great! Thanks for asking. How about you?",
      timestamp: "12:26",
      type: "sent" as const,
      status: "read" as const,
    },
    {
      id: "msg3",
      content: "That's awesome to hear! I'm doing well too.",
      timestamp: "12:30",
      type: "received" as const,
    },
  ],
  "2": [
    {
      id: "msg4",
      content: "Thanks for all your help with the project!",
      timestamp: "11:40",
      type: "received" as const,
    },
    {
      id: "msg5",
      content: "You're very welcome! Happy to help anytime.",
      timestamp: "11:45",
      type: "sent" as const,
      status: "delivered" as const,
    },
  ],
  "3": [
    {
      id: "msg6",
      content: "Don't forget about our meeting tomorrow",
      timestamp: "Yesterday",
      type: "received" as const,
    },
    {
      id: "msg7",
      content: "See you tomorrow at 2 PM!",
      timestamp: "Yesterday",
      type: "sent" as const,
      status: "read" as const,
    },
  ],
};

const Index = () => {
  const [selectedChatId, setSelectedChatId] = useState<string>("1");

  const selectedChat = mockChats.find(chat => chat.id === selectedChatId);
  const chatMessages = selectedChatId ? mockMessages[selectedChatId as keyof typeof mockMessages] || [] : [];

  const handleSendMessage = (content: string) => {
    // This will be implemented with Supabase to actually save the message
    console.log("Sending message:", content);
    // For now, we could add it to the local state, but we'll implement this properly with Supabase
  };

  return (
    <div className="h-screen flex bg-background">
      {/* Chat List Sidebar */}
      <div className="w-80 flex-shrink-0">
        <ChatList
          chats={mockChats}
          selectedChatId={selectedChatId}
          onChatSelect={setSelectedChatId}
        />
      </div>

      {/* Chat Window */}
      <div className="flex-1">
        {selectedChat ? (
          <ChatWindow
            chatName={selectedChat.name}
            isOnline={selectedChat.isOnline}
            messages={chatMessages}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <div className="h-full flex items-center justify-center bg-chat-bg">
            <div className="text-center">
              <h2 className="text-2xl font-medium text-foreground mb-2">
                WhatsApp Web
              </h2>
              <p className="text-muted-foreground">
                Select a chat to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;