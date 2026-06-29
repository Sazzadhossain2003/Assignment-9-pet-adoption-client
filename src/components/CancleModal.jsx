'use client';

import { authClient } from '@/lib/auth-client';
import { AlertDialog, Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FaTrashAlt } from 'react-icons/fa';

export function CancleModal({ myRequests, status }) {
  console.log(status);
  const router = useRouter();
  console.log(myRequests);
  const handleCancle = async () => {
    const { data: tokenData } = await authClient.token();
    console.log(tokenData);
    if (status !== 'approved') {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER}/request/${myRequests}`,
          {
            method: 'DELETE',
            headers: {
              'content-type': 'application/json',
              authorization: `Bearer ${tokenData?.token}`,
            },
          },
        );
        const data = await res.json();

        if (res.ok) {
          toast.success('Request cancelled successfully');
          router.refresh();
        } else {
          console.error('Failed to delete');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      toast.success('You can not delete ');
    }
  };
  return (
    <AlertDialog>
      <Button variant="outline" className="text-red-500">
        <FaTrashAlt size={12} />
        Cancle
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Cancle Adopt pet?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete and all of its data. This action
                cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleCancle} slot="close" variant="danger">
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
