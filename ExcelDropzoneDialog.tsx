'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { useDropzone } from 'react-dropzone';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useActionDialog } from '@/hooks';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  FileSpreadsheet,
  Upload,
  Download,
  Loader2,
  Trash,
  CircleX,
  CircleCheck,
} from 'lucide-react';
import { importFollowUpAction } from '@/app/lib/actions/customers';
import { ScrollArea } from '@/components/ui/scroll-area';

const ExcelDropzoneDialog = () => {
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [submissionErrors, setSubmissionErrors] = useState<any[] | null>(null);
  const { actionDialog, handleClose } = useActionDialog();
  const { execute, isPending } = useAction(importFollowUpAction, {
    onSuccess: ({ data }) => {
      if (data?.status === 'success') {
        if (data.errors) {
          setSubmissionErrors(data.errors);
        }
      } else {
        setSubmissionErrors(null);
      }
      setResponseMessage(data?.message);
    },
  });

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
      setSubmissionErrors(null);
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

  const handleDelete = () => {
    setFile(null);
    setError(null);
    setFileData(null);
    setSubmissionErrors(null);
    setResponseMessage(null);
  };

  return (
    <AlertDialog open={actionDialog?.create} onOpenChange={handleClose}>
      <AlertDialogContent className="sm:max-w-[500px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Import Excel File</AlertDialogTitle>
        </AlertDialogHeader>

        {!file ? (
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
        ) : (
          <Alert className="flex items-center justify-between">
            <div className="flex items-center">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              <div>
                <AlertTitle>File selected</AlertTitle>
                <AlertDescription>{file.name}</AlertDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="text-destructive hover:text-destructive/90"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </Alert>
        )}
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {responseMessage && (
          <p className="flex items-center justify-between px-2 text-sm">
            <span>{responseMessage}</span>
            <span>
              <CircleCheck className="text-green-500" />
            </span>
          </p>
        )}
        {submissionErrors && (
          <>
            <p className="flex items-center justify-between px-2 text-sm">
              <span>{submissionErrors.length} data error</span>
              <span>
                <CircleX className="text-destructive" />
              </span>
            </p>
            <Alert variant="destructive">
              <ScrollArea className="max-h-40">
                <AlertDescription>
                  <ul className="list-inside list-disc">
                    {submissionErrors.map((errorData, index) => (
                      <li key={index}>{errorData}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </ScrollArea>
            </Alert>
          </>
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
        <AlertDialogFooter className="mt-4 flex gap-y-4 sm:flex-col sm:space-x-0">
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
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ExcelDropzoneDialog;
