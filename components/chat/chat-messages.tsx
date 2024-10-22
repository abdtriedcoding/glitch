"use client";

import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher-client";
import { Member, Message, User } from "@prisma/client";
import { ChatItem } from "@/components/chat/chat-item";
import { ChatWelcome } from "@/components/chat/chat-welcome";

type MessageWithMemberWithProfile = Message & {
  member: Member & { user: User };
};

export function ChatMessages({
  name,
  initialMessages,
  channelId,
  serverId,
  currentMember,
}: {
  name: string;
  initialMessages: MessageWithMemberWithProfile[];
  channelId: string;
  serverId: string;
  currentMember: Member;
}) {
  const [incomingMessages, setIncomingMessages] = useState(initialMessages);

  useEffect(() => {
    pusherClient.unsubscribe(channelId);
    pusherClient.subscribe(channelId);

    const messageHandler = (newMessage: MessageWithMemberWithProfile) => {
      setIncomingMessages((prev) => [...prev, newMessage]);
    };

    pusherClient.bind("incoming-message", messageHandler);

    pusherClient.bind(
      "message-updated",
      (updatedMessage: MessageWithMemberWithProfile) => {
        setIncomingMessages((prev) =>
          prev.map((message) =>
            message.id === updatedMessage.id ? updatedMessage : message
          )
        );
      }
    );

    pusherClient.bind(
      "message-deleted",
      (updatedMessage: MessageWithMemberWithProfile) => {
        setIncomingMessages((prev) =>
          prev.map((message) =>
            message.id === updatedMessage.id ? updatedMessage : message
          )
        );
      }
    );

    return () => {
      pusherClient.unbind("incoming-message", messageHandler);
      pusherClient.unsubscribe(channelId);
    };
  }, [channelId]);

  return (
    <div className="flex-1 flex flex-col py-4 overflow-y-auto">
      {initialMessages.length <= 0 && (
        <>
          <div className="flex-1" />
          <ChatWelcome name={name} />
        </>
      )}
      <div className="flex flex-col mt-auto">
        {incomingMessages.map((message, i) => (
          <div key={i}>
            <ChatItem
              channelId={channelId}
              serverId={serverId}
              message={message}
              currentMember={currentMember}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
