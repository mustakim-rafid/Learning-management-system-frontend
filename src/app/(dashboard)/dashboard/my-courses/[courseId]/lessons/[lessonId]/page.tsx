import { notFound } from "next/navigation";
import { getLessonById } from "@/services/lesson/lesson.service";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/formatters";
import { ArrowLeft, Clock, PlayCircle } from "lucide-react";

interface Props {
  params: Promise<{
    lessonId: string;
    courseId: string;
  }>;
}

const StudentLessonPage = async ({ params }: Props) => {
  const lessonId = (await params).lessonId;

  const { data:lesson } = await getLessonById(lessonId);

  if (!lesson) return notFound();

  return (
    <div className="min-h-screen bg-muted/30">
      {/* ================= HEADER ================= */}
      <div className="bg-background border-b">
        <div className="max-w-5xl mx-auto p-6 space-y-4">
          <Link
            href={`/dashboard/my-courses/${lesson.courseId}`}
            className="flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <ArrowLeft size={16} />
            Back to Course
          </Link>

          <div className="space-y-3">
            <h1 className="text-3xl font-bold leading-tight">
              {lesson.lessonOrder}. {lesson.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="outline">
                {lesson.contentType}
              </Badge>

              {lesson.isPreview && (
                <Badge variant="secondary">
                  Preview
                </Badge>
              )}

              {lesson.duration && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock size={14} />
                  {lesson.duration} minutes
                </div>
              )}
            </div>

            <div className="text-sm text-muted-foreground">
              Instructor:{" "}
              <span className="font-medium">
                {lesson.course.instructor.email}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-background rounded-xl shadow-sm border p-6">
          {/* VIDEO CONTENT */}
          {lesson.contentType === "VIDEO" &&
            lesson.contentUrl && (
              <div className="space-y-4">
                <div className="aspect-video w-full overflow-hidden rounded-lg border bg-black">
                  <video
                    controls
                    className="w-full h-full"
                    src={lesson.contentUrl}
                  />
                </div>
              </div>
            )}

          {/* TEXT CONTENT */}
          {lesson.contentType === "TEXT" &&
            lesson.contentText && (
              <div className="space-y-4">
                <div
                  className="prose max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{
                    __html: lesson.contentText,
                  }}
                />
              </div>
            )}

          {/* EMPTY STATE */}
          {!lesson.contentUrl &&
            !lesson.contentText && (
              <div className="text-center py-12 text-muted-foreground">
                <PlayCircle
                  size={40}
                  className="mx-auto mb-3 opacity-40"
                />
                No lesson content available yet.
              </div>
            )}
        </div>

        {/* FOOTER META */}
        <div className="mt-6 text-xs text-muted-foreground text-center">
          Created {formatDate(lesson.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default StudentLessonPage;