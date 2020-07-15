import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { TeamShoppingList } from './team-shopping-list.component';

@NgModule({
    declarations: [
        TeamShoppingList
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [
        TeamShoppingList
    ]
})
export class ShoppingModule { }
