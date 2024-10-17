"use client";

import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusherClient";
import { Member, Message, User } from "@prisma/client";
import { ChatWelcome } from "@/components/chat/chat-welcome";

type MessageWithMemberWithProfile = Message & {
  member: Member & { user: User };
};

export function ChatMessages({
  name,
  initialMessages,
  channelId,
}: {
  name: string;
  initialMessages: MessageWithMemberWithProfile[];
  channelId: string;
}) {
  const [incomingMessages, setIncomingMessages] = useState(initialMessages);

  useEffect(() => {
    pusherClient.unsubscribe(channelId);
    pusherClient.subscribe(channelId);

    const messageHandler = (newMessage: MessageWithMemberWithProfile) => {
      setIncomingMessages((prev) => [...prev, newMessage]);
    };

    pusherClient.bind("incoming-message", messageHandler);

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
            <p className="pb-2">
              <strong>{message.member.user.name}:</strong> {message.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
