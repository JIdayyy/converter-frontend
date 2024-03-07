import { ChangeEvent, useState } from "react";

type UseUploadState = {
  file: File | null;
  loading: boolean;
  data: any;
  progress: number;
};

type TUploadParams = Record<string, any>;

export default function useUpload() {
  const [state, setState] = useState<UseUploadState>({
    file: null,
    loading: false,
    data: null,
    progress: 0,
  });

  const handleUpload = async ({
    resolution,
    format,
  }: {
    resolution: string;
    format: string;
  }) => {
    const xhr = new XMLHttpRequest();

    xhr.open(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL}/convert?fileName=${state.file?.name}&resolution=${resolution}&format=${format}`,
      true
    );

    xhr.upload.onprogress = (e) => {
      setState((state) => ({
        ...state,
        progress: Math.round((e.loaded / e.total) * 100),
      }));
    };

    xhr.onloadend = (e) => {
      setState((state) => ({
        ...state,
        loading: false,
        data: JSON.parse(xhr.responseText),
      }));
    };

    setState((state) => ({
      ...state,
      loading: true,
    }));
    xhr.send(state.file);
  };

  const handleFileChange = (file: File) => {
    if (file) {
      setState((state) => ({
        ...state,
        file,
      }));
    }
  };

  return {
    handleUpload,
    handleFileChange,
    fileName: state.file?.name,
    fileType: state.file?.type,
    loading: state.loading,
    data: state.data,
    progress: state.progress,
    url: state.file ? URL.createObjectURL(state.file) : null,
  };
}
