import { NextRequest, NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

export interface IStaff {
  id: string;
  username: string;
  name: string;
  email: string;
  status: string;
  role: string;
  password: string;
  created_at: string;
  updated_at: string;
}

const data: IStaff[] = [
  {
    id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    username: 'johndoe123',
    name: 'John Doe',
    email: 'johndoe@example.com',
    status: 'active',
    role: 'admin',
    password: 'password123',
    created_at: '2022-07-25T14:30:00.000Z',
    updated_at: '2022-07-25T14:30:00.000Z',
  },
  {
    id: 'f8c0b1e0-3b7d-4bad-9bdd-2b0d7b3dcb6e',
    username: 'janedoe456',
    name: 'Jane Doe',
    email: 'janedoe@example.com',
    status: 'inactive',
    role: 'user',
    password: 'password456',
    created_at: '2022-07-25T14:31:00.000Z',
    updated_at: '2022-07-25T14:31:00.000Z',
  },
  {
    id: 'd4c0b1e2-3b7d-4bad-9bdd-2b0d7b3dcb6f',
    username: 'johndoe789',
    name: 'John Doe',
    email: 'johndoe789@example.com',
    status: 'active',
    role: 'user',
    password: 'password789',
    created_at: '2022-07-25T14:32:00.000Z',
    updated_at: '2022-07-25T14:32:00.000Z',
  },
  {
    id: 'e4c0b1e3-3b7d-4bad-9bdd-2b0d7b3dcb70',
    username: 'janedoe012',
    name: 'Jane Doe',
    email: 'janedoe012@example.com',
    status: 'inactive',
    role: 'admin',
    password: 'password012',
    created_at: '2022-07-25T14:33:00.000Z',
    updated_at: '2022-07-25T14:33:00.000Z',
  },
  {
    id: 'c4c0b1e4-3b7d-4bad-9bdd-2b0d7b3dcb71',
    username: 'johndoe345',
    name: 'John Doe',
    email: 'johndoe345@example.com',
    status: 'active',
    role: 'user',
    password: 'password345',
    created_at: '2022-07-25T14:34:00.000Z',
    updated_at: '2022-07-25T14:34:00.000Z',
  },
  {
    id: 'b4c0b1e5-3b7d-4bad-9bdd-2b0d7b3dcb72',
    username: 'janedoe678',
    name: 'Jane Doe',
    email: 'janedoe678@example.com',
    status: 'inactive',
    role: 'admin',
    password: 'password678',
    created_at: '2022-07-25T14:35:00.000Z',
    updated_at: '2022-07-25T14:35:00.000Z',
  },
  {
    id: 'a4c0b1e6-3b7d-4bad-9bdd-2b0d7b3dcb73',
    username: 'johndoe901',
    name: 'John Doe',
    email: 'johndoe901@example.com',
    status: 'active',
    role: 'user',
    password: 'password901',
    created_at: '2022-07-25T14:36:00.000Z',
    updated_at: '2022-07-25T14:36:00.000Z',
  },
  {
    id: '94c0b1e7-3b7d-4bad-9bdd-2b0d7b3dcb74',
    username: 'janedoe234',
    name: 'Jane Doe',
    email: 'janedoe234@example.com',
    status: 'inactive',
    role: 'admin',
    password: 'password234',
    created_at: '2022-07-25T14:37:00.000Z',
    updated_at: '2022-07-25T14:37:00.000Z',
  },
  {
    id: '84c0b1e8-3b7d-4bad-9bdd-2b0d7b3dcb75',
    username: 'johndoe567',
    name: 'John Doe',
    email: 'johndoe567@example.com',
    status: 'active',
    role: 'user',
    password: 'password567',
    created_at: '2022-07-25T14:38:00.000Z',
    updated_at: '2022-07-25T14:38:00.000Z',
  },
  {
    id: '74c0b1e9-3b7d-4bad-9bdd-2b0d7b3dcb76',
    username: 'janedoe890',
    name: 'Jane Doe',
    email: 'janedoe890@example.com',
    status: 'inactive',
    role: 'admin',
    password: 'password890',
    created_at: '2022-07-25T14:39:00.000Z',
    updated_at: '2022-07-25T14:39:00.000Z',
  },
  {
    id: '64c0b1ea-3b7d-4bad-9bdd-2b0d7b3dcb77',
    username: 'johndoe111',
    name: 'John Doe',
    email: 'johndoe111@example.com',
    status: 'active',
    role: 'user',
    password: 'password111',
    created_at: '2022-07-25T14:40:00.000Z',
    updated_at: '2022-07-25T14:40:00.000Z',
  },
  {
    id: '54c0b1eb-3b7d-4bad-9bdd-2b0d7b3dcb78',
    username: 'janedoe222',
    name: 'Jane Doe',
    email: 'janedoe222@example.com',
    status: 'inactive',
    role: 'admin',
    password: 'password222',
    created_at: '2022-07-25T14:41:00.000Z',
    updated_at: '2022-07-25T14:41:00.000Z',
  },
  {
    id: '44c0b1ec-3b7d-4bad-9bdd-2b0d7b3dcb79',
    username: 'johndoe333',
    name: 'John Doe',
    email: 'johndoe333@example.com',
    status: 'active',
    role: 'user',
    password: 'password333',
    created_at: '2022-07-25T14:42:00.000Z',
    updated_at: '2022-07-25T14:42:00.000Z',
  },
  {
    id: '34c0b1ed-3b7d-4bad-9bdd-2b0d7b3dcb80',
    username: 'janedoe444',
    name: 'Jane Doe',
    email: 'janedoe444@example.com',
    status: 'inactive',
    role: 'admin',
    password: 'password444',
    created_at: '2022-07-25T14:43:00.000Z',
    updated_at: '2022-07-25T14:43:00.000Z',
  },
  {
    id: '24c0b1ee-3b7d-4bad-9bdd-2b0d7b3dcb81',
    username: 'johndoe555',
    name: 'John Doe',
    email: 'johndoe555@example.com',
    status: 'active',
    role: 'user',
    password: 'password555',
    created_at: '2022-07-25T14:44:00.000Z',
    updated_at: '2022-07-25T14:44:00.000Z',
  },
  {
    id: '14c0b1ef-3b7d-4bad-9bdd-2b0d7b3dcb82',
    username: 'janedoe666',
    name: 'Jane Doe',
    email: 'janedoe666@example.com',
    status: 'inactive',
    role: 'admin',
    password: 'password666',
    created_at: '2022-07-25T14:45:00.000Z',
    updated_at: '2022-07-25T14:45:00.000Z',
  },
  {
    id: '04c0b1f0-3b7d-4bad-9bdd-2b0d7b3dcb83',
    username: 'johndoe777',
    name: 'John Doe',
    email: 'johndoe777@example.com',
    status: 'active',
    role: 'user',
    password: 'password777',
    created_at: '2022-07-25T14:46:00.000Z',
    updated_at: '2022-07-25T14:46:00.000Z',
  },
  {
    id: 'f4c0b1f1-3b7d-4bad-9bdd-2b0d7b3dcb84',
    username: 'janedoe888',
    name: 'Jane Doe',
    email: 'janedoe888@example.com',
    status: 'inactive',
    role: 'admin',
    password: 'password888',
    created_at: '2022-07-25T14:47:00.000Z',
    updated_at: '2022-07-25T14:47:00.000Z',
  },
  {
    id: 'e4c0b1f2-3b7d-4bad-9bdd-2b0d7b3dcb85',
    username: 'johndoe999',
    name: 'John Doe',
    email: 'johndoe999@example.com',
    status: 'active',
    role: 'user',
    password: 'password999',
    created_at: '2022-07-25T14:48:00.000Z',
    updated_at: '2022-07-25T14:48:00.000Z',
  },
  {
    id: 'd4c0b1f3-3b7d-4bad-9bdd-2b0d7b3dcb86',
    username: 'janedoe000',
    name: 'Jane Doe',
    email: 'janedoe000@example.com',
    status: 'inactive',
    role: 'admin',
    password: 'password000',
    created_at: '2022-07-25T14:49:00.000Z',
    updated_at: '2022-07-25T14:49:00.000Z',
  },
];

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const id = searchParams.get('id');

    if (id) {
      const staff = data.find((staff) => staff.id === id);
      if (staff) {
        return NextResponse.json({
          status: 200,
          message: 'Success',
          data: staff,
        });
      } else {
        return NextResponse.json({
          status: 404,
          message: 'Staff not found',
        });
      }
    } else {
      try {
        return NextResponse.json({
          status: 200,
          message: 'Success',
          data: data,
        });
      } catch (error) {
        if (error instanceof Error) {
          return NextResponse.json({
            status: 500,
            message: error.message,
          });
        }
        return NextResponse.json({
          status: 400,
          message: 'Please provide an id',
        });
      }
    }
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: (error as Error).message,
    });
  }
}
