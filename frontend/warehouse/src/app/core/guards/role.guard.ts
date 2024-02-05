import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core'; 

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);
  const protectedRoutes: string[] = ['/admin'];
  const token: string | null = localStorage.getItem('token');
  const role: string | null = localStorage.getItem('role');
  const isProtectedRoute = protectedRoutes.includes(state.url);

  if (token !== null && role == 'admin' && isProtectedRoute) {
    return true; // Allow access to the protected route if authenticated
  } else {
    router.navigate(['/login']); // Redirect to login page if not authenticated or route is protected
    return false;
  }
};
