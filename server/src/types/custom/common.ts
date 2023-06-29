export interface JwtPayload {
  Id: string;
  email: string;
  role: string;
}

export interface UploadedFileInterface {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  path: string;
  size: number;
  filename: string;
}
