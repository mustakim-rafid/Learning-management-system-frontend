import { getCourseById } from "@/services/course/course.service";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/formatters";
import Link from "next/link";
import LessonManagementHeader from "@/components/modules/instructor/lesson/LessonManagementHeader";

interface Props {
  params: Promise<{
    courseId: string;
  }>;
}

const CourseDetailsPage = async ({ params }: Props) => {
    const courseId = (await params).courseId
  const course = await getCourseById(courseId);

  const {data} = course

  if (!course) return notFound();

  const lessons = data.lessons ?? [];
  const enrollments = data.enrollments ?? [];

  return (
    <div className="p-6 space-y-8">
      {/* ================= BACK BUTTON ================= */}
      <Link
        href="/instructor/dashboard/courses"
        className="text-sm text-primary hover:underline"
      >
        ← Back to Courses
      </Link>

      {/* ================= COURSE HEADER ================= */}
      <div className="border rounded-lg p-6 shadow-sm bg-background flex gap-6">
        <div className="relative h-40 w-64 rounded-md overflow-hidden bg-muted">
          {course.thumbnailUrl && (
            <Image
              src={course.thumbnailUrl}
              alt={course.title}
              fill
              className="object-cover"
            />
          )}
        </div>

        <div className="flex-1 space-y-3">
          <h1 className="text-2xl font-bold">{data.title}</h1>

          <p className="text-muted-foreground">
            {data.description || "No description provided."}
          </p>

          <div className="flex flex-wrap gap-3 items-center">

            <span className="font-medium">
              {data.isPaid ? `৳${data.price}` : "Free"}
            </span>

            {course.category && (
              <Badge variant="outline">
                {data.category.name}
              </Badge>
            )}
          </div>

          <div className="text-sm text-muted-foreground space-y-1">
            <p>
              Instructor:{" "}
              <span className="font-medium">
                {data.instructor?.name ||
                  data.instructor?.email}
              </span>
            </p>

            <p>
              Created: {formatDate(data.createdAt)}
            </p>
          </div>
        </div>
      </div>

      <LessonManagementHeader courseId={courseId} />

      {/* ================= COURSE STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">
            Total Lessons
          </p>
          <p className="text-2xl font-bold">
            {lessons.length}
          </p>
        </div>

        <div className="border rounded-lg p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">
            Total Enrollments
          </p>
          <p className="text-2xl font-bold">
            {enrollments.length}
          </p>
        </div>
      </div>

      {/* ================= LESSONS LIST ================= */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Lessons ({lessons.length})
        </h2>

        <div className="border rounded-md divide-y">
          {lessons.length > 0 ? (
            lessons.map((lesson: any) => (
              <Link
                key={lesson.id}
                href={`/instructor/dashboard/courses/${courseId}/lessons/${lesson.id}`}
              >
                <div className="p-4 flex justify-between items-center hover:bg-muted/40 cursor-pointer transition">
                  <div>
                    <p className="font-medium">
                      {lesson.lessonOrder}. {lesson.title}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {lesson.contentType} •{" "}
                      {lesson.duration
                        ? `${lesson.duration} min`
                        : "No duration"}
                    </p>
                  </div>

                  {lesson.isPreview && (
                    <Badge variant="secondary">
                      Preview
                    </Badge>
                  )}
                </div>
              </Link>
            ))
          ) : (
            <div className="p-4 text-sm text-muted-foreground">
              No lessons added yet.
            </div>
          )}
        </div>
      </div>

      {/* ================= ENROLLMENTS ================= */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Enrolled Students ({enrollments.length})
        </h2>

        <div className="border rounded-md divide-y">
          {enrollments.length > 0 ? (
            enrollments.map((enrollment: any) => (
              <div
                key={enrollment.id}
                className="p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">
                    {enrollment.student?.name ||
                      enrollment.student?.email}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {enrollment.student?.email}
                  </p>
                </div>

                <Badge variant="outline">
                  {enrollment.status}
                </Badge>
              </div>
            ))
          ) : (
            <div className="p-4 text-sm text-muted-foreground">
              No students enrolled yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;