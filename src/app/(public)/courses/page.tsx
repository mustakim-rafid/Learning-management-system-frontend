export const dynamic = "force-dynamic";

import CourseCard from "@/components/modules/course/CourseCard";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import TablePagination from "@/components/shared/TablePagination";
import { formatQueryParams } from "@/lib/formatters";
import { getAllCourses } from "@/services/course/course.service";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EduFlow – Courses",
};

const CoursesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const queryParamsObj = await searchParams;
  const queryString = formatQueryParams(queryParamsObj);

  const courses = await getAllCourses(queryString);
  const { limit, total, page } = courses.meta;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6 lg:px-36 space-y-6">
      <h1 className="text-2xl font-bold">All Courses</h1>

      <div className="flex gap-5">
        <SearchFilter />
        <RefreshButton />
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.data.length > 0 ? (
          courses.data.map((course: any) => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <p className="text-muted-foreground col-span-full">
            No courses found.
          </p>
        )}
      </div>

      <TablePagination currentPage={page} totalPages={totalPages} />
    </div>
  );
};

export default CoursesPage;
