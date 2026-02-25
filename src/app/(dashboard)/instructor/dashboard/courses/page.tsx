import CourseManagementHeader from "@/components/modules/instructor/course/CourseManagementHeader";
import CourseManagementTable from "@/components/modules/instructor/course/CourseManagementTable";
import RefreshButton from "@/components/shared/RefreshButton";
import { getInstructorCourses } from "@/services/course/course.service";

const InstructorCoursesPage = async () => {
    const instructorCourses = await getInstructorCourses();
  return (
    <div className="p-4 space-y-6">
      <CourseManagementHeader />
      <div className="flex gap-5">
        <RefreshButton />
      </div>
      <CourseManagementTable courseData={instructorCourses.data} />
    </div>
  );
};

export default InstructorCoursesPage;
