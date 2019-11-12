import 'hammerjs';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

import { HttpConfigInterceptor } from './shared/http-interceptor/http-config-interceptor';

import { NavbarComponent } from './components/navbar/navbar.component';
import { AlertModalComponent } from './shared/components/alert-modal/alert-modal.component';

import { AuthService } from './shared/services/auth.service';
import { LoadingScreen } from './shared/utils/loading-screen.utils';

import { Alert } from './shared/utils/alert.utils';
import { Modal } from './shared/utils/modal.utils';
import { LoadingScreenComponent } from './shared/components/loading-screen/loading-screen.component';
import { ClientsComponent } from './components/clients/clients.component';
import { CountryService } from './services/country.service';
import { DepartmentService } from './services/department.service';
import { ClientService } from './services/client.service';
import { SaveClientComponent } from './components/clients/modal/save-client/save-client.component';
import { CitySelectorComponent } from './components/city-selector/city-selector.component';
import { VisitsComponentComponent } from './components/visits-component/visits-component.component';
import { SaveVisitComponent } from './components/visits-component/modal/save-visit/save-visit.component';
import { VisitService } from './services/visit.service';
import { RepresentativeService } from './services/representative.service';


const NOTIFIER_CONFIG: NotifierOptions = {
    position: {
        horizontal: { position: 'right' },
        vertical: { position: 'top', distance: 80 },
    },
    behaviour: { autoHide: 3000, showDismissButton: false },
    theme: 'material'
};

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        AlertModalComponent,
        LoadingScreenComponent,
        CitySelectorComponent,
        ClientsComponent,
        SaveClientComponent,
        VisitsComponentComponent,
        SaveVisitComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MDBBootstrapModule.forRoot(),
        NotifierModule.withConfig(NOTIFIER_CONFIG),
        HttpClientModule
    ],
    entryComponents: [
        AlertModalComponent,
        CitySelectorComponent,
        SaveClientComponent,
        SaveVisitComponent,
    ],
    providers: [
        AuthService,
        LoadingScreen,
        Alert,
        Modal,
        CountryService,
        DepartmentService,
        RepresentativeService,
        ClientService,
        VisitService,
        { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
