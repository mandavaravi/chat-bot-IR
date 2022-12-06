import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { environment } from '../.././environments/environment';
import { Message } from '@app/models';

@Injectable()
export class DialogflowService {
  private baseURL: string = 'https://api.dialogflow.com/v1/query?v=20150910';
  private token: string = environment.token;
  // private messagesSer: Message[] = [];

  constructor(private http: Http) {}

  public getResponse(query: string, topicsList) {
    let data = {
      query: query,
      topics: topicsList,
    };
    return this.http.post(`${this.baseURL}`, data).map((res) => {
      return res.json();
    });
  }

  public getHeaders() {
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${this.token}`);
    return headers;
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

  public updateLocalMessages(newMsg) {
    let messagesSer: Message[] = JSON.parse(localStorage.getItem('msgsList'))
      ? JSON.parse(localStorage.getItem('msgsList'))
      : [];
    // messagesSer.push(JSON.parse(localStorage.getItem('msgsList')));
    messagesSer.push(newMsg);
    localStorage.setItem('msgsList', JSON.stringify(messagesSer));
    this.doSomething(messagesSer);
    // alert('dial ser  - ' + localStorage.getItem('msgsList'));
  }

  public getLocalMessages(): Message[] {
    let messagesSer = JSON.parse(localStorage.getItem('msgsList'));
    return messagesSer;
  }

  public onNewMsg: EventEmitter<any> = new EventEmitter();

  public doSomething(messages) {
    // do something, then...
    this.onNewMsg.emit({ messages: messages });
  }
}
