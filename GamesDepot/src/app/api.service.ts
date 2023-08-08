import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private fs: Firestore, private router: Router) {}

  addGame(game: {}) {
    const collectionInstance = collection(this.fs, 'games');
    addDoc(collectionInstance, game)
      .then(() => {
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
      const id = doc.id;
      const data = doc.data();
      data['id'] = id;
      arr.push(data);
    });

    const randomNumber = Math.floor(Math.random() * snapshot.size);
    const randomGame = [arr[randomNumber]];
    return randomGame;
  }

  async getGameById(id: string) {
    const arr = [];
    const db = getFirestore();
    const docRef = doc(db, 'games', id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    data!['id'] = docSnap.id
    arr.push(data, id);

    return arr;
  }

  async getGameByOwnerId(id: string) {
    const arr: any = [];
    const app = initializeApp(environment.firebase);
    const db = getFirestore(app);
    const q = query(collection(db, 'games'), where('ownerId', '==', id));
    const snapshot = await getDocs(q);

    snapshot.forEach((doc) => {
      const data = doc.data();
      data['id'] = doc.id;

      arr.push(data);
    });

    return arr;
  }

  async getTrendingGames() {
    const arr: any = [];
    let games: any = [];
    const app = initializeApp(environment.firebase);
    const db = getFirestore(app);
    const q = query(collection(db, 'games'), orderBy('views', 'desc'));
    const snapshot = await getDocs(q);

    snapshot.forEach((doc) => {
      const id = doc.id;
      const data = doc.data();
      data['id'] = id;
      arr.push(data);
      games = arr.slice(0, 4);
    });

    return games;
  }

  async addView(id: string) {
    const db = getFirestore();
    const docRef = doc(db, 'games', id);
    let myObj: any = {};

    await this.getGameById(id).then((res) => {
      myObj = res;
    });

    
    if(Number.isNaN(myObj[0].views)){
      myObj[0].views = 0
    }

    const update = { views: Number(myObj[0].views) + 1 };

    updateDoc(docRef, update);
  }

  async updateGame(id: string, data: any) {
    const db = getFirestore();
    const docRef = doc(db, 'games', id);
    await updateDoc(docRef, data);
    this.router.navigate(['game/', id]);
  }

  async getAllGames(page: any) {
    let arr: any = [];
    let mainArrLength: any = 0
    const db = getFirestore();
    const snapshot = await getDocs(collection(db, 'games'));
    snapshot.forEach((doc) => {
      const id = doc.id;
      const data = doc.data();
      data['id'] = id;
      arr.push(data);
    });

    if (page == 1) {
      const data = arr.slice(0, 12);
      return data;
    } else if (page == 2) {
      const data = arr.slice(12, 24);
      return data;
    } else if (page == 3) {
      const data = arr.slice(24, 36);
      return data;
    }

  }

  async getGamesByCategory(category: string, page: number){
    const arr: any = [];
    const app = initializeApp(environment.firebase);
    const db = getFirestore(app);
    
    const q = query(collection(db, 'games'), where('genre', '==', category));
    const snapshot = await getDocs(q);
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      data['id'] = doc.id;

      arr.push(data);
    });

    return arr;
  }

  async deleteGame(id: string) {
    const db = getFirestore();
    const docRef = doc(db, 'games', id);
    await deleteDoc(docRef)
  }
}
