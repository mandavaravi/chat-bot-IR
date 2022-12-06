export class Message {
  content: string;
  timestamp: string;
  avatar: string;
  isBot: boolean;

  constructor(
    content: string,
    avatar: string,
    timestamp: string,
    isBot: boolean
  ) {
    this.content = content;
    this.timestamp = timestamp;
    this.avatar = avatar;
    this.isBot = isBot;
  }
}
