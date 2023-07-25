import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})

export class TrendingComponent {
  
  constructor(private fs: Firestore){}

  addGame(game: any){
    const collectionInstance = collection(this.fs, 'games')
    addDoc(collectionInstance, game).then(() => {
      console.log('Data saved')
    }).catch((err)=>console.log(err))
  }
}
