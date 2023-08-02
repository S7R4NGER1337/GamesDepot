import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CategoriesComponent } from './categories/categories.component';
import { CtaComponent } from './cta/cta.component';
import { FeaturesComponent } from './features/features.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { MostPlayedComponent } from './most-played/most-played.component';
import { TrendingComponent } from './trending/trending.component';
import { LoaderComponent } from '../shared/loader/loader.component';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';



@NgModule({
  declarations: [
    CategoriesComponent,
    CtaComponent,
    MainHomeComponent,
    TrendingComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
    HomeRoutingModule
  ], 
  exports: [
    CategoriesComponent,
    CtaComponent,
    MainHomeComponent,
    TrendingComponent
  ]
})
export class HomeModule { }
