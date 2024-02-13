import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Order } from "../shared/models/Order";
import { Observable } from "rxjs/internal/Observable";
import { ORDER_URL, USER_ORDER_URL } from "../shared/constants/url";
import { IOrder } from "../shared/Interfaces/IOrder";

@Injectable({
    providedIn: 'root'
})

export class OrderService {
    constructor(private http:HttpClient){}
    private orderInt!:IOrder;

    createOrder(order:IOrder):void{
        this.orderInt = order;
    }

    insertOrder(): Observable<Order>{
        return this.http.post<Order>(ORDER_URL, this.orderInt);
    }

    getAllOrders(token:string):Observable<Order[]>{
        return this.http.get<Order[]>(USER_ORDER_URL + token);
    }

}