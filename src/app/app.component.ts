import { Component } from '@angular/core';
import { Message } from './models';
import { DialogflowService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public message: Message;
  public messages: Message[];

  constructor(private dialogFlowService: DialogflowService) {
    this.message = new Message('', 'assets/images/user.png');
    this.messages = [
      new Message(
        'Welcome to chatbot universe',
        'assets/images/bot.png',
        this.dialogFlowService.format24Hour()
      ),
    ];
  }
}
