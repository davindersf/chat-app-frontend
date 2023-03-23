import Message from "../message";
import { MessageWithSender } from "../message/message";

export type MessageListProps = {
  data: MessageWithSender[];
  userTenantId: string;
};

export default function MessageList({ data, userTenantId }: MessageListProps) {
  return (
    <div className="w-full min-h-[400px] h-full">
      <ul className="w-full h-full space-y-2">
        {data.map((message, idx) => (
          <li
            key={idx}
            className={`max-w-[70%] ${
              message.createdBy === userTenantId ? "ml-auto" : "mr-auto"
            }`}
          >
            <Message data={message} />
          </li>
        ))}
      </ul>
    </div>
  );
}
