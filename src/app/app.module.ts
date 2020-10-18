import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { DialogSchemeComponent } from './components/dialog-scheme/dialog-scheme.component';
import { InformationComponent } from './components/information/information.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { CodeComponent } from './components/code/code.component';

// Services
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './services/interceptor.service';
import { TableService } from './services/table.service';
import { CrudService } from './services/crud.service';
import { DataService } from './services/data.service';
import { AuthGuard } from './auth.guard';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InformationComponent,
    DialogSchemeComponent,
    CodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCheckboxModule, 
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    HttpClientModule,
    MatDialogModule,
    HighlightModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    [AuthGuard],
    AuthService,
    TableService,
    CrudService,
    DataService,
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        lineNumbersLoader: () => import('highlightjs-line-numbers.js'), // Optional, only if you want the line numbers
        languages: {
          sql: () => import('highlight.js/lib/languages/sql')
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
