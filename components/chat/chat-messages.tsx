import { Fragment } from "react";
import { Member, Message, User } from "@prisma/client";
import { ChatWelcome } from "@/components/chat/chat-welcome";

type MessageWithMemberWithProfile = Message & {
  member: Member & { user: User };
};

export function ChatMessages({
  name,
  initialMessages,
}: {
  name: string;
  initialMessages: MessageWithMemberWithProfile[];
}) {
  return (
    <div className="flex-1 flex flex-col py-4 overflow-y-auto">
      {initialMessages.length <= 0 && (
        <>
          <div className="flex-1" />
          <ChatWelcome name={name} />
        </>
      )}
      <div className="flex flex-col-reverse mt-auto">
        {initialMessages.map((message, i) => (
          <Fragment key={i}>
            <p className="pb-2">{message.content}</p>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
