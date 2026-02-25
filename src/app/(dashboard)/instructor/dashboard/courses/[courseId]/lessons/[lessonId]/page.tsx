import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/formatters";
import Link from "next/link";
import { getLessonById } from "@/services/lesson/lesson.service";

interface Props {
  params: Promise<{
    lessonId: string;
    courseId: string;
  }>;
}

const LessonDetailsPage = async ({ params }: Props) => {
    const lessonId = (await params).lessonId
  const { data: lesson } = await getLessonById(lessonId);

  if (!lesson) return notFound();

  return (
    <div className="p-6 space-y-8">
      {/* ================= BACK BUTTON ================= */}
      <Link
        href={`/instructor/dashboard/courses/${lesson.courseId}`}
        className="text-sm text-primary hover:underline"
      >
        ← Back to Course
      </Link>

      {/* ================= HEADER CARD ================= */}
      <div className="border rounded-lg p-6 shadow-sm bg-background space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            {lesson.lessonOrder}. {lesson.title}
          </h1>

          <div className="flex gap-2">
            <Badge variant="outline">
              {lesson.contentType}
            </Badge>

            {lesson.isPreview && (
              <Badge variant="secondary">
                Preview
              </Badge>
            )}
          </div>
        </div>

        <div className="text-sm text-muted-foreground space-y-1">
          <p>
            Instructor:{" "}
            <span className="font-medium">
              {lesson.course.instructor.email}
            </span>
          </p>

          <p>
            Duration:{" "}
            {lesson.duration
              ? `${lesson.duration} minutes`
              : "No duration specified"}
          </p>

          <p>
            Created: {formatDate(lesson.createdAt)}
          </p>
        </div>
      </div>

      {/* ================= CONTENT SECTION ================= */}

      <div className="border rounded-lg p-6 shadow-sm bg-background">
        {lesson.contentType === "VIDEO" &&
          lesson.contentUrl && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">
                Video Content
              </h2>

              <video
                controls
                className="w-full rounded-md border"
                src={lesson.contentUrl}
              />
            </div>
          )}

        {lesson.contentType === "TEXT" &&
          lesson.contentText && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">
                Lesson Content
              </h2>

              <div
                className="prose max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{
                  __html: lesson.contentText,
                }}
              />
            </div>
          )}

        {!lesson.contentUrl &&
          !lesson.contentText && (
            <div className="text-sm text-muted-foreground">
              No content available for this lesson.
            </div>
          )}
      </div>
    </div>
  );
};

export default LessonDetailsPage;