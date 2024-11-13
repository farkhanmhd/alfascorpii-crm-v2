'use client';

import React from 'react';
import ComboBox from '@/components/fragments/form/ComboBox';
import DatePicker from '@/components/fragments/form/DatePicker';
import DatePickerWithRange from '@/components/fragments/form/DatePickerWithRange';
import { ScrollArea } from '@/components/ui/scrollarea';
import { useCustomerFilters } from '@/hooks';

const dateOptions = [
  {
    label: 'Purchase Date',
    value: 'purchase',
  },
  {
    label: 'Input',
    value: 'input',
  },
  {
    label: 'Update',
    value: 'update',
  },
  {
    label: 'Follow Up',
    value: 'follow-up',
  },
  {
    label: 'Deal Reject',
    value: 'deal-reject',
  },
  {
    label: 'Date of Birth',
    value: 'date-of-birth',
  },
];

const profileUpdateOptions = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Updated',
    value: 'updated',
  },
  {
    label: 'Not Updated',
    value: 'not-updated',
  },
];

const followUpOptions = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Never',
    value: 'never',
  },
];

const followUpMethodOptions = [
  {
    label: 'Whatsapp',
    value: 'whatsapp',
  },
  {
    label: 'Call',
    value: 'call',
  },
];

const resultFuOptions = [
  {
    label: 'HOT',
    value: 'hot',
  },
  {
    label: 'WARM',
    value: 'warm',
  },
  {
    label: 'COLD',
    value: 'cold',
  },
  {
    label: 'DEAL',
    value: 'deal',
  },
];

const productOptions = [
  {
    label: 'Product 1',
    value: 'product-1',
  },
  {
    label: 'Product 2',
    value: 'product-2',
  },
  {
    label: 'Product 3',
    value: 'product-3',
  },
];

const purchasedProductOptions = [
  {
    label: 'Product 1',
    value: 'product-1',
  },
  {
    label: 'Product 2',
    value: 'product-2',
  },
  {
    label: 'Product 3',
    value: 'product-3',
  },
];

const desiredProductOptions = [
  {
    label: 'Product 1',
    value: 'product-1',
  },
  {
    label: 'Product 2',
    value: 'product-2',
  },
  {
    label: 'Product 3',
    value: 'product-3',
  },
];

const areaOptions = [
  {
    label: 'Aceh',
    value: 'aceh',
  },
  {
    label: 'Medan',
    value: 'medan',
  },
  {
    label: 'Sumatera Utara',
    value: 'sumatera-utara',
  },
  {
    label: 'Riau',
    value: 'riau',
  },
  {
    label: 'Kepulauan Riau',
    value: 'kepulauan-riau',
  },
];

const dealerOptions = [
  {
    label: 'Dealer 1',
    value: 'dealer-1',
  },
  {
    label: 'Dealer 2',
    value: 'dealer-2',
  },
  {
    label: 'Dealer 3',
    value: 'dealer-3',
  },
];

const incomeOptions = [
  {
    label: 'Income 1',
    value: 'income-1',
  },
  {
    label: 'Income 2',
    value: 'income-2',
  },
  {
    label: 'Income 3',
    value: 'income-3',
  },
];

const houseOwnershipOptions = [
  {
    label: 'House Ownership 1',
    value: 'house-ownership-1',
  },
  {
    label: 'House Ownership 2',
    value: 'house-ownership-2',
  },
  {
    label: 'House Ownership 3',
    value: 'house-ownership-3',
  },
];

const CustomerFilter = () => {
  const { customerFilters, setCustomerFilters } = useCustomerFilters();
  const handleSelectChange = (key: string, value: string) => {
    setCustomerFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };
  return (
    <ScrollArea>
      <div className="max-h-[25vh] sm:max-h-[30vh] lg:max-h-[auto]">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ComboBox
            id="date-options"
            options={dateOptions}
            placeholder="Date Options"
            value={customerFilters.dateOptions}
            onSelect={(value) => handleSelectChange('dateOptions', value)}
          />
          {customerFilters.dateOptions === 'date-of-birth' ? (
            <DatePicker />
          ) : (
            customerFilters.dateOptions && <DatePickerWithRange />
          )}
          <ComboBox
            id="profile-update"
            options={profileUpdateOptions}
            placeholder="Choose Profile Update"
            value={customerFilters.profileUpdate}
            onSelect={(value) => handleSelectChange('profileUpdate', value)}
          />
          <ComboBox
            id="follow-up"
            options={followUpOptions}
            placeholder="Choose Follow Up"
            value={customerFilters.followUp}
            onSelect={(value) => handleSelectChange('followUp', value)}
          />
          <ComboBox
            id="fu-method"
            options={followUpMethodOptions}
            placeholder="Choose Method"
            value={customerFilters.fuMethod}
            onSelect={(value) => handleSelectChange('fuMethod', value)}
          />
          <ComboBox
            id="fu-result"
            options={resultFuOptions}
            placeholder="Choose Result"
            value={customerFilters.fuResult}
            onSelect={(value) => handleSelectChange('fuResult', value)}
          />
          <ComboBox
            id="product"
            options={productOptions}
            placeholder="Choose Product"
            value={customerFilters.product}
            onSelect={(value) => handleSelectChange('product', value)}
          />
          <ComboBox
            id="purchased-product"
            options={purchasedProductOptions}
            placeholder="Purchased Product"
            value={customerFilters.purchasedProduct}
            onSelect={(value) => handleSelectChange('purchasedProduct', value)}
          />
          <ComboBox
            id="desired-product"
            options={desiredProductOptions}
            placeholder="Desired Product"
            value={customerFilters.desiredProduct}
            onSelect={(value) => handleSelectChange('desiredProduct', value)}
          />
          <ComboBox
            id="area"
            options={areaOptions}
            placeholder="Choose Area"
            value={customerFilters.area}
            onSelect={(value) => handleSelectChange('area', value)}
          />
          <ComboBox
            id="dealer"
            options={dealerOptions}
            placeholder="Choose Dealer"
            value={customerFilters.dealer}
            onSelect={(value) => handleSelectChange('dealer', value)}
          />
          <ComboBox
            id="income"
            options={incomeOptions}
            placeholder="Choose Income"
            value={customerFilters.income}
            onSelect={(value) => handleSelectChange('income', value)}
          />
          <ComboBox
            id="house-ownership"
            options={houseOwnershipOptions}
            placeholder="House Ownership"
            value={customerFilters.houseOwnership}
            onSelect={(value) => handleSelectChange('houseOwnership', value)}
          />
        </div>
      </div>
    </ScrollArea>
  );
};

export default CustomerFilter;
