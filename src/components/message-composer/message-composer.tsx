import { useState } from "react";
import { sendMessage } from "../../queries/message.queries";
import { MessageType } from "../../types/message.types";
import { MessageWithSender } from "../message/message";

type MessageComposerProps = {
  channelId: string;
  username: string;
  onMessageSuccess: (message: MessageWithSender) => void;
  disabled?: boolean;
};

export default function MessageComposer({
  channelId,
  username,
  onMessageSuccess,
  disabled,
}: MessageComposerProps) {
  const [text, setText] = useState<string>("");

  function handleSendMessage() {
    if (!text) {
      return;
    }
    const message: MessageType = {
      body: text,
      channelId,
      toUserId: channelId,
      channelType: "0",
      subject: username,
    };

    sendMessage(message).then((data) => {
      console.log(data);
      const updateMessage: MessageWithSender = {
        ...data,
        sender: username,
      };
      onMessageSuccess(updateMessage);
    });
  }

  return (
    <div className="flex items-center justify-center gap-4">
      <input
        type="text"
        placeholder="write..."
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        className="w-full rounded-lg ring-1 px-2 disabled:opacity-50"
        disabled={!disabled}
      />
      <button
        onClick={handleSendMessage}
        className="rounded-lg ring-1 px-2 bg-gray-200 disabled:opacity-50"
        disabled={!disabled}
      >
        Send
      </button>
    </div>
  );
}
