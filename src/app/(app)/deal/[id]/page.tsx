'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { cn } from '@/lib/utils';
import { Save } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ImageUploadDropzone from '@/components/ImageDropzone';

const DealDetailPage = () => {
  const [image, setImage] = useState<string | null>(null);
  const { back } = useRouter();
  return (
    <div className="mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Deal Details</h1>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Deal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Deal ID</dt>
                <dd className="text-lg font-semibold">DEAL123456</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">CRO</dt>
                <dd className="font-semibold">CRO A</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Sales Unit
                </dt>
                <dd className="font-semibold">Sales Unit NC</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Deal Type</dt>
                <dd className="font-semibold">Konsumen Langsung</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd>
                  <Badge className="bg-blue-500">Pending</Badge>
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
                <dd className="font-semibold">Jhon Doe</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">NIK</dt>
                <dd className="font-semibold">123451234512345</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Phone Number
                </dt>
                <dd className="font-semibold">081267896543</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Date of Birth
                </dt>
                <dd className="font-semibold">DD/MM/YYY</dd>
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

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Transaction Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-4 md:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Transaction Type
                </dt>
                <dd className="font-semibold">Kredit</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Leasing</dt>
                <dd className="font-semibold">Adira Finance</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Area/MDS</dt>
                <dd className="font-semibold">MDS A</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Purchase Date
                </dt>
                <dd className="font-semibold">DD/MM/YYY</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Motor Type
                </dt>
                <dd className="font-semibold">NMAX A</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Color</dt>
                <dd className="font-semibold">HITAM</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Frame Number
                </dt>
                <dd className="font-semibold">1234MH98RK123456</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Call Date</dt>
                <dd className="font-semibold">DD/MM/YYYY</dd>
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

export default DealDetailPage;
