import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { Game } from './models/game';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  gameData!: Observable<any>

  constructor(private fs: Firestore, private router: Router) {
    
  }

  addGame(game: {}){
    const collectionInstance = collection(this.fs, 'games')
    addDoc(collectionInstance, game).then(() => {
      console.log('Data saved')
      this.router.navigate(['/'])
    }
   ).catch((err)=>console.log(err))
  }

  async getActionGames(){

    const app = initializeApp(environment.firebase)
    const db = getFirestore(app)
    const q = query(collection(db, 'games'), where('genre', '==', 'Action'))

    const snapshot = await getDocs(q)
    snapshot.forEach((doc) => {
      console.log(doc.data())
    })

  }
}
