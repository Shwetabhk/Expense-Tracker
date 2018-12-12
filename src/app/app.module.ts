import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {
  MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule,
  MatInputModule, MatRadioModule, MatSelectModule, MatSliderModule,MatMenuModule,
  MatSlideToggleModule, MatToolbarModule, MatListModule, MatGridListModule,MatTabsModule,MatTableModule,
  MatCardModule, MatProgressSpinnerModule, MatDialogModule, MatStepperModule,MatBottomSheetModule
} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { CreateExpenseComponent } from './components/create-expense/create-expense.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    CreateExpenseComponent
  ],
  entryComponents:[ CreateExpenseComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule, HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule, FormsModule,
    MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule,MatBottomSheetModule,
    MatInputModule, MatRadioModule, MatSelectModule, MatSliderModule,MatMenuModule,MatTableModule,
    MatSlideToggleModule, MatToolbarModule, MatListModule, MatGridListModule,MatTabsModule,
    MatCardModule, MatIconModule, MatProgressSpinnerModule, MatDialogModule, MatStepperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
