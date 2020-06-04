import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import * as fromContainers from './containers';

@NgModule({
  declarations: [...fromContainers.containers],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [fromContainers.AppComponent],
})
export class AppModule {}
