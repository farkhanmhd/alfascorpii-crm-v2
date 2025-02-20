'use client';

import React, { useState } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { IDealDetail, SelectOptions } from '@/types';
import ImageUploadDropzone from '@/components/ImageDropzone';
import {
  importDealImageAction,
  updateDealStatusAction,
} from '@/app/lib/actions/customers/deal';
import {
  actionResponseToast,
  checkPermission,
  getErrorMessages,
} from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { SelectBox } from '@/components/elements/form/Select';
import { usePermissions } from '@/hooks';

const dealStatus: SelectOptions[] = [
  {
    label: 'Approve',
    value: 'APPROVE',
  },
  {
    label: 'Pending',
    value: 'PENDING',
  },
  {
    label: 'Reject',
    value: 'REJECT',
  },
];

const DealDetail = (props: IDealDetail) => {
  const params = useParams();
  const id = params.id as string;
  const [image, setImage] = useState<File | null>(null);
  const [dealResult, setDealResult] = useState<string>('');
  const [open, setOpen] = useState(false);
  const { permissions } = usePermissions();

  const { execute, isPending } = useAction(importDealImageAction, {
    onSettled: (actionResult) => {
      actionResponseToast(actionResult);
      setImage(null);
    },
  });

  const {
    execute: execStatus,
    isPending: pendingStatus,
    result,
  } = useAction(updateDealStatusAction, {
    onSettled: (actionResult) => {
      actionResponseToast(actionResult);
      setOpen(false);
    },
  });

  const { back } = useRouter();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approve':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'reject':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  const canUpdateStatus = checkPermission('update_deal_status', permissions);
  const canSavePhoto = checkPermission('save_imported_deal_photo', permissions);

  return (
    <div className="mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Deal Details</h1>
      </header>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-4 md:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Customer Name
                </dt>
                <dd className="font-semibold">{props.deal_customer_name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  NIK
                </dt>
                <dd className="font-semibold">{props.deal_customer_nik}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Date of Birth
                </dt>
                <dd className="font-semibold">
                  {props.deal_customer_born_date}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Relasi
                </dt>
                <dd className="font-semibold">{props.relation}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Additional Information
                </dt>
                <dd className="font-semibold">{props.additional_info}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Deal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-4 md:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Deal ID
                </dt>
                <dd className="text-lg font-semibold">{props.id}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  CRO
                </dt>
                <dd className="font-semibold">{props.user}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Tipe Deal
                </dt>
                <dd className="font-semibold">{props.deal_type}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Status
                </dt>
                <dd>
                  <Badge
                    className={getStatusColor(props.deal_status as string)}
                  >
                    {props.deal_status}
                  </Badge>
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Transaction Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-4 md:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Transaction Type
                </dt>
                <dd className="font-semibold">{props.payment_method}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Leasing
                </dt>
                <dd className="font-semibold">{props.leasing}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Area/MDS
                </dt>
                <dd className="font-semibold">{props.dealer}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Purchase Date
                </dt>
                <dd className="font-semibold">{props.purchase_date}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Motorcycle
                </dt>
                <dd className="font-semibold">{props.motorcycle}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Color
                </dt>
                <dd className="font-semibold">{props.color}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Frame Number
                </dt>
                <dd className="font-semibold">{props.frame_number}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Call Date
                </dt>
                <dd className="font-semibold">{props.call_date}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      {props.photos.length > 0 ? (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Handover Photos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {props.photos.map((photo, index) => (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <div className="relative aspect-square w-full cursor-pointer overflow-hidden rounded-md">
                      <Image
                        src={photo.url || '/placeholder.svg'}
                        alt={`Handover photo ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform hover:scale-105"
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Handover Photo {index + 1}</DialogTitle>
                    </DialogHeader>
                    <div className="relative aspect-square w-full">
                      <Image
                        src={photo.url || '/placeholder.svg'}
                        alt={`Handover photo ${index + 1}`}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
              {canSavePhoto && (
                <ImageUploadDropzone image={image} setImage={setImage} />
              )}
            </div>
            {canSavePhoto && image && (
              <div className="mt-6 flex justify-end px-4">
                <Button
                  className="flex gap-x-2"
                  onClick={() => execute({ id, file: image })}
                  disabled={isPending}
                >
                  <Save />
                  <span>Simpan Gambar</span>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Handover Photo</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUploadDropzone image={image} setImage={setImage} />
            {image && (
              <div className="mt-6 flex justify-end px-4">
                <Button
                  className="flex gap-x-2"
                  onClick={() => execute({ id, file: image })}
                  disabled={isPending}
                >
                  <Save />
                  <span>Simpan Gambar</span>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <div className="mt-8 flex justify-end space-x-4">
        <Button variant="outline" onClick={back}>
          Back
        </Button>
        {canUpdateStatus && (
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="default">Update Status</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Update Status</AlertDialogTitle>
              </AlertDialogHeader>
              <SelectBox
                options={dealStatus}
                id="deal-result"
                label="Hasil Deal"
                placeholder="Hasil Deal"
                value={dealResult}
                setValue={setDealResult}
                error={getErrorMessages(result?.validationErrors?.deal_status)}
              />
              <AlertDialogFooter>
                <Button
                  onClick={() => execStatus({ id, deal_status: dealResult })}
                  disabled={pendingStatus}
                >
                  Update Status
                </Button>
                <AlertDialogCancel asChild>
                  <Button
                    className="absolute right-0 top-0 border-none"
                    size="icon"
                    variant="ghost"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
};

export default DealDetail;
