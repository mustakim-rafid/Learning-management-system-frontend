import { getCourseById } from "@/services/course/course.service";
import { notFound } from "next/navigation";
import CourseDetails from "@/components/modules/course/CourseDetails";

interface Props {
  params: Promise<{ courseId: string }>;
}

const CourseDetailsPage = async ({ params }: Props) => {
    const courseId = (await params).courseId
  const {data: course} = await getCourseById(courseId);

  if (!course) return notFound();

  const lessons = course.lessons ?? [];

  return (
    <>
     <CourseDetails course={course} lessons={lessons} />
    </>
  );
};

export default CourseDetailsPage;