import { Component, OnInit } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';  


@Component({
  selector: 'app-my-chat',
  templateUrl: './my-chat.component.html',
  styleUrls: ['./my-chat.component.css']
})
export class MyChatComponent implements OnInit {

  
  private websocket : WebSocket;

  public InptMessage : any;
  public Nome : any;

  constructor() {

    let wsUri = "ws://localhost:52080/api/SokestCon/Conect";
    this.websocket = new WebSocket(wsUri);
    this.websocket.onopen = (evt) => { this.onOpen(evt) };
    this.websocket.onclose = (evt) => { this.onClose(evt) };
    this.websocket.onmessage = (evt) => { this.onMessage(evt) };
    this.websocket.onerror = (evt) => { this.onError(evt) };

   }

  ngOnInit() {

    this.InptMessage = '';
    this.Nome = null;

  }












   onOpen(evt)
  {
    console.log("CONNECTED");
    // doSend("WebSocket rocks");
  }

   onClose(evt)
  {
    console.log("DISCONNECTED" );
    console.log(evt);
  }

   onMessage(evt)
  {
    console.log("RECEVIDE => onMessage");
    console.log(evt);
    console.log(evt.data);

    console.log( JSON.parse(evt.data) );
    //this.websocket.close(); //** para fechar web sokest  */
  }

   onError(evt)
  {
    console.log( evt.data);
  }

  
  doSend(message : string)
  {
    
    let MSG;
    
    if(this.Nome == null ){
      this.Nome = message;
      MSG = {
        'MSG' : "CREATE",
        'Nome' : message
      }
      
      console.log("C doSend => " , MSG);
      this.websocket.send(JSON.stringify(MSG));
 
    }else{
      
      MSG = { 'MSG' : message, 'Nome' : this.Nome  }

      console.log("doSend => " , JSON.stringify(MSG));
      this.websocket.send(JSON.stringify(MSG));
    }
    
    
    this.InptMessage = '';
  }
  
  writeToScreen(M){
    console.log(M)
  }


}
