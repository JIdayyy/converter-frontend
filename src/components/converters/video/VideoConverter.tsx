"use client";
import { Button } from "@/components/ui/button";
import useUpload from "@/hooks/useUpload";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReactPlayer from "react-player";
import { useDropzone } from "react-dropzone";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FormGroup from "@/components/ui/Form/FormGroup";

export default function VideoConverterCard() {
  const { handleUpload, handleFileChange, data, loading, progress } =
    useUpload();

  const onDrop = (acceptedFiles: any) => {
    handleFileChange(acceptedFiles[0]);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const [state, setState] = useState({
    resolution: "1920x1080",
    format: "mp4",
  });

  const handleDownload = () => {
    if (!data) {
      return;
    }
    const link = document.createElement("a");
    link.href = data.url;
    link.download = "video.mp4";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Video converter</CardTitle>
        <CardDescription>
          Convert your video to any format and resolution
        </CardDescription>
      </CardHeader>
      <CardContent className={"space-y-2"}>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {
            <div
              className={
                "border hover:bg-gray-900 cursor-pointer border-dotted flex flex-col items-center align-middle justify-center border-gray-700 w-full h-[208px] rounded-md"
              }
            >
              <FaCloudUploadAlt size={50} />
              <p>Drag and drop your video here</p>
            </div>
          }
        </div>

        <FormGroup label={"Resolution"}>
          <Select
            defaultValue={state.resolution}
            onValueChange={(value) => {
              setState((state) => ({
                ...state,
                resolution: value,
              }));
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Resolution" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1920x1080">1920x1080</SelectItem>
              <SelectItem value="1280x720">1280x720</SelectItem>
              <SelectItem value="640x480">640x480</SelectItem>
              <SelectItem value="320x240">320x240</SelectItem>
              <SelectItem value="160x120">160x120</SelectItem>
            </SelectContent>
          </Select>
        </FormGroup>

        <FormGroup label={"Format"}>
          <Select
            defaultValue={state.format}
            onValueChange={(value) => {
              setState((state) => ({
                ...state,
                format: value,
              }));
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mp4">mp4</SelectItem>
              <SelectItem value="webm">webm</SelectItem>
              <SelectItem value="ogg">ogg</SelectItem>
            </SelectContent>
          </Select>
        </FormGroup>

        <Progress value={progress} />

        <Button
          className={"w-full"}
          loading={loading}
          onClick={() =>
            handleUpload({
              resolution: state.resolution,
              format: state.format,
            })
          }
        >
          CONVERT
        </Button>
      </CardContent>

      {data && (
        <Button
          className={"w-full"}
          variant="link"
          onClick={() => handleDownload()}
        >
          DOWNLOAD
        </Button>
      )}
      {data && <ReactPlayer url={data.url} controls={true} />}
    </Card>
  );
}
