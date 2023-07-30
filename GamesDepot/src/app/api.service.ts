import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
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
      const data = doc.data();
      arr.push(data);
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
}
