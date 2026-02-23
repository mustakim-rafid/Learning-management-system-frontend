import { UserRole } from "@/types/user.interface";

export type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

export const authRoutes = ["/login", "/register"];

const publicRoutes = ["/courses"];

export const commonProtectedRoutes: RouteConfig = {
  exact: ["/my-profile", "/change-password"],
  patterns: [],
};

export const superAdminProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/super-admin(\/.*)?$/],
};

export const adminProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/admin(\/.*)?$/],
};

export const instructorProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/instructor(\/.*)?$/],
};

export const studentProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/dashboard(\/.*)?$/],
};

export const isAuthRoute = (pathname: string) => {
  return authRoutes.some((route) => route === pathname);
};

export const isRouteMatch = (pathname: string, routes: RouteConfig) => {
  if (routes.exact.length > 0) {
    return routes.exact.includes(pathname);
  }
  return routes.patterns.some((pattern) => pattern.test(pathname));
};

export const getRouteOwner = (
  pathname: string
): "SUPER_ADMIN" | "ADMIN" | "STUDENT" | "INSTRUCTOR" | "COMMON" | null => {
  if (isRouteMatch(pathname, superAdminProtectedRoutes)) {
    return "SUPER_ADMIN";
  }
  if (isRouteMatch(pathname, adminProtectedRoutes)) {
    return "ADMIN";
  }
  if (isRouteMatch(pathname, instructorProtectedRoutes)) {
    return "INSTRUCTOR";
  }
  if (isRouteMatch(pathname, studentProtectedRoutes)) {
    return "STUDENT";
  }
  if (isRouteMatch(pathname, commonProtectedRoutes)) {
    return "COMMON";
  }
  return null;
};

export const getDefaultDashboardRoute = (user: UserRole): string => {
  if (user === "SUPER_ADMIN") {
    return "/super-admin/dashboard";
  }
  if (user === "ADMIN") {
    return "/admin/dashboard";
  }
  if (user === "INSTRUCTOR") {
    return "/instructor/dashboard";
  }
  if (user === "STUDENT") {
    return "/dashboard";
  }
  return "/";
};

export const isValidRouteForRole = (pathname: string, userRole: UserRole) => {
  if (publicRoutes.includes(pathname)) {
    return true;
  }
  const routeOwner = getRouteOwner(pathname);
  if (routeOwner === "COMMON") {
    return true;
  }
  if (routeOwner !== userRole) {
    return false;
  }
  return true;
};
