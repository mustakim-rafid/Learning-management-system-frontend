import { Column } from "@/components/shared/ManagementTable";
import { formatDate } from "@/lib/formatters";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export interface InstructorCourse {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  isPaid: boolean;
  status: string;
  thumbnailUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  instructorId: string;
  categoryId: string | null;

  lessons: {
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    courseId: string;
    contentType: string;
    contentUrl: string | null;
    contentText: string | null;
    lessonOrder: number;
    isPreview: boolean;
    duration: number | null;
  }[];

  _count: {
    lessons: number;
    enrollments: number;
  };
}

export const courseTableColumn: Column<InstructorCourse>[] = [
  {
    header: "Course",
    accessor: (course) => (
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-16 rounded-md overflow-hidden bg-muted">
          {course.thumbnailUrl && (
            <Image
              src={course.thumbnailUrl}
              alt={course.title}
              fill
              className="object-cover"
            />
          )}
        </div>
        <div>
          <p className="font-medium">{course.title}</p>
          <p className="text-xs text-muted-foreground">{course.slug}</p>
        </div>
      </div>
    ),
  },
  {
    header: "Price",
    accessor: (course) =>
      course.isPaid ? `৳${course.price}` : "Free",
  },
  {
    header: "Lessons",
    accessor: (course) => course._count.lessons,
  },
  {
    header: "Enrollments",
    accessor: (course) => course._count.enrollments,
  },
  {
    header: "Created",
    accessor: (course) => formatDate(course.createdAt),
  },
];