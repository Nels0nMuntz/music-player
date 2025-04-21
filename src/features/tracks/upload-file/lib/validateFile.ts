import { ErrorCode, FileError } from "react-dropzone";

const allowedMimeTypes = ["audio/mpeg", "audio/wav", "audio/mp3", "audio/x-wav"];
const maxSize = 10 * 1024 * 1024;

export const validateFile = (file: File): FileError | null => {
  if (!allowedMimeTypes.includes(file.type)) {
    return {
      code: ErrorCode.FileInvalidType,
      message: "Invalid file type. Only MP3 and WAV files are allowed.",
    };
  }
  if (file.size > maxSize) {
    return {
      code: ErrorCode.FileTooLarge,
      message: "File is too large. Maximum size is 10MB.",
    };
  }
  return null;
};
