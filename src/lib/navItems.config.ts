import { UserRole } from "@/types/user.interface";
import { getDefaultDashboardRoute } from "./auth-utiles";
import { INavMain } from "@/types/dashboard.interface";

/* ================= SUPER ADMIN ================= */
export const superAdminNavMainItems: INavMain[] = [
  {
    title: "User Management",
    icon: "Users",
    isActive: false,
    items: [
      {
        title: "All Users",
        url: "/super-admin/dashboard/users",
      },
    ],
  },
];

/* ================= ADMIN ================= */
export const adminNavMainItems: INavMain[] = [
  {
    title: "Category",
    icon: "Layers",
    isActive: false,
    items: [
      {
        title: "Manage Categories",
        url: "/admin/dashboard/categories",
      },
    ],
  },
  {
    title: "Course",
    icon: "BookOpen",
    isActive: false,
    items: [
      {
        title: "Manage Courses",
        url: "/admin/dashboard/courses",
      },
    ],
  },
];

/* ================= INSTRUCTOR ================= */
export const instructorNavMainItems: INavMain[] = [
  {
    title: "My Courses",
    icon: "BookOpen",
    isActive: false,
    items: [
      {
        title: "Courses",
        url: "/instructor/dashboard/courses",
      },
    ],
  },
];

/* ================= STUDENT ================= */
export const studentNavMainItems: INavMain[] = [
  {
    title: "Learning",
    icon: "GraduationCap",
    isActive: false,
    items: [
      {
        title: "My Courses",
        url: "/dashboard/my-courses",
      },
      {
        title: "Explore Courses",
        url: "/courses",
      },
    ],
  },
];

/* ================= COMMON ================= */
export const getCommonNavMainItemsByRole = (
  userRole: UserRole
): INavMain[] => {
  return [
    {
      title: "Home",
      icon: "Home",
      isActive: true,
      items: [
        {
          title: "Home page",
          url: "/",
        },
        {
          title: "Overview",
          url: getDefaultDashboardRoute(userRole),
        },
      ],
    },
  ];
};

export const getNavMainItemsByRole = (
  userRole: UserRole
): INavMain[] => {
  switch (userRole) {
    case "SUPER_ADMIN":
      return [
        ...getCommonNavMainItemsByRole(userRole),
        ...superAdminNavMainItems,
      ];
    case "ADMIN":
      return [
        ...getCommonNavMainItemsByRole(userRole),
        ...adminNavMainItems,
      ];
    case "INSTRUCTOR":
      return [
        ...getCommonNavMainItemsByRole(userRole),
        ...instructorNavMainItems,
      ];
    case "STUDENT":
      return [
        ...getCommonNavMainItemsByRole(userRole),
        ...studentNavMainItems,
      ];
    default:
      return getCommonNavMainItemsByRole(userRole);
  }
};