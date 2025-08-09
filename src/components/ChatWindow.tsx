import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MoreVertical, Phone, Search, Send, Smile, Paperclip } from "lucide-react";
import { useState } from "react";
import { MessageBubble } from "./MessageBubble";

interface Message {
  id: string;
  content: string;
  timestamp: string;
  type: "sent" | "received";
  status?: "sent" | "delivered" | "read";
}

interface ChatWindowProps {
  chatName: string;
  isOnline?: boolean;
  messages: Message[];
  onSendMessage: (content: string) => void;
}

export function ChatWindow({ chatName, isOnline = false, messages, onSendMessage }: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-chat-bg">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-secondary border-b border-border">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="" />
            <AvatarFallback className="bg-whatsapp-teal text-white font-semibold">
              {chatName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-medium text-foreground">{chatName}</h2>
            <p className="text-xs text-muted-foreground">
              {isOnline ? "online" : "last seen recently"}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Search className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-foreground" />
          <Phone className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-foreground" />
          <MoreVertical className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-foreground" />
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-12 py-6" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}>
        <div className="space-y-3">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 bg-secondary border-t border-border">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            <Smile className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              placeholder="Type a message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="bg-muted border-none pr-12"
            />
          </div>
          
          <Button
            onClick={handleSendMessage}
            size="icon"
            className="bg-whatsapp-green hover:bg-whatsapp-green-dark text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}