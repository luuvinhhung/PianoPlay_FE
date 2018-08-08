import { PlayComponent } from './play/play.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './auth/login/login.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeGuard } from './core/home-guard.service';
import { AccountComponent } from './account/account.component';
import { SongComponent } from './song/song.component';


const routes: Routes = [
    {
        path: '', component: LoginComponent, pathMatch: 'full'
    }, {
        path: 'login', component: LoginComponent
    }, {
        path: 'home', component: MainComponent,
        // canActivate: [HomeGuard],
        children: [
            {
                path: '', component: PlayComponent, pathMatch: 'full'
            },
            {
                path: 'play', component: PlayComponent
            },
            {
                path: 'songs', component: SongComponent
            },
            {
                path: 'accounts', component: AccountComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }

export const routedComponents = [LoginComponent];
