import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatButtonModule, MatCard, MatCardModule, MatIconModule, MatInputModule, MatMenuModule, MatProgressBarModule, MatToolbarModule} from '@angular/material';


@NgModule({
    declarations: [
    ],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        MatInputModule,
        MatCardModule,
        MatProgressBarModule
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        MatInputModule,
        MatCardModule,
        MatProgressBarModule
    ]
})
export class SharedModule { }
