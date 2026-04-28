import httpService from "./http";
import { ApiEndpoints } from "./api-endpoints";

export type UploadFolder =
  | "products"
  | "categories"
  | "menu-items"
  | "branches"
  | "logos"
  | "users";

export interface UploadedImage {
  url: string;
  public_id: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
}

export const uploadImage = (file: File, folder: UploadFolder) =>
  httpService.upload<UploadedImage>({
    endpoint: ApiEndpoints.UPLOAD_IMAGE,
    files: file,
    additionalData: { folder },
  });

export const deleteImage = (publicId: string) =>
  httpService.delete({
    endpoint: ApiEndpoints.UPLOAD_IMAGE,
    data: { public_id: publicId },
  });
