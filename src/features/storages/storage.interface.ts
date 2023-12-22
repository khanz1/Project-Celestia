export interface UploadSingleApi {
  statusCode: number;
  message: string;
  data: {
    fileUrl: string;
    publicUrl: string;
  };
}