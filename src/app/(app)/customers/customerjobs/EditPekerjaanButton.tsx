import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { useEditDialog } from '@/hooks';

interface EditPekerjaanProps {
  id: number;
  pekerjaan: string;
  kode: string;
  status: 'SHOW' | 'HIDE';
}

const EditPekerjaanButton = ({
  id,
  pekerjaan,
  kode,
  status,
}: EditPekerjaanProps) => {
  const { setEditDialog } = useEditDialog();
  const openEditDialog = () => {
    setEditDialog((prevState) => ({
      ...prevState,
      pekerjaan: {
        ...prevState.pekerjaan,
        open: true,
        id,
        pekerjaan,
        kode,
        status,
      },
    }));
  };
  return (
    <Button variant="ghost" size="icon" onClick={openEditDialog}>
      <Edit />
    </Button>
  );
};

export default EditPekerjaanButton;
