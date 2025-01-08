'use client';

import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { Upload, Trash, File, FilePenLine } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Props = {
  label: string;
  image: string | null;
  setImage: (image: string | null) => void;
};

const ImageUploadDropzone: React.FC<Props> = ({ label, image, setImage }) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = (e) => {
          setImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [setImage]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    multiple: false,
  });

  const removeImage = useCallback(() => {
    setImage(null);
    setFileName(null);
  }, [setImage]);

  return (
    <div className="mx-auto w-full px-4">
      <Label
        htmlFor="image-upload"
        className="mb-2 block text-sm font-semibold text-gray-700"
      >
        {label}
      </Label>
      <div
        {...getRootProps()}
        className={cn(
          'flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors',
          image
            ? 'border-gray-200 bg-gray-50'
            : 'cursor-pointer border-gray-300 hover:border-gray-400'
        )}
      >
        {!image ? (
          <>
            <Upload className="mb-3 h-12 w-12 text-gray-400" />
            <p className="text-sm text-gray-600">
              Click or drag and drop to upload
            </p>
          </>
        ) : (
          <div className="group relative w-full">
            <Image
              src={image}
              alt="Uploaded"
              className="h-auto w-full rounded-lg"
              width={300}
              height={300}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity group-hover:opacity-100">
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    document.getElementById('image-upload')?.click();
                  }}
                  className="bg-white text-gray-800 hover:bg-gray-100"
                >
                  <FilePenLine className="mr-2 h-4 w-4" />
                  Replace
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage();
                  }}
                  className="bg-white text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Remove
                </Button>
              </div>
            </div>
          </div>
        )}
        <input {...getInputProps()} id="image-upload" />
        {fileName && (
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <File className="mr-2 h-4 w-4" />
            <span className="font-medium">{fileName}</span>
            <span className="ml-2">(1 file)</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploadDropzone;
