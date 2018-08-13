import { UserGuard } from './core/user-guard.service';
import { AccountComponent } from './account/account.component';
import { SongService } from './core/song.service';
import { NotationService } from './notation/notation.service';
import { LoginComponent } from './auth/login/login.component';
import { PianoService } from './core/piano.service';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from 'ng-sidebar';
import { PlayComponent } from './play/play.component';
import { NoteInfoComponent } from './note-info/note-info.component';
import { NotationComponent } from './notation/notation.component';
import { SafePipe } from './shared/safe.pipe';
import { HomeGuard } from './core/home-guard.service';
import { AuthenticationService } from './core/authentication.service';
import { MaterialModule } from './material.module';
import { AccountService } from './core/account.service';
import { AccountDialogComponent } from './account-dialog/account-dialog.component';
import { MatSelectModule } from '../../node_modules/@angular/material';
import { RemoveAccountComponent } from './remove-account/remove-account.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { SongComponent } from './song/song.component';
import { RemoveSongComponent } from './remove-song/remove-song.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { GuideComponent } from './guide/guide.component';
import { AdminGuard } from './core/admin-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    MainComponent,
    PlayComponent,
    KeyboardComponent,
    NoteInfoComponent,
    NotationComponent,
    AccountComponent,
    AccountDialogComponent,
    RemoveAccountComponent,
    EditAccountComponent,
    SongComponent,
    RemoveSongComponent,
    GuideComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
    HttpModule,
    MatSelectModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    SidebarModule.forRoot()
  ],
  providers: [
    AdminGuard, UserGuard,
    PianoService, NotationService,
    SongService, AccountService,
    HomeGuard, AuthenticationService],
  bootstrap: [AppComponent],
  entryComponents: [AccountDialogComponent, RemoveSongComponent, RemoveAccountComponent, EditAccountComponent]
})
export class AppModule { }
