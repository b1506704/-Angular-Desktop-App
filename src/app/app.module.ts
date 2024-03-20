import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared.module';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppAssistantComponent } from './components/app-assistant/app-assistant.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingService } from './services/loading.service';
import { HttpService } from './services/http.service';
import { HttpRequestInterceptor } from './services/http-request-interceptor';

@NgModule({
    declarations: [
        AppComponent,
        AppHeaderComponent,
        AppAssistantComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        SharedModule,
        AppRoutingModule
    ],
    providers: [
        LoadingService,
        HttpService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpRequestInterceptor,
            multi: true
        },
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent]
})
export class AppModule { }
