import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/formatters";

interface CourseCardProps {
  course: any;
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Link
      href={`/courses/${course.id}`}
      className="border hover:border-primary rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition cursor-pointer bg-background flex flex-col"
    >
      {/* Thumbnail */}
      <div className="relative h-40 w-full bg-muted">
        {course.thumbnailUrl ? (
          <Image
            src={course.thumbnailUrl}
            alt={course.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No Image
          </div>
        )}
      </div>

      {/* Course Info */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="font-semibold text-lg">{course.title}</h3>
          {course.category && (
            <Badge variant="outline">{course.category.name}</Badge>
          )}
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {course.description || "No description provided."}
          </p>
        </div>

        <div className="flex justify-between items-center text-sm text-muted-foreground mt-2">
          <span>{course.instructor?.name || course.instructor?.email}</span>
          <span>{course._count.lessons} lessons</span>
        </div>

        <div className="flex justify-between items-center mt-3">
          <span className="font-medium">
            {course.isPaid ? `৳${course.price}` : "Free"}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;