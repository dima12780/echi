import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './components/auth/auth.component';
import { RegistrComponent } from './components/registr/registr.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { MainComponent } from './components/main/main.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PersonalAreaComponent } from './components/personal-area/personal-area.component';
import { FriendsComponent } from './components/friends/friends.component';
import { HistoryComponent } from './components/history/history.component';

const routes: Routes = [ 
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'registr', component: RegistrComponent },
  { path: 'confirm', component: ConfirmComponent },
  { path: 'main', component: MainComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'personalArea', component: PersonalAreaComponent },
  { path: 'friends', component: FriendsComponent },
  { path: 'history', component: HistoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
