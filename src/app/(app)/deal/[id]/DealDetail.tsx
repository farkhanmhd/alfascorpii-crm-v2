'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { cn } from '@/lib/utils';
import { Save } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ImageUploadDropzone from '@/components/ImageDropzone';
import { IDealDetail } from '@/types';

const DealDetail = (props: IDealDetail) => {
  const [image, setImage] = useState<File | null>(null);
  const { back } = useRouter();
  return (
    <div className="mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Deal Details</h1>
      </header>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Deal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Deal ID</dt>
                <dd className="text-lg font-semibold">{props.id}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">CRO</dt>
                <dd className="font-semibold">{props.user}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Sales Unit
                </dt>
                <dd className="font-semibold">Sales Unit NC</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  {props.deal_type}
                </dt>
                <dd className="font-semibold">{props.relation}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd>
                  <Badge className="bg-blue-500">{props.deal_status}</Badge>
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Customer Name
                </dt>
                <dd className="font-semibold">{props.deal_customer_name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">NIK</dt>
                <dd className="font-semibold">{props.deal_customer_nik}</dd>
              </div>
              {/* <div>
                <dt className="text-sm font-medium text-gray-500">
                  Phone Number
                </dt>
                <dd className="font-semibold">{props.}</dd>
              </div> */}
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Date of Birth
                </dt>
                <dd className="font-semibold">
                  {props.deal_customer_born_date}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Additional Information
                </dt>
                <dd className="font-semibold">-</dd>
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
                <dt className="text-sm font-medium text-gray-500">
                  Transaction Type
                </dt>
                <dd className="font-semibold">{props.payment_method}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Leasing</dt>
                <dd className="font-semibold">{props.leasing}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Area/MDS</dt>
                <dd className="font-semibold">{props.dealer}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Purchase Date
                </dt>
                <dd className="font-semibold">{props.purchase_date}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Motorcycle
                </dt>
                <dd className="font-semibold">{props.motorcycle}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Color</dt>
                <dd className="font-semibold">{props.color}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Frame Number
                </dt>
                <dd className="font-semibold">{props.frame_number}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Call Date</dt>
                <dd className="font-semibold">{props.call_date}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Handover Photo</CardTitle>
        </CardHeader>
        <CardContent>
          <ImageUploadDropzone image={image} setImage={setImage} />
          {image && (
            <div className="mt-6 flex justify-end px-4">
              <Button className="flex gap-x-2">
                <Save />
                <span>Simpan Gambar</span>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-end space-x-4">
        <Button variant="outline" onClick={back}>
          Back
        </Button>
        <Button variant="blue">Update Status</Button>
      </div>
    </div>
  );
};

export default DealDetail;
