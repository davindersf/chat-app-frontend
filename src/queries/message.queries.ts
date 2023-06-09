import { MessageType } from "../types/message.types";
import { client } from "../utils/client.utils";

export async function getMessagesByChannelId(channelId: string) {
  const { data } = await client<MessageType[]>(
    `/messages?ChannelID=${channelId}`
  );
  return data;
}

export async function sendMessage(message: MessageType) {
  const { data } = await client.post<MessageType>("/messages", message);
  return data;
}
