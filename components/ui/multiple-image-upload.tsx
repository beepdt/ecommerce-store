"use client";
import { CloudUploadIcon, ImagePlusIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./button";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { info } from "console";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string[]) => void;
  onRemove: (value: string) => void;
  value: string[];
  multiple?: boolean;
}

const MultiImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
  multiple = false,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    const newUrls = result.info.files
      .filter((file: any) => file.uploadInfo?.secure_url)
      .map((file: any) => file.uploadInfo.secure_url);
    onChange(newUrls);
    ;
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex  flex-wrap items-center gap-4">
        {value.map((url, index) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                <Trash2Icon />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget
        onQueuesEnd={onUpload} //to handle multiple image upload
        uploadPreset="asdxasdwxw"
        options={{
          multiple: true,
          maxFiles:5
        }}
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlusIcon className="h-4 w-4 mr-2" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};
export default MultiImageUpload;
