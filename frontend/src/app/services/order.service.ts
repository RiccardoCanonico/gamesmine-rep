import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Order } from "../shared/models/Order";
import { Observable } from "rxjs/internal/Observable";
import { ORDER_URL } from "../shared/constants/url";

@Injectable({
    providedIn: 'root'
})

export class OrderService {
    constructor(private http:HttpClient){}
    private order:Order | undefined;

    createOrder(order:Order):void{
        this.order = order;
    }

    insertOrder(): Observable<Order>{
        return this.http.post<Order>(ORDER_URL, this.order);
    }
}