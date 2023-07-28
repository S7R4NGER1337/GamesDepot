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
    const arr: any = []
    const app = initializeApp(environment.firebase)
    const db = getFirestore(app)
    const q = query(collection(db, 'games'), where('genre', '==', 'Action'))
    const snapshot = await getDocs(q)
    
    snapshot.forEach((doc) => {
      const data = doc.data()
      arr.push(data)
    })
    const randomNumber = Math.floor(Math.random() * snapshot.size)
    const randomGame = arr[randomNumber]

    return randomGame   
  }

  async getAdventureGame(){
    const arr: any = []
    const app = initializeApp(environment.firebase)
    const db = getFirestore(app)
    const q = query(collection(db, 'games'), where('genre', '==', 'Adventure'))
    const snapshot = await getDocs(q)
    
    snapshot.forEach((doc) => {
      const data = doc.data()
      arr.push(data)
    })
    const randomNumber = Math.floor(Math.random() * snapshot.size)
    const randomGame = arr[randomNumber]

    return randomGame  
  }

  async getStrategyGame(){
    const arr: any = []
    const app = initializeApp(environment.firebase)
    const db = getFirestore(app)
    const q = query(collection(db, 'games'), where('genre', '==', 'Strategy'))
    const snapshot = await getDocs(q)
    
    snapshot.forEach((doc) => {
      const data = doc.data()
      arr.push(data)
    })

    const randomNumber = Math.floor(Math.random() * snapshot.size)
    const randomGame = arr[randomNumber]

    return randomGame  
  }

  async getRacingGame(){
    const arr: any = []
    const app = initializeApp(environment.firebase)
    const db = getFirestore(app)
    const q = query(collection(db, 'games'), where('genre', '==', 'Racing'))
    const snapshot = await getDocs(q)
    
    snapshot.forEach((doc) => {
      const data = doc.data()
      arr.push(data)
    })
    
    const randomNumber = Math.floor(Math.random() * snapshot.size)
    const randomGame = arr[randomNumber]

    return randomGame  
  }

  async getSportsGame(){
    const arr: any = []
    const app = initializeApp(environment.firebase)
    const db = getFirestore(app)
    const q = query(collection(db, 'games'), where('genre', '==', 'Sport-Games'))
    const snapshot = await getDocs(q)
    
    snapshot.forEach((doc) => {
      const data = doc.data()
      arr.push(data)
    })
    
    const randomNumber = Math.floor(Math.random() * snapshot.size)
    const randomGame = arr[randomNumber]

    return randomGame  
  }
}
