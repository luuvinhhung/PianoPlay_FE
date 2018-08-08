import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';

import {
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatCardModule,
    MatDialogModule,
    MatMenuModule,
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatListModule,
        MatSidenavModule,
        MatCardModule,
        MatDialogModule,
        MatTooltipModule,
        MatMenuModule
    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatListModule,
        MatSidenavModule,
        MatCardModule,
        MatDialogModule,
        MatTooltipModule,
        MatMenuModule
    ]
})

export class MaterialModule {
}
