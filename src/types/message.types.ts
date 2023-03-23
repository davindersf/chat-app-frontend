export type MessageType = {
  id?: string;
  subject?: string;
  body: string;
  toUserId?: string;
  channelId: string;
  channelType: string;
  createdBy?: string;
  createdOn?: Date;
};
