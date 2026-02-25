"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import CreateCourseFormDialog from "./CreateCourseFormDialog";

const CourseManagementHeader = () => {
  const [open, setOpen] = useState(false);
  const [_, startTransition] = useTransition();
  const router = useRouter();

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <ManagementPageHeader
      title="Course management"
      description="Create and manage your courses efficiently."
    >
      <CreateCourseFormDialog
        key={open ? "open" : "closed"}
        open={open}
        onOpenChange={setOpen}
        onSuccess={handleSuccess}
      />
    </ManagementPageHeader>
  );
};

export default CourseManagementHeader;