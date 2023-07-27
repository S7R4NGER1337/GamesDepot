import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { Game } from './models/game';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private fs: Firestore) { }

  addGame(game: {}){
    const collectionInstance = collection(this.fs, 'games')
    addDoc(collectionInstance, game).then(() => {
      console.log('Data saved')
    }).catch((err)=>console.log(err))
  }

}
