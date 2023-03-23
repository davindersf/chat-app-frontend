import type { MessageType } from "../../types/message.types";

type MessageWithSender =MessageType & { sender: string };

export type MessageProps = {
  data: MessageWithSender 
};

export default function Message({ data }: MessageProps) {
  return (
    <div className="w-full px-4 rounded-lg bg-green-200">
      <p className="user-name">{data.sender}</p>
      <p className="user-message">{data.body}</p>
    </div>
  );
}
