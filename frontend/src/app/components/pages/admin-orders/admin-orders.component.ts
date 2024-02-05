import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders!:Order[];

  constructor(adminService:AdminService){
    adminService.getAllOrdersAdmin().subscribe((serverOrders) => {
      this.orders = serverOrders;
    });
  }
}
