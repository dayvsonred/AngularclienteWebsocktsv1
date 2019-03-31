import { Component, OnInit } from '@angular/core';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import { webSocket } from 'rxjs/webSocket';    



export class Message {
  constructor(
      public sender: string,
      public content: string,
      public isBroadcast = false,
  ) { }
}

@Component({
  selector: 'app-my-new-component',
  templateUrl: './my-new-component.component.html',
  styleUrls: ['./my-new-component.component.css']
})
export class MyNewComponentComponent implements OnInit {


  public serverMessages = new Array<Message>();

  public clientMessage = '';
  public isBroadcast = false;
  public sender = '';

  private socket$: WebSocketSubject<any>;



  constructor() {

    //this.socket$ = new WebSocketSubject('ws://localhost:8088');

    // this.socket$ = new WebSocketSubject('ws://localhost:8080/api/Publicador/Assinar');

    this.socket$ = new WebSocketSubject('ws://localhost:52080/api/SokestCon/Conect');


    

    this.socket$
        .subscribe(
        (message) => { this.serverMessages.push(message); this.OnMSG(message); /* && this.scroll() */} ,
        (err) => console.error(err),
        () => console.warn('Completed!')
        );


   }

  ngOnInit() {

    console.log("okok");
  }


  OnMSG(M){

    console.log(M);

 
  }


  public send(): void {
    const message = new Message(this.sender, this.clientMessage, this.isBroadcast);

    if(this.clientMessage == "dayvson"){
      this.socket$.next(this.clientMessage);
    }
    this.serverMessages.push(message);
    this.socket$.next("dayvson");
    this.clientMessage = '';
 
  }

}
