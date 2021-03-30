import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrComponent } from './components/registr/registr.component';
import { AuthComponent } from './components/auth/auth.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { MainComponent } from './components/main/main.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PersonalAreaComponent } from './components/personal-area/personal-area.component';
import { FriendsComponent } from './components/friends/friends.component';
import { HistoryComponent } from './components/history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrComponent,
    AuthComponent,
    ConfirmComponent,
    MainComponent,
    NavigationComponent,
    SettingsComponent,
    PersonalAreaComponent,
    FriendsComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
