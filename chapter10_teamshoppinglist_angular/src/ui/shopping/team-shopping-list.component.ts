import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input } from '@angular/core';
import { Item } from './Item';
import { Result } from './Result';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'team-shopping-list',
    templateUrl: './team-shopping-list.component.html'
})

export class TeamShoppingList {

    description: string = '';
    quantity: number = 0;

    // Track items with a BehaviorSubject because they are updated asynchronously
    items: BehaviorSubject<Item[]> = new BehaviorSubject([]);

    constructor(private http: HttpClient) {
        // pass
    }

    // Handle a server response: update the 
    updateResults = (result: Result) => {
        if (result.success)
        this.items.next(result.items);
    };
    
    // On component load, retrieve the latest shopping list items
    ngOnInit() {
        this.http.get('/api/items').subscribe(this.updateResults);
    }

    // Create a new shopping list item
    doAdd() {
        let description = this.description;
        let quantity = this.quantity;
        this.http.post(
            '/api/items/new', 
            { description, quantity }
        ).subscribe(this.updateResults);
    }

    // Handle the "Delete" button for a given shopping list item
    doDelete(item: Item) {
        this.http.post(
            `/api/items/${item.id}/delete`, 
            {}
        ).subscribe(this.updateResults);
    }

    // Handle the "Ready to purchase" button for a given shopping list item
    doReady(item: Item) {
        this.http.post(`/api/items/${item.id}/ready`, {}).subscribe(this.updateResults);
    }

    // Handle the "Purchase" button for a given shopping list item
    doPurchase(item: Item) {
        this.http.post(
            `/api/items/${item.id}/purchase`, 
            {}
        ).subscribe(this.updateResults);
    }
}
