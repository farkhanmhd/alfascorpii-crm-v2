'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { useDropzone } from 'react-dropzone';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useActionDialog, useSubmitToast } from '@/hooks';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FileSpreadsheet, Upload, Download, Loader2 } from 'lucide-react';
import { importFollowUpAction } from '@/app/lib/actions/customers';

const ExcelDropzoneDialog = () => {
  const { execute, result, isPending, reset } = useAction(importFollowUpAction);
  const { actionDialog, handleClose } = useActionDialog();
  const [file, setFile] = useState<File | null>(null);
  const [fileData, setFileData] = useState<File[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { push } = useRouter();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const droppedFile = acceptedFiles[0];
      setFile(droppedFile);
      setError(null);
      setFileData(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx',
      ],
      'application/vnd.ms-excel': ['.xls'],
    },
    maxFiles: 1,
  });

  const handleSubmit = () => {
    if (!file) {
      setError('Please select a file before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    execute(formData);
  };
  useSubmitToast(result, handleClose, reset);

  return (
    <Dialog open={actionDialog?.create} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Excel File</DialogTitle>
        </DialogHeader>

        <div
          {...getRootProps()}
          className={`cursor-pointer rounded-lg border-2 border-dashed p-10 text-center ${
            isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300'
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the Excel file here...</p>
          ) : (
            <div className="space-y-2">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p>Drag & drop an Excel file here, or click to select one</p>
              <p className="text-xs text-gray-500">
                Supports .xlsx and .xls files
              </p>
            </div>
          )}
        </div>
        {file && (
          <Alert>
            <FileSpreadsheet className="h-4 w-4" />
            <AlertTitle>File selected</AlertTitle>
            <AlertDescription>{file.name}</AlertDescription>
          </Alert>
        )}
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {fileData && (
          <Alert>
            <FileSpreadsheet className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              File processed successfully. {fileData.length} rows found.
            </AlertDescription>
          </Alert>
        )}
        <DialogFooter className="mt-4 flex gap-y-4 sm:flex-col sm:space-x-0">
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-between">
            <Button variant="outline" onClick={() => push('/template.xlsx')}>
              <Download className="mr-2 h-4 w-4" />
              Download Template
            </Button>
            <Button
              onClick={handleSubmit}
              className="w-full sm:w-auto"
              disabled={!file || isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Importing...</span>
                </>
              ) : (
                <span>Import</span>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExcelDropzoneDialog;
