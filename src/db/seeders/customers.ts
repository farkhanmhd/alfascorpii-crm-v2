import { v4 as uuid } from 'uuid';
import db from '@/db/index';
import { customersTable, personsTable } from '../schema';

const seedCustomers = async () => {
  const customerIds = await db
    .select({ id: personsTable.id })
    .from(personsTable)
    .limit(50);

  await db.insert(customersTable).values(
    customerIds.map((customer) => ({
      id: `customer-${uuid()}`,
      personId: customer.id,
    }))
  );
};

seedCustomers();
