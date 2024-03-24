import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppAssistantComponent } from './components/app-assistant/app-assistant.component';

@NgModule({
    declarations: [
        AppComponent,
        AppHeaderComponent,
        AppAssistantComponent
    ],
    imports: [
        BrowserModule,
        SharedModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent]
})
export class AppModule { }
