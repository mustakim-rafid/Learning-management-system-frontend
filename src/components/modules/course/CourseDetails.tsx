"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/formatters";
import { getCookie } from "@/services/auth/tokenHandlers";
import { createEnrollment, enrollmentPayment } from "@/services/enrollment/enrollment.service";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface CourseDetailsProps {
  course: any;
  lessons: any
}

const CourseDetails = ({ course, lessons }: CourseDetailsProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  const handleEnrollmentAndPayment = async (courseId: string) => {
    setLoading(true);
    try {
      const accessToken = await getCookie("accessToken");
      
      if (!accessToken) {
        router.push(`/login?redirect=${pathName}`);
        return;
      }

      const enrollRes = await createEnrollment({ courseId })

      if (!enrollRes.success) {
        toast.error(enrollRes.message || "Enrollment failed")
        return
      }
      const result = await enrollmentPayment(enrollRes.data.enrollment.id);
      if (!result.success) {
        toast.error(result.message || "Payment process failed");
        return;
      }
      toast.success("Redirecting you to secure payment…");
      setTimeout(() => {
        window.location.replace(result.data.paymentUrl);
      }, 500);
    } catch (error: any) {
      console.log(error);
      toast.error(
        error.message || "Something went wrong in the payment process"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 space-y-8">
      {/* ================= COURSE HEADER ================= */}
      <div className="border rounded-lg p-6 shadow-sm bg-background flex flex-col md:flex-row gap-6">
        <div className="relative h-48 w-full md:w-64 rounded-md overflow-hidden bg-muted">
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

        <div className="flex-1 space-y-3">
          <h1 className="text-2xl font-bold">{course.title}</h1>
          <p className="text-muted-foreground">
            {course.description || "No description provided."}
          </p>

          <div className="flex flex-wrap gap-3 items-center">
            {course.category && <Badge>{course.category.name}</Badge>}
            <span className="font-medium">
              {course.isPaid ? `৳${course.price}` : "Free"}
            </span>
          </div>

          <div className="text-sm text-muted-foreground mt-2">
            <p>
              Instructor:{" "}
              <span className="font-medium">
                {course.instructor?.name || course.instructor?.email}
              </span>
            </p>
            <p>Created: {formatDate(course.createdAt)}</p>
          </div>
        </div>
      </div>

      {/* ================= LESSONS LIST ================= */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Lessons ({lessons.length})</h2>
        <div className="border rounded-md divide-y">
          {lessons.length > 0 ? (
            lessons.map((lesson: any) => (
              <div
                key={lesson.id}
                className="p-4 flex justify-between items-center transition"
              >
                <div>
                  <p className="font-medium">
                    {lesson.lessonOrder}. {lesson.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {lesson.contentType} •{" "}
                    {lesson.duration ? `${lesson.duration} min` : "No duration"}
                  </p>
                </div>

                {lesson.isPreview && <Badge variant="secondary">Preview</Badge>}
              </div>
            ))
          ) : (
            <p className="p-4 text-sm text-muted-foreground">No lessons added yet.</p>
          )}
        </div>
      </div>

      {/* ================= ENROLL BUTTON ================= */}
      <div className="flex justify-center mt-6">
        <Button
          onClick={() => handleEnrollmentAndPayment(course.id)}
        >
          {
            loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Enroll Now"
          }
        </Button>
      </div>
    </div>
  )
}

export default CourseDetails