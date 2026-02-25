"use client";

import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createLesson } from "@/services/lesson/lesson.service";
import { Loader2, Plus } from "lucide-react";
import React, { SelectHTMLAttributes, useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface LessonFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  courseId: string;
}

const CreateLessonFormDialog = ({
  open,
  onOpenChange,
  onSuccess,
  courseId
}: LessonFormDialogProps) => {
  const [state, formAction, pending] = useActionState(createLesson, null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const [contentType, setContentType] = useState<"TEXT" | "VIDEO">("TEXT")

  useEffect(() => {
    if (state) {
      if (!state.success && state.error) {
        toast.error(state.message);
      }

      if (state.success) {
        toast.success(state.message);
        onOpenChange(false);
        onSuccess();
      }
    }
  }, [state]);

  const handleContentTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setContentType(event.target.value as "TEXT" | "VIDEO")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          <Plus className="mr-2 h-4 w-4" />
          Add Lesson
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-106.25 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Lesson</DialogTitle>
        </DialogHeader>

        <form id="lessonForm" action={formAction} className="space-y-5">
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input
              id="title"
              name="title"
              placeholder="Lesson title"
              defaultValue={state?.formData?.title || ""}
            />
            <InputFieldError field="title" state={state} />
          </Field>

          <Field>
            <Input
              type="hidden"
              id="courseId"
              name="courseId"
              value={courseId}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="contentType">Content Type</FieldLabel>
            <select
              id="contentType"
              name="contentType"
              defaultValue={state?.formData?.contentType || "TEXT"}
              className="border rounded-md p-2 w-full"
              onChange={handleContentTypeChange}
            >
              <option value="TEXT">Text</option>
              <option value="VIDEO">Video</option>
            </select>
            <InputFieldError field="contentType" state={state} />
          </Field>

          {/* VIDEO FILE */}
          <Field>
            <FieldLabel htmlFor="file">Video File . less than 5mb</FieldLabel>
            <Input
              ref={videoInputRef}
              id="file"
              name="file"
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setVideoFile(file);
              }}
              disabled={contentType === "TEXT"}
            />
            {videoFile && (
              <p className="mt-2 text-sm text-muted-foreground">
                Selected: {videoFile.name}
              </p>
            )}
          </Field>

          {/* TEXT CONTENT */}
          <Field>
            <FieldLabel htmlFor="contentText">Text Content</FieldLabel>
            <Textarea
              id="contentText"
              name="contentText"
              placeholder="Lesson text content"
              defaultValue={state?.formData?.contentText || ""}
              disabled={contentType === "VIDEO"}
            />
            <InputFieldError field="contentText" state={state} />
          </Field>

          <Field>
            <FieldLabel htmlFor="duration">Duration (minutes)</FieldLabel>
            <Input
              id="duration"
              name="duration"
              type="text"
              placeholder="Lesson duration"
              defaultValue={state?.formData?.duration || ""}
            />
            <InputFieldError field="duration" state={state} />
          </Field>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>

          <Button
            form="lessonForm"
            type="submit"
            disabled={pending}
            className="cursor-pointer"
          >
            {pending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLessonFormDialog;