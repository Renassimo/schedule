import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BooksComponent } from './books.component';

const booksRoutes = [
    {path: '', component: BooksComponent},
];

@NgModule({
    imports: [RouterModule.forChild(booksRoutes)],
    exports: [RouterModule]
})
export class BooksRoutingModule {}
