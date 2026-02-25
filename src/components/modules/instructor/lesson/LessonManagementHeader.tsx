"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import CreateLessonFormDialog from "./CreateLessonFormDialog";

const LessonManagementHeader = ({ courseId }: { courseId: string }) => {
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
      title="Lesson management"
    >
      <CreateLessonFormDialog
        key={open ? "open" : "closed"}
        open={open}
        onOpenChange={setOpen}
        onSuccess={handleSuccess}
        courseId={courseId}
      />
    </ManagementPageHeader>
  );
};

export default LessonManagementHeader;