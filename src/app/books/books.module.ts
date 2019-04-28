import { NgModule } from '@angular/core';
import { BooksComponent } from './books.component';
import { CommonModule } from '@angular/common';
import {
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { BooksRoutingModule } from './books-routing.module';
import { BookEditComponent } from './book-edit/book-edit.component';

@NgModule({
    declarations: [
        BooksComponent,
        BookEditComponent
    ],
    imports: [
        CommonModule,
        BooksRoutingModule,
        MatExpansionModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatTableModule,
        ReactiveFormsModule,
        MatPaginatorModule

    ]
})
export class BooksModule {}
