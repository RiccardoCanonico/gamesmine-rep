import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

export const isAdminGuard: CanActivateFn = (route, state) => {
  if(inject(UserService).currentUser.isAdmin == true){
    return true;
  }
  else{
    inject(Router).navigateByUrl('');
    return false;
  }
    
};
