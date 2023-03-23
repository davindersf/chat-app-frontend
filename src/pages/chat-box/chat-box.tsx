import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socketIO, { Socket } from "socket.io-client";
import MessageComposer from "../../components/message-composer";
import MessageList from "../../components/message-list";
import { MessageListProps } from "../../components/message-list/message-list";
import { MessageWithSender } from "../../components/message/message";
import { CHAT_ROOM, SOCKET_ENDPOINT } from "../../constants/env-vars.constants";
import { getMessagesByChannelId } from "../../queries/message.queries";
import { getUserTenantId } from "../../queries/user.queries";
import { MessageType } from "../../types/message.types";
import {
  removeAccessToken,
  removeRefreshToken,
} from "../../utils/session-storage";
import { getUser } from "../../utils/user.utils";

export default function ChatBox() {
  const user = getUser();
  const username = user?.firstName;
  const navigate = useNavigate();
  const [isChatRoomActive, setIsChatRoomActive] = useState(false);
  const [userTenantId, setUserTenantId] = useState<string>();
  const [messages, setMessages] = useState<MessageWithSender[]>([]);
  let socket: Socket;

  function subscribeToNotification() {
    socket = socketIO(SOCKET_ENDPOINT, {
      path: "/socket.io",
      transports: ["polling"],
      upgrade: false,
    });

    socket.on("connect", () => {
      const chatRooms = [CHAT_ROOM];
      socket.emit("subscribe-to-channel", chatRooms);
    });

    socket.on(
      "userNotif",
      (notification: { subject: string; body: string; messageId: string }) => {
        console.log(notification);
        const updatedMessage: MessageWithSender = {
          ...notification,
          channelId: CHAT_ROOM,
          channelType: "0",
          sender: notification.subject,
          id: notification.messageId,
        };

        if (
          notification.subject.trim().toLowerCase() !==
          user?.firstName.trim().toLowerCase()
        ) {
          setMessages((prev) => [...prev, updatedMessage]);
        }
      }
    );
  }

  function getMessages() {
    getMessagesByChannelId(CHAT_ROOM).then((data) => {
      const modifiedData = data.map((message) => {
        if (message.subject === userTenantId) {
          return { ...message, sender: username ?? "" };
        }
        return { ...message, sender: message.subject ?? "" };
      });

      setMessages(modifiedData);
      setIsChatRoomActive(true);
      subscribeToNotification();
    });
  }

  useEffect(function updateUserTenantId() {
    getUserTenantId().then((data) => {
      setUserTenantId(data);
    });
  }, []);

  function handleOnLeave() {
    setMessages([]);
    setIsChatRoomActive(false);
    socket.disconnect();
  }

  function handleOnLogout() {
    removeAccessToken();
    removeRefreshToken();
    navigate("/login");
  }

  function handleAddMessageToList(message: MessageWithSender) {
    setMessages((prev) => [...prev, message]);
  }

  return (
    <div className="w-full h-full py-4">
      <div className="w-full h-full flex flex-col">
        <header className="mb-8">
          <h4 className="text-xl mb-4 font-medium">
            {[user?.firstName, user?.middleName, user?.lastName]
              .filter(Boolean)
              .map((name) => name?.trim())
              .join(" ")}
          </h4>
          <div className="w-full flex items-center gap-x-4">
            <button
              className="ring-1 ring-green-600 rounded-lg px-2 bg-green-200"
              onClick={getMessages}
            >
              join ({`${CHAT_ROOM}`})
            </button>
            <button
              className="ring-1 ring-red-600 rounded-lg px-2 bg-red-200"
              onClick={handleOnLeave}
            >
              leave
            </button>
            <button
              className="ring-1 ring-blue-600 rounded-lg px-2 bg-blue-200"
              onClick={handleOnLogout}
            >
              logout
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {userTenantId ? (
            <MessageList data={messages} userTenantId={userTenantId} />
          ) : (
            "Loading..."
          )}
        </div>

        <MessageComposer
          channelId={CHAT_ROOM}
          username={username!}
          onMessageSuccess={handleAddMessageToList}
          disabled={isChatRoomActive}
        />
      </div>
    </div>
  );
}
