import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { getDatabase, ref, set } from "firebase/database";
import { addDoc, collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private fs: Firestore) {}

  register(email: string, password: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;    
        localStorage.setItem('userId', user.uid)
        this.postUserIdInDb(user.uid)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  login(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem('userId', user.uid);
        this.router.navigate([''])
        location.reload()
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      }); 
  }

  logout(): void {
    localStorage.clear()
  }

  async isThisUserExisting(uid: string | null) {
    const arr: any = []
    const app = initializeApp(environment.firebase)
    const db = getFirestore(app)
    const q = query(collection(db, 'users'), where('id', '==', uid))
    const snapshot = await getDocs(q)
    snapshot.forEach((doc) => {
      const data = doc.data()
      arr.push(data)
    })
    
    if(arr.length === 0){
      return false
    }

    
    return true
  }

  async postUserIdInDb(id: string){
      const collectionInstance = collection(this.fs, 'users')
      await addDoc(collectionInstance, {id}).then(() => {
        console.log('Data saved')
        this.router.navigate(['/'])
      }
     ).catch((err)=>console.log(err))
  }
  
}
