import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent {
  users!:User[];

  constructor(adminService:AdminService){
    adminService.getAllUsersAdmin().subscribe((serverUsers) => {
      this.users = serverUsers;
    });
  }
}
