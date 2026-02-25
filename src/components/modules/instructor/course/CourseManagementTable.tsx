"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import { courseTableColumn, InstructorCourse } from "./courseTableColumn";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteCourse } from "@/services/course/course.service";

interface CourseManagementTableProps {
  courseData: InstructorCourse[];
}

const CourseManagementTable = ({ courseData }: CourseManagementTableProps) => {
  const router = useRouter();
  const [_, startTransition] = useTransition();

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleGetRowKey = (course: InstructorCourse) => course.id;

  const handleView = (course: InstructorCourse) => {
    router.push(`/instructor/dashboard/courses/${course.id}`);
  };

  const handleDelete = async (course: InstructorCourse) => {
    const result = await deleteCourse(course.id);
    if (result.success) {
      toast.success(result.message);
      handleSuccess();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <ManagementTable
      data={courseData}
      columns={courseTableColumn}
      getRowKey={handleGetRowKey}
      onDelete={handleDelete}
      onView={handleView}
      emptyMessage="No courses found"
      deleteDes="This will delete this course"
    />
  );
};

export default CourseManagementTable;
