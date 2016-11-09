// Fix Material Support
import { __platform_browser_private__ } from '@angular/platform-browser';
function universalMaterialSupports(eventName: string): boolean { return Boolean(this.isCustomEvent(eventName)); }
__platform_browser_private__.HammerGesturesPlugin.prototype.supports = universalMaterialSupports;
// End Fix Material Support

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UniversalModule, isBrowser, isNode } from 'angular2-universal/node'; // for AoT we need to manually split universal packages

import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { ClientsModule } from './clients/clients.module';
import { VisitModule } from './visit/visit.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CacheService } from './universal-cache';
import { ClientService } from './shared/_services/client.service';
import { VisitService } from './shared/_services/visit.service';
import { AuthGuard } from './shared/_guards/auth.guard';
import { AuthenticationService } from './shared/_services/authentication.service';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [
    UniversalModule, // NodeModule, NodeHttpModule, and NodeJsonpModule are included
    FormsModule,

    SharedModule,
    HomeModule,
    ClientsModule,
    VisitModule,
    LoginModule,
    AppRoutingModule
  ],
  providers: [
    { provide: 'isBrowser', useValue: isBrowser },
    { provide: 'isNode', useValue: isNode },
    ClientService,
    VisitService,
    AuthGuard,
    AuthenticationService,
    CacheService
  ]
})
export class MainModule {
  constructor(public cache: CacheService) {

  }

  /**
   * We need to use the arrow function here to bind the context as this is a gotcha
   * in Universal for now until it's fixed
   */
  universalDoDehydrate = (universalCache) => {
    universalCache[CacheService.KEY] = JSON.stringify(this.cache.dehydrate());
  }

 /**
  * Clear the cache after it's rendered
  */
  universalAfterDehydrate = () => {
    this.cache.clear();
  }
}
