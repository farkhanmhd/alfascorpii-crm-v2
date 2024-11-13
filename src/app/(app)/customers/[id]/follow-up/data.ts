import { IFollowUp } from '@/types';

const getFollowUpList = (): Promise<IFollowUp[]> => {
  const data: IFollowUp[] = [
    {
      id: 1,
      follow_up: 'Follow Up #1',
      phone_receiver: 'John Doe',
      relationship: 'Owner',
      whatsapp: '+1234567890',
      date: '2024-11-15',
      method: 'Phone call',
      status: 'Completed',
      result: 'Completed',
      motorcycle: 'Yamaha MT-07',
    },
    {
      id: 2,
      follow_up: 'Follow Up #2',
      phone_receiver: 'Jane Smith',
      relationship: 'Owner',
      whatsapp: '+1987654321',
      date: '2024-11-16',
      method: 'WhatsApp message',
      status: 'Pending',
      result: 'Pending',
      motorcycle: 'Yamaha R1',
    },
    {
      id: 3,
      follow_up: 'Follow Up #3',
      phone_receiver: 'Alice Johnson',
      relationship: "Owner's spouse",
      whatsapp: '+1123456789',
      date: '2024-11-17',
      method: 'Email',
      status: 'In progress',
      result: 'In progress',
      motorcycle: 'Yamaha XSR700',
    },
    {
      id: 4,
      follow_up: 'Follow Up #4',
      phone_receiver: 'Michael Brown',
      relationship: 'Owner',
      whatsapp: '+1478523690',
      date: '2024-11-18',
      method: 'SMS',
      status: 'Completed',
      result: 'Completed',
      motorcycle: 'Yamaha YZF-R3',
    },
    {
      id: 5,
      follow_up: 'Follow Up #5',
      phone_receiver: 'Emily Davis',
      relationship: "Owner's daughter",
      whatsapp: '+1098765432',
      date: '2024-11-19',
      method: 'Phone call',
      status: 'Attempted',
      result: 'Attempted',
      motorcycle: 'Yamaha MT-09',
    },
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 2000);
  });
};

export default getFollowUpList;
