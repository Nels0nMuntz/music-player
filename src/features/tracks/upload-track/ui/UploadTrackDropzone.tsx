import { Button } from "@/shared/ui";
import { File, X } from "lucide-react";
import { useState } from "react";
import Dropzone, { DropzoneState } from "shadcn-dropzone";
import { validateFile } from "../lib/validateFile";

interface Props {
  onChange: (file: File | null) => void;
}

export const UploadTrackDropzone: React.FC<Props> = ({ onChange }) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const handleDrop = (acceptedFiles: File[]) => {
    const validationResult = validateFile(acceptedFiles[0]);
    if (!validationResult) {
      setFile(acceptedFiles[0]);
      onChange(acceptedFiles[0]);
      setError("");
    } else {
      setFile(null);
      onChange(null);
      setError(validationResult.message);
    }
  };
  const handleCancel = () => {
    setFile(null);
    onChange(null);
    setError("");
  };
  return (
    <div>
      <Dropzone
        onDrop={handleDrop}
        accept={{
          "audio/mpeg": [".m2a", ".m3a", ".mp2", ".mp2a", ".mp3", ".mpga"],
          "audio/wav": [".wav"],
          "audio/x-wav": [".wav"],
          "audio/mp3": [".m2a", ".m3a", ".mp2", ".mp2a", ".mp3", ".mpga"],
        }}
        multiple={false}
        dropZoneClassName="h-36 bg-white border-primary"
      >
        {(dropzone: DropzoneState) => (
          <div className="">
            {dropzone.isDragAccept ? (
              <div className="text-sm font-medium">Drop your files here!</div>
            ) : (
              <div className="flex items-center flex-col gap-1.5">
                <div className="flex items-center flex-row gap-0.5 text-sm font-medium">
                  Upload files
                </div>
              </div>
            )}
          </div>
        )}
      </Dropzone>
      <div className="flex justify-between p-2 mt-2">
        {file && (
          <>
            <div className="flex items-center gap-x-2">
              <File />
              {file.name}
            </div>
            <Button size="icon" variant="ghost" className="cursor-pointer" onClick={handleCancel}>
              <X />
            </Button>
          </>
        )}
        {error && (
          <div className="min-h-9 flex items-center text-xs text-destructive font-medium">
            {error}
          </div>
        )}
        {!error && !file && (
          <div className="min-h-9 flex items-center text-xs text-gray-400 font-medium">
            No files uploaded so far.
          </div>
        )}
      </div>
    </div>
  );
};
