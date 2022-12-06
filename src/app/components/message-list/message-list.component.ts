import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ViewChild,
  ViewChildren,
  QueryList,
  ElementRef,
} from '@angular/core';
import { Message } from '../../models';
import { MessageItemComponent } from '../../components/message-item/message-item.component';
import { DialogflowService } from '../../services/dialogflow.service';
// import { DialogflowService } from '@app/services';

@Component({
  selector: 'message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent implements OnInit, AfterViewInit {
  @Input('messages')
  private messages: Message[];

  @ViewChild('chatlist', { read: ElementRef }) chatList: ElementRef;
  @ViewChildren(MessageItemComponent, { read: ElementRef })
  chatItems: QueryList<MessageItemComponent>;

  constructor(private dialogFlowService: DialogflowService) {
    this.messages = this.dialogFlowService.getLocalMessages();
    // alert(
    //   'app comp   -  ' +
    //     JSON.stringify(this.dialogFlowService.getLocalMessages())
    // );
    this._serviceSubscription = this.dialogFlowService.onNewMsg.subscribe({
      next: (event: any) => {
        console.log(`Received message ${event.messages}`);
        this.messages = event.messages;
        // this.cleanup();
      },
    });
    console.clear();
    console.log(this.messages);
  }

  private cleanup() {
    this._serviceSubscription.unsubscribe();
  }

  public _serviceSubscription;
  ngAfterViewInit() {
    this.chatItems.changes.subscribe((elements) => {
      // console.log('messsage list changed: ' + this.messages.length);
      this.scrollToBottom();
    });

    alert('-----------------------------------------');
    this.messages = this.dialogFlowService.getLocalMessages();
  }

  private scrollToBottom(): void {
    try {
      this.chatList.nativeElement.scrollTop =
        this.chatList.nativeElement.scrollHeight;
    } catch (err) {
      console.log('Could not find the "chatList" element.');
    }
  }

  ngOnInit() {}
}
