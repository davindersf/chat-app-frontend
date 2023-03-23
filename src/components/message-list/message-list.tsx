import { MessageType } from "../../types/message.types";
import { User } from "../../types/user.types";
import { getUser } from "../../utils/user.utils";
import Message from "../message";
import { MessageProps } from "../message/message";


export type MessageListProps = {
  data: MessageProps['data'][];
  userTenantId: string;
};

export default function MessageList({ data, userTenantId }: MessageListProps) {
  const user = getUser();
  console.log(user);
  return (
    <div className="w-full min-h-[400px] h-full">
      <ul className="w-full h-full space-y-2">
        {data.map((message) => (
          <li
            key={message.id}
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
