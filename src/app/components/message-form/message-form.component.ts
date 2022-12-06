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
  options: string[] = [];

  // @Input('message')
  private message: Message = new Message(
    '',
    'assets/images/user.png',
    '',
    false
  );

  // @Input('messages')
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
  constructor(private dialogFlowService: DialogflowService) {
    // alert('----------', JSON.stringify(this.messages));
    this.messages = this.dialogFlowService.getLocalMessages();
    // alert('+++++++++++++', JSON.stringify(this.messages));
  }

  ngOnInit() {}

  toggleSelection(chip: MatChip) {
    this.selectedTopics[chip.value] = !this.selectedTopics[chip.value];
    console.log(this.selectedTopics);
    chip.toggleSelected();
  }

  getSelectedTopics() {
    let res = [];
    for (let key in this.selectedTopics) {
      if (this.selectedTopics[key]) {
        res.push(key);
      }
    }
    return res;
  }

  public sendMessage(): void {
    // alert('%%%%%');
    this.messages = this.dialogFlowService.getLocalMessages();
    if (this.message.content && this.message.content.trim() != '') {
      alert('%%%%%' + JSON.stringify(this.message));
      // // alert(JSON.stringify(this.message));
      // this.message.timestamp = this.dialogFlowService.format24Hour(); //new Date();
      this.messages.push(this.message);
      // // alert(JSON.stringify(this.messages));
      // this.dialogFlowService
      //   .getResponse(this.message.content, this.getSelectedTopics())
      //   .subscribe((res) => {
      //     this.messages.push(
      //       new Message(
      //         res.result.fulfillment.speech,
      //         '../../../assets/images/bot.png',
      //         this.dialogFlowService.format24Hour(),
      //         true
      //       )
      //     );
      //   });

      // this.message = new Message(
      //   '',
      //   '../../../assets/images/user.png',
      //   '',
      //   false
      // );
      this.dialogFlowService.updateLocalMessages(this.message);
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
