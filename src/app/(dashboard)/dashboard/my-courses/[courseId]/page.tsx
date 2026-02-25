import { getCourseById } from "@/services/course/course.service";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/formatters";
import { BookOpen, PlayCircle, Users } from "lucide-react";

interface Props {
  params: Promise<{
    courseId: string;
  }>;
}

const StudentCourseDetailsPage = async ({ params }: Props) => {
  const courseId = (await params).courseId;
  const { data: course } = await getCourseById(courseId);

  if (!course) return notFound();

  const hasLessons = course.lessons && course.lessons.length > 0;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* ================= HERO SECTION ================= */}
      <div className="bg-background border-b">
        <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-3 gap-8">
          {/* LEFT INFO */}
          <div className="md:col-span-2 space-y-4">
            <Link
              href="/dashboard/my-courses"
              className="text-sm text-primary hover:underline"
            >
              ← Back to My Courses
            </Link>

            <h1 className="text-3xl font-bold">
              {course.title}
            </h1>

            <p className="text-muted-foreground">
              {course.description || "No description provided."}
            </p>

            {/* META */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {course.category && (
                <Badge variant="outline">
                  {course.category.name}
                </Badge>
              )}

              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <BookOpen size={16} />
                {course.lessons?.length ?? 0} Lessons
              </div>

              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Users size={16} />
                {course._count?.enrollments ?? 0} Students
              </div>
            </div>

            {/* INSTRUCTOR INFO */}
            <div className="text-sm text-muted-foreground space-y-1">
              <p>
                Instructor:{" "}
                <span className="font-medium">
                  {course.instructor?.name ||
                    course.instructor?.email}
                </span>
              </p>

              <p>
                Created {formatDate(course.createdAt)}
              </p>
            </div>

            {/* CTA */}
            {hasLessons ? (
              <Link
                href={`/dashboard/my-courses/${courseId}/lessons/${course.lessons[0].id}`}
                className="inline-flex items-center gap-2 mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
              >
                <PlayCircle size={18} />
                Continue Learning
              </Link>
            ) : (
              <div className="mt-4 inline-flex items-center gap-2 bg-muted text-muted-foreground px-6 py-2 rounded-lg cursor-not-allowed">
                <PlayCircle size={18} />
                No Lessons Available
              </div>
            )}
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative h-60 md:h-full rounded-xl overflow-hidden shadow-sm bg-muted">
            {course.thumbnailUrl ? (
              <Image
                src={course.thumbnailUrl}
                alt={course.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No Thumbnail
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= LESSON LIST ================= */}
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <h2 className="text-xl font-semibold">
          Course Content
        </h2>

        <div className="border rounded-xl divide-y bg-background shadow-sm">
          {hasLessons ? (
            course.lessons.map((lesson: any) => (
              <Link
                key={lesson.id}
                href={`/dashboard/my-courses/${courseId}/lessons/${lesson.id}`}
              >
                <div className="p-4 flex justify-between items-center hover:bg-muted/40 transition cursor-pointer">
                  <div className="space-y-1">
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

                  <PlayCircle
                    size={18}
                    className="text-muted-foreground"
                  />
                </div>
              </Link>
            ))
          ) : (
            <div className="p-6 text-sm text-muted-foreground text-center">
              Lessons will appear here once the instructor adds them.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentCourseDetailsPage;