import { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@repo/utils";
import { uploadFile } from "@/lib/uploadThing/uploadImage";
import {
  Avatar,
  AvatarFallback,
} from "@repo/ui";

type formImageProps = {
  handleImageChange: (image: string) => void;
  className?: string;
}

export default function ({ handleImageChange, className }: formImageProps) {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const { compressImage } = uploadFile();

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const callHandleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = await compressImage(e.target.files?.[0] || null, 0.8, 280, 280);
    if (result) {
      setPreview(result);
      handleImageChange(result);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        ref={fileInputRef}
        onChange={callHandleImageChange}
        accept="image/*"
        className="hidden"
      />
      <div
        onClick={handleAvatarClick}
        className="cursor-pointer"
      >
        <Avatar className={cn("h-[100px] w-[100px]", className)}>
          {preview ? (
            <Image
              src={preview}
              alt="Workspace logo"
              width={100}
              height={100}
              className="rounded-full object-cover"
            />
          ) : (
            <AvatarFallback>Logo</AvatarFallback>
          )}
        </Avatar>
      </div>
    </div>
  );
}