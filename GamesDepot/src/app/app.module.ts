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
import { CategoriesComponent } from './home/categories/categories.component';
import { CtaComponent } from './home/cta/cta.component';
import { FeaturesComponent } from './home/features/features.component';
import { MainHomeComponent } from './home/main-home/main-home.component';
import { MostPlayedComponent } from './home/most-played/most-played.component';
import { TrendingComponent } from './home/trending/trending.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { FormsModule } from '@angular/forms';
import { ApiService } from './api.service';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    CtaComponent,
    FeaturesComponent,
    MainHomeComponent,
    MostPlayedComponent,
    TrendingComponent,
    CreateGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    CoreModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
