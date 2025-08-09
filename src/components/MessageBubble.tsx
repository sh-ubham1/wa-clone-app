import { Check, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  timestamp: string;
  type: "sent" | "received";
  status?: "sent" | "delivered" | "read";
}

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isSent = message.type === "sent";

  const StatusIcon = () => {
    if (!isSent || !message.status) return null;

    switch (message.status) {
      case "sent":
        return <Check className="h-4 w-4 text-status-sent" />;
      case "delivered":
        return <CheckCheck className="h-4 w-4 text-status-delivered" />;
      case "read":
        return <CheckCheck className="h-4 w-4 text-status-read" />;
      default:
        return null;
    }
  };

  return (
    <div className={cn(
      "flex",
      isSent ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[70%] rounded-lg px-3 py-2 relative group",
        isSent 
          ? "bg-message-sent text-white rounded-br-sm" 
          : "bg-message-received text-foreground rounded-bl-sm",
        "hover:shadow-md transition-all duration-200"
      )}>
        <p className="text-sm leading-relaxed break-words">
          {message.content}
        </p>
        <div className={cn(
          "flex items-center gap-1 mt-1",
          isSent ? "justify-end" : "justify-start"
        )}>
          <span className={cn(
            "text-xs opacity-70",
            isSent ? "text-white" : "text-muted-foreground"
          )}>
            {message.timestamp}
          </span>
          <StatusIcon />
        </div>
      </div>
    </div>
  );
}