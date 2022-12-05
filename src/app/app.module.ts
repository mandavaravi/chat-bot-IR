import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { DialogflowService } from './services';
import {
  MessageListComponent,
  MessageFormComponent,
  MessageItemComponent,
} from './components';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    AppComponent,
    MessageListComponent,
    MessageFormComponent,
    MessageItemComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [MatIconModule, MatButtonModule],
  providers: [DialogflowService],
  bootstrap: [AppComponent],
})
export class AppModule {}
