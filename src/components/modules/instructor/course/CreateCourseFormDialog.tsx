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
import { createCourse } from "@/services/course/course.service";
import { Loader2, Plus } from "lucide-react";
import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface CourseFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const CreateCourseFormDialog = ({
  open,
  onOpenChange,
  onSuccess,
}: CourseFormDialogProps) => {
  const [state, formAction, pending] = useActionState(createCourse, null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [isPaid, setIsPaid] = useState(true);

  const thumbnailInputRef = useRef<HTMLInputElement | null>(null);
  const priceInputRef = useRef<HTMLInputElement | null>(null);

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

  useEffect(() => {
    if (!isPaid && priceInputRef.current) {
      priceInputRef.current.value = "";
    }
  }, [isPaid]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          <Plus className="mr-2 h-4 w-4" />
          Add Course
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-106.25 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Course</DialogTitle>
        </DialogHeader>

        <form id="courseForm" action={formAction} className="space-y-5">
          {/* Title */}
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input
              id="title"
              name="title"
              placeholder="Course title"
              defaultValue={state?.formData?.title || ""}
            />
            <InputFieldError field="title" state={state} />
          </Field>

          {/* Description */}
          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              id="description"
              name="description"
              placeholder="Course description"
              defaultValue={state?.formData?.description || ""}
            />
            <InputFieldError field="description" state={state} />
          </Field>

          {/* isPaid */}
          <Field>
            <div className="flex items-center gap-2">
              {/* default false */}
              <input type="hidden" name="isPaid" value="false" />

              <input
                id="isPaid"
                name="isPaid"
                type="checkbox"
                value="true"
                checked={isPaid}
                onChange={(e) => setIsPaid(e.target.checked)}
                className="h-4 w-4 accent-primary cursor-pointer"
              />

              <FieldLabel htmlFor="isPaid" className="m-0 cursor-pointer">
                Is this a paid course?
              </FieldLabel>
            </div>
          </Field>

          {/* Price */}
          <Field>
            <FieldLabel htmlFor="price">Price</FieldLabel>
            <Input
              ref={priceInputRef}
              id="price"
              name="price"
              type="number"
              placeholder={isPaid ? "Course price" : "Free course"}
              defaultValue={state?.formData?.price || ""}
              disabled={!isPaid}
            />
            <InputFieldError field="price" state={state} />
          </Field>

          {/* Thumbnail */}
          <Field>
            <FieldLabel htmlFor="thumbnail">Thumbnail</FieldLabel>
            <Input
              ref={thumbnailInputRef}
              id="thumbnail"
              name="thumbnail"
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setThumbnail(file);
              }}
            />

            {thumbnail && (
              <div className="mt-2">
                <Image
                  src={URL.createObjectURL(thumbnail)}
                  alt="Preview"
                  height={100}
                  width={150}
                  className="rounded-md object-cover"
                />
              </div>
            )}
          </Field>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>

          <Button
            form="courseForm"
            type="submit"
            disabled={pending}
            className="cursor-pointer"
          >
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCourseFormDialog;
