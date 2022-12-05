export class Message {
  content: string;
  timestamp: string;
  avatar: string;

  constructor(content: string, avatar: string, timestamp?: string) {
    this.content = content;
    this.timestamp = timestamp;
    this.avatar = avatar;
  }
}
