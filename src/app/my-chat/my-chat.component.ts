import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';  
import { SERVER_TRANSITION_PROVIDERS } from '@angular/platform-browser/src/browser/server-transition';


@Component({
  selector: 'app-my-chat',
  templateUrl: './my-chat.component.html',
  styleUrls: ['./my-chat.component.css']
})
export class MyChatComponent implements OnInit {

  @ViewChild('msgListDiv') private myScrollContainer: ElementRef;
  
  private websocket : WebSocket;

  public InptMessage : any;
  public Nome : any;

  public USER : any;

  IMGDispon : any;

  MSGIMPSENDMSG : any;

  ListaMenssages:any;
  ListaUsuarios:any;
  ListaUsuariosIMGs:any;



  constructor() {

    let wsUri = "ws://localhost:52080/api/SokestCon/Conect";
    // let wsUri = "ws://chatwebdayvson.azurewebsites.net/api/SokestCon/Conect";
    this.websocket = new WebSocket(wsUri);
    this.websocket.onopen = (evt) => { this.onOpen(evt) };
    this.websocket.onclose = (evt) => { this.onClose(evt) };
    this.websocket.onmessage = (evt) => { this.onMessage(evt) };
    this.websocket.onerror = (evt) => { this.onError(evt) };

    this.IMGDispon = [];
    this.IMGDispon.push("charlesforstman.png");
    this.IMGDispon.push("danielhardman.png");
    this.IMGDispon.push("donnapaulsen.png");
    this.IMGDispon.push("haroldgunderson.png");
    this.IMGDispon.push("harveyspecter.png");
    this.IMGDispon.push("jessicapearson.png");
    this.IMGDispon.push("jonathansidwell.png");
    this.IMGDispon.push("katrinabennett.png");
    this.IMGDispon.push("louislitt.png");
    this.IMGDispon.push("mikeross.png");
    this.IMGDispon.push("rachelzane.png");

    this.USER = {
      Nome : this.Nome,
      IMG : this.IMGDispon[Math.floor(Math.random() * 11)],
      status : 'off-online'
    }


    this.ListaMenssages =[];
    this.ListaUsuarios = [];
   }

  ngOnInit() {

    this.ListaMenssages = [];
    this.InptMessage = '';
    this.Nome = null;
    this.MSGIMPSENDMSG = 'Digite seu Nome';

    console.log("INICIO");
    console.log(this.USER);

  }

  IniChatConfig(IMG){
    this.USER = {
      Nome : this.Nome,
      IMG : this.IMGDispon[IMG],
      status : 'online'
    }

  }












   onOpen(evt)
  {
    console.log("CONNECTED");
    // doSend("WebSocket rocks");
    let MSGADD = {
      MSG : "CONECTADO - Digite seu nome para iniciar!",
      IMG : "SERVER.PNG",
      MsgSend : "sent", // replies or sent
    }

    this.ListaMenssages.push(MSGADD);

    // this.IniChatConfig();



  }

   onClose(evt)
  {
    console.log("DISCONNECTED" );
    console.log(evt);
  }

   onMessage(evt)
  {
    if(this.Nome!= null){
      this.MSGIMPSENDMSG = "Escreva suas messagens!";
    }
 

    console.log("RECEVIDE => onMessage");
    // console.log(evt);
    console.log(evt.data);

    // console.log( JSON.parse(evt.data) );

    try{

      let MSGServ = JSON.parse(evt.data);

      console.log("==========================="); console.log("===========================");
      console.log(MSGServ);
      console.log("===========================");
 

      if(typeof MSGServ.USER == 'undefined'){
        return true;
      }
 
 
      if(MSGServ.USER == "SERVER"  ){

        if(MSGServ.CONFIG &&  MSGServ.CONFIG == 'STATUS'  ){
          console.log("estatus on");
          return true;

        }

        
 
        let USERADD = {
          IMG : this.IMGDispon[MSGServ.IMG],
          NOME :  MSGServ.NOME,
        } 
    
        if(this.Nome == MSGServ.NOME && this.USER.status == 'off-online'){
          this.IniChatConfig(MSGServ.IMG);
        }

        let UserOnExiste = [];
        
        for (let index = 0; index < this.ListaUsuarios.length; index++) {
          const element = this.ListaUsuarios[index];
          UserOnExiste.push(element.NOME);
        }

        if(UserOnExiste.indexOf(USERADD.NOME) == -1){
          this.ListaUsuarios.push(USERADD);
        }

        this.ListaUsuariosIMGs = [];
        this.ListaUsuarios.forEach(element => {
            this.ListaUsuariosIMGs[element.NOME] = element.IMG;
        });

      }else{

        let tipoMSG = "sent";
        if(this.Nome == MSGServ.USER){
          tipoMSG = "replies";
        }

        console.log(this.Nome ,MSGServ.NOME);

        let MSGADD = {
          MSG : MSGServ.MSG,
          IMG : MSGServ.IMG,
          MsgSend : tipoMSG, // replies or sent
  
        } 
    
        console.log(MSGADD);

        this.ListaMenssages.push(MSGADD);
      }



      
    }catch{

    }


  
    this.scrolDown();

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
      this.MSGIMPSENDMSG = "Escreva suas messagens!";
     


      MSG = { 'MSG' : message, 'Nome' : this.Nome , 'IMG' : this.USER.IMG }

      console.log("doSend => " , JSON.stringify(MSG));
      this.websocket.send(JSON.stringify(MSG));
    }
    
    
    this.InptMessage = '';


  }
  
  writeToScreen(M){
    console.log(M)
  }


  scrolDown(){
    //var objDiv = document.querySelector("#msgListDiv");
    // console.log(objDiv.scrollHeight);
    //let numMsg = this.ListaMenssages.length;
    //objDiv.scrollTop = objDiv.scrollHeight +( parseInt(numMsg) *100);

    try {
      console.log(this.myScrollContainer.nativeElement.scrollHeight);
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }   
  }

}
