import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core'; 

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);
  const protectedRoutes: string[] = ['/profile', '/products/all_products', '/products/add_products'];
  const token: string | null = localStorage.getItem('token');
  const isProtectedRoute = protectedRoutes.includes(state.url);

  if (token !== null && isProtectedRoute) {
    return true; // Allow access to the protected route if authenticated
  } else {
    router.navigate(['/login']); // Redirect to login page if not authenticated or route is protected
    return false;
  }
};
