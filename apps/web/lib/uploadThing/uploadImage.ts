import { useUploadThing } from "@/lib/uploadThing/uploadthing";
import Compressor from "compressorjs";
import { toast } from "sonner";

function dataURLtoFile(dataurl: string, filename: string): File {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export const uploadFile = () => {
    const { startUpload } = useUploadThing("imageUploader", {
        onClientUploadComplete: () => {
            console.log("Upload Completed");
        },

        onUploadError: (error) => {
            console.log("Error uploading file", error);
            toast.error("Error uploading file");
        }
    });

    const upload = async (dataUrl: string, fileName: string, file : File | null = null) => {
        if (!file) {
            file = dataURLtoFile(dataUrl, fileName);
        }

        const uploadedFile = await startUpload([file]).catch((error) => {
            console.error("Error uploading file", error);
            toast.error("Error uploading file");
            return "";
        });

        return uploadedFile?.[0]?.url || "";
    }

    const compressImage = (file: File | null, quality: number = 0.8, width: number | undefined = undefined, height: number | undefined = undefined) => {
        return new Promise((resolve, reject) => {
            if (file) {
                new Compressor(file, {
                    quality: quality,
                    width: width,
                    height: height,
                    resize: "cover",
                    success: (compressedImage) => {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            resolve(reader.result);
                        };
                        reader.readAsDataURL(compressedImage);
                    },
                    error: (error) => {
                        console.log("@CompressImage: Error compressing image", error);
                        reject(null);
                    }
                })
            }
            else {
                resolve(null);
            }
        });
    };

    return {
        upload,
        compressImage,
    }

}