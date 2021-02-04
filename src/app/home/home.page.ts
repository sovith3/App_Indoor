import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  data:any= {temperatura:"--", humedad:'--'};
  estadoRiegoAutomatico:boolean=true;
  luz:boolean=false;
  btnregar:boolean=true;

  constructor(private socket:Socket) {}

  ngOnInit() {
    this.socket.connect();
    
    this.socket.fromEvent('data').subscribe(data=>{
      this.data = data;
    })

    this.socket.fromEvent('regado').subscribe(data=>{
      console.log(data)
    })
  };

  riegoautomatico(){
    if(this.estadoRiegoAutomatico){
      this.estadoRiegoAutomatico = !this.estadoRiegoAutomatico;
      this.btnregar = !this.btnregar;
      this.socket.emit('regadoAutomatico', {estado:'on'});
    }else{
      this.btnregar = !this.btnregar;
      this.estadoRiegoAutomatico = !this.estadoRiegoAutomatico;
      this.socket.emit('regadoAutomatico', {estado:'off'});
    }
  }
    encenderLuz(){
    if(this.luz){
      this.luz = false;
      this.socket.emit('luz', {estado:'off'});
    }else{
      this.luz = true;
      this.socket.emit('luz', {estado:'on'});
    }
  }
  regar(){
    this.socket.emit('hidro', {estado:'on'});
  }
}