import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { Game } from './models/game';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private fs: Firestore, private router: Router) { }

  addGame(game: {}){
    const collectionInstance = collection(this.fs, 'games')
    addDoc(collectionInstance, game).then(() => {
      console.log('Data saved')
      this.router.navigate(['/'])
    }
   ).catch((err)=>console.log(err))
  }

}
