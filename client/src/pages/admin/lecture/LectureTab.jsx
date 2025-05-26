import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEditLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const LectureTab = () => {
  const navigate = useNavigate();
  const { courseId, lectureId } = useParams();
  const { data: lectureData } = useGetLectureByIdQuery(lectureId);
  const lecture = lectureData?.lecture;

  const [lectureTitle, setLectureTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isFree, setIsFree] = useState(false);

  const [editLecture, { isLoading: saving, isSuccess, error }] = useEditLectureMutation();
  const [removeLecture, { isLoading: removing, isSuccess: removed }] = useRemoveLectureMutation();

  // populate form fields when lecture loads
  useEffect(() => {
    if (lecture) {
      setLectureTitle(lecture.lectureTitle);
      setVideoUrl(lecture.videoUrl || "");
      setIsFree(lecture.isPreviewFree);
    }
  }, [lecture]);

  // toast on success / error
  useEffect(() => {
    if (isSuccess) toast.success("Lecture updated!");
    if (error) toast.error((error).data?.message || "Update failed");
  }, [isSuccess, error]);

  useEffect(() => {
    if (removed) {
      // show toast
      toast.success("Lecture removed");
      // after 2 seconds, go back to the lecture list
      const timer = setTimeout(() => {
        navigate(`/admin/course/${courseId}/lecture`);
      }, 1500);
      // cleanup in case component unmounts early
      return () => clearTimeout(timer);
    }
  }, [courseId, navigate, removed]);

  const handleSave = () => {
    editLecture({
      lectureTitle,
      videoUrl,
      isPreviewFree: isFree,
      courseId,
      lectureId,
    });
  };

  const handleRemove = () => {
    removeLecture(lectureId);
  };

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>Make changes and click save.</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button disbaled={removing} variant="destructive" onClick={handleRemove}>
            {
              removing ? <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
              Please wait
              </> : "Remove Lecture"
            }
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Ex. Introduction to JavaScript"
          />
        </div>

        <div>
          <Label htmlFor="videoUrl">Video URL</Label>
          <Input
            id="videoUrl"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Ex: https://youtu.be/abcd1234"
          />
        </div>

        <div className="flex items-center space-x-2 my-5">
          <Switch checked={isFree} onCheckedChange={setIsFree} id="airplane-mode" />
          <Label htmlFor="airplane-mode">Is this video FREE</Label>
        </div>

        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving…
            </>
          ) : (
            "Update Lecture"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
