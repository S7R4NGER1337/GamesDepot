import { getLocaleNumberSymbol } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, linkWithPhoneNumber } from 'firebase/auth';

import { getDatabase, ref, set } from "firebase/database";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private fs: Firestore) {}

  register(email: string, password: string, name: string): void {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem('userId', user.uid)
        this.postUserIdInDb(user.uid, name)
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
    sessionStorage.clear()
  }

  async isThisUserExisting(uid: string | null) {
    const app = initializeApp(environment.firebase)
    const db = getFirestore(app)
    const q = query(collection(db, 'users'), where('id', '==', uid))
    const snapshot = await getDocs(q)

    if(snapshot.size > 0) {
      return true
    } else {
      return false
    }

  }

  async getUerDataById(id: string) {
    const arr: any = [];
    const app = initializeApp(environment.firebase);
    const db = getFirestore(app);
    const q = query(collection(db, 'users'), where('id', '==', id));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      const data = doc.data();
      
      arr.push(data);
    });

   return arr
  }


  async postUserIdInDb(id: string, name: string){
      const collectionInstance = collection(this.fs, 'users')
      await addDoc(collectionInstance, {id, name}).then(() => {
        this.router.navigate(['/'])
      }
     ).catch((err)=>console.log(err))
  }

  isLogedin() {
   const isLocalStorageFull = !!localStorage.getItem('userId')
   
   if(isLocalStorageFull){
    return true
    
   } else {
    return false
    
   }
  }
  
}
