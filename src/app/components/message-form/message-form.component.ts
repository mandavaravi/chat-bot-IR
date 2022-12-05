import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../models';
import { DialogflowService } from '../../services';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss'],
})
export class MessageFormComponent implements OnInit {
  @Input('message')
  private message: Message;

  @Input('messages')
  private messages: Message[];

  topicControl = new FormControl([]);
  topicList: string[] = [
    'Education',
    'Environment',
    'Politics',
    'Health',
    'Chit Chat',
  ];

  constructor(private dialogFlowService: DialogflowService) {}

  ngOnInit() {}

  onTopicRemoved(removedTop: string) {
    const topics = this.topicControl.value as string[];
    this.removeFirst(topics, removedTop);
    this.topicControl.setValue(topics); // To trigger change detection
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  public formatHour(input) {
    if (input > 12) {
      return input - 12;
    }
    return input;
  }

  public formatData(input) {
    if (input > 9) {
      return input;
    } else return `0${input}`;
  }

  public format24Hour() {
    const date = new Date();
    const format = {
      dd: this.formatData(date.getDate()),
      mm: this.formatData(date.getMonth() + 1),
      yyyy: date.getFullYear(),
      HH: this.formatData(date.getHours()),
      hh: this.formatData(this.formatHour(date.getHours())),
      MM: this.formatData(date.getMinutes()),
      SS: this.formatData(date.getSeconds()),
    };

    return this.dateToString(format);
  }

  public dateToString({ dd, mm, yyyy, hh, MM, SS }) {
    var sentAt = `${mm}/${dd} - ${hh}:${MM}`;
    return sentAt;
  }

  public sendMessage(): void {
    if (this.message.content && this.message.content.trim() != '') {
      this.message.timestamp = this.format24Hour(); //new Date();
      this.messages.push(this.message);

      this.dialogFlowService
        .getResponse(this.message.content)
        .subscribe((res) => {
          this.messages.push(
            new Message(
              res.result.fulfillment.speech,
              '../../../assets/images/bot.png',
              res.timestamp
            )
          );
        });

      this.message = new Message('', '../../../assets/images/user.png');
    }
  }
}
