import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { UserModule } from './user/user.module';
import { AngularFireModule } from '@angular/fire/compat';
import { CoreModule } from './core/core.module';
import { FormsModule } from '@angular/forms';
import { ApiService } from './api.service';
import { AuthService } from './user/auth.service';
import { SharedModule } from './shared/shared.module';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { HomeModule } from './home/home.module';


@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    UserModule,
    CoreModule,
    HomeModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [
    ApiService,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
