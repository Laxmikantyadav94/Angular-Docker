import { Component } from '@angular/core';
import * as  speechSDK   from 'speech-sdk';

//declare var speechSDK: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'angularDocker';
  async test(){
    let obj = new speechSDK.DeepSpeech();
    await obj.init();
    try{
          obj.recordAudio();
          setTimeout( async function(){
              let text= await obj.stopAudio();
              console.log("stop Audio resolved",text)
          }, 5000);
      }catch(err){
          console.log(err)
      }   
  }

}
