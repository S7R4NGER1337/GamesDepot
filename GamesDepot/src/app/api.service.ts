import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private fs: Firestore,
    private router: Router,) {}

  addGame(game: {}) {
    const collectionInstance = collection(this.fs, 'games');
    addDoc(collectionInstance, game)
      .then(() => {
        console.log('Data saved');
        this.router.navigate(['/']);
      })
      .catch((err) => console.log(err));
  }

  async getRandomGame(category: string) {
    const arr: any = [];
    const app = initializeApp(environment.firebase);
    const db = getFirestore(app);
    const q = query(collection(db, 'games'), where('genre', '==', category));
    const snapshot = await getDocs(q); 
    snapshot.forEach((doc) => {
      const id = doc.id
      const data = doc.data();
      arr.push([id, data]);
    });

    const randomNumber = Math.floor(Math.random() * snapshot.size);
    const randomGame = arr[randomNumber];

    return randomGame;
  }

  async getGameById(id: string) {
    const db = getFirestore()
    const docRef = doc(db, "games", id)
    const docSnap = await getDoc(docRef)
    const data = docSnap.data()

    return data
  }

  async getTrendingGames() {
    const arr: any = []
    let games: any = []
    const app = initializeApp(environment.firebase);
    const db = getFirestore(app);
    const q = query(collection(db, 'games'), orderBy('views', 'desc'));
    const snapshot = await getDocs(q); 
    
    snapshot.forEach((doc) => {
      const id = doc.id
      const data = doc.data();
      data['id'] = id
      arr.push(data) 
      games = arr.slice(0, 4)
      
    });
   
    return games
  }

  async addView(id: string){
    const db = getFirestore()
    const docRef = doc(db, "games", id)
    let myObj: any = {}

   await this.getGameById(id).then((res) => {
      myObj = res
    })

    const update = {views: Number(myObj.views) + 1}

     updateDoc(docRef, update)

  }
}
