import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/formatters";
import { BookOpen, Clock } from "lucide-react";
import { getStudentCourses } from "@/services/course/course.service";

const StudentCoursesPage = async () => {
  const enrolledCourses = await getStudentCourses();

  const courses = enrolledCourses?.data ?? [];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">My Learning</h1>
          <p className="text-muted-foreground text-sm">
            Continue learning your enrolled courses
          </p>
        </div>
      </div>

      {courses.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((item: any) => {
            const course = item.course;
            const lessons = course.lessons ?? [];

            return (
              <Link
                key={course.id}
                href={`/dashboard/my-courses/${course.id}`}
                className="hover:border-primary group border rounded-xl overflow-hidden bg-background shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="relative h-40 w-full bg-muted">
                  {course.thumbnailUrl ? (
                    <Image
                      src={course.thumbnailUrl}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                      No Thumbnail
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <h2 className="font-semibold text-lg line-clamp-1">
                      {course.title}
                    </h2>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {course.description || "No description available."}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                    <div className="flex items-center gap-1">
                      <BookOpen size={14} />
                      {lessons.length} Lessons
                    </div>

                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {formatDate(course.createdAt)}
                    </div>
                  </div>

                  {/* Instructor */}
                  <div className="text-xs pt-2 border-t">
                    Instructor:{" "}
                    <span className="font-medium">
                      {course.instructor?.name || "Unknown"}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground">
          You haven't enrolled in any courses yet.
        </div>
      )}
    </div>
  );
};

export default StudentCoursesPage;