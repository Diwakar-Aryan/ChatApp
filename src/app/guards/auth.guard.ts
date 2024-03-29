import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const userService = inject(UserService);

  if (userService.hasAccess()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

const checkAccess = () => {
  const router: Router = inject(Router);
  const userService = inject(UserService);
  if (userService.hasAccess()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
