import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatToolbarModule } from '@angular/material';


@NgModule({
    declarations: [
    ],
    imports: [
        MatToolbarModule,
        MatCardModule,
        MatButtonModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [
        MatToolbarModule,
        MatCardModule,
        MatButtonModule
    ]
})
export class SharedModule { }
