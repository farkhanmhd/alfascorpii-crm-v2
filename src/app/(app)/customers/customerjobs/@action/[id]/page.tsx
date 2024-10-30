import React from 'react';
import { getCustomerJobById } from '@/app/lib/data/customers/customerjobs';
import CustomerJobAction from './CustomerJobAction';

type Params = Promise<{ id: string }>;

const EditPage = async ({ params }: { params: Params }) => {
  const { id } = await params;

  const data = await getCustomerJobById(id);

  if (!data) {
    return (
      <div className="flex h-full flex-1 flex-col">Failed to fetch data</div>
    );
  }

  const {
    jobs: { job_code: code, job_name: job, status },
  } = data;

  return (
    <CustomerJobAction job={job} code={code} status={status} id={Number(id)} />
  );
};

export default EditPage;
