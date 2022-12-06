import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../models';
import { DialogflowService } from '../../services';
import { FormControl } from '@angular/forms';
import { MatChip } from '@angular/material/chips';

@Component({
  selector: 'message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss'],
})
export class MessageFormComponent implements OnInit {
  @Input() options: string[] = [];

  @Input('message')
  private message: Message;

  @Input('messages')
  private messages: Message[];

  topics: string[] = [
    'Education',
    'Environment',
    'Politics',
    'Health',
    'ChitChat',
  ];

  selectedTopics = {
    Politics: false,
    Health: false,
    Education: false,
    Environment: false,
    ChitChat: false,
  };
  constructor(private dialogFlowService: DialogflowService) {}

  ngOnInit() {}

  toggleSelection(chip: MatChip) {
    this.selectedTopics[chip.value] = !this.selectedTopics[chip.value];
    console.log(this.selectedTopics);
    chip.toggleSelected();
    // this.getSelectedTopics();
  }

  getSelectedTopics() {
    let res = [];
    for (let key in this.selectedTopics) {
      if (this.selectedTopics[key]) {
        res.push(key);
      }
    }

    alert(res);
    return res;
  }

  public sendMessage(): void {
    if (this.message.content && this.message.content.trim() != '') {
      this.message.timestamp = this.dialogFlowService.format24Hour(); //new Date();
      this.messages.push(this.message);

      this.dialogFlowService
        .getResponse(this.message.content, this.getSelectedTopics)
        .subscribe((res) => {
          this.messages.push(
            new Message(
              res.result.fulfillment.speech,
              '../../../assets/images/bot.png',
              this.dialogFlowService.format24Hour(),
              true
            )
          );
        });

      this.message = new Message('', '../../../assets/images/user.png');
    }
  }
}

// topicControl = new FormControl([]);
// topicList: string[] = [
//   'Education',
//   'Environment',
//   'Politics',
//   'Health',
//   'Chit Chat',
// ];

// onTopicRemoved(removedTop: string) {
//   const topics = this.topicControl.value as string[];
//   this.removeFirst(topics, removedTop);
//   this.topicControl.setValue(topics); // To trigger change detection
// }

// private removeFirst<T>(array: T[], toRemove: T): void {
//   const index = array.indexOf(toRemove);
//   if (index !== -1) {
//     array.splice(index, 1);
//   }
// }
