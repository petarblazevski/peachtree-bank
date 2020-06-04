import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import * as fromContainers from './containers';
import { environment } from '../environments/environment';

import { TransactionEffects } from './store/transaction.effects';
import { reducers } from './store';

@NgModule({
  declarations: [...fromContainers.containers],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers: [],
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([TransactionEffects]),
  ],
  providers: [],
  bootstrap: [fromContainers.AppComponent],
})
export class AppModule {}
