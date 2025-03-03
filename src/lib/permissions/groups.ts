export const permissionGroups = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    permissions: ['view_dashboard'],
  },
  {
    id: 'sales',
    label: 'Sales',
    permissions: ['view_sales'],
    children: [
      {
        id: 'sales_follow_up',
        label: 'Follow Up',
        permissions: [
          'view_sales_follow_up',
          'sales_fu_import_data',
          'sales_fu_assign_to_cro',
          'sales_fu_view_detail_customer_data',
          'sales_fu_update_customer_data',
          'sales_fu_add_follow_up',
          'sales_fu_view_detail_history_follow_up',
          'sales_fu_add_deal_from_follow_up',
          'sales_fu_edit_recipient_data',
          'sales_fu_save_family_card_number',
          'sales_fu_update_family_member_button',
          'sales_fu_save_updated_family_member_button',
        ],
      },
      {
        id: 'sales_duplicate',
        label: 'Duplicate Data',
        permissions: [
          'view_sales_duplicate_data',
          'sales_duplicate_data_assign_to_cro',
          'sales_duplicate_data_delete_button',
        ],
      },
      {
        id: 'sales_customers',
        label: 'Customers',
        permissions: [
          'view_sales_customer',
          'sales_customer_view_detail_customer_data',
        ],
      },
    ],
  },
  {
    id: 'service',
    label: 'Service',
    permissions: ['view_service'],
    children: [
      {
        id: 'service_follow_up',
        label: 'Follow Up',
        permissions: [
          'view_service_follow_up',
          'service_fu_import_data',
          'service_fu_assign_to_cro',
          'service_fu_view_detail_customer_data',
          'service_fu_update_customer_data',
          'service_fu_add_follow_up',
          'service_fu_view_detail_history_follow_up',
          'service_fu_add_deal_from_follow_up',
          'service_fu_edit_recipient_data',
          'service_fu_save_family_card_number',
          'service_fu_update_family_member_button',
          'service_fu_save_updated_family_member_button',
        ],
      },
      {
        id: 'service_duplicate',
        label: 'Duplicate Data',
        permissions: [
          'view_service_duplicate_data',
          'service_duplicate_data_assign_to_cro',
          'service_duplicate_data_delete_button',
        ],
      },
      {
        id: 'service_customers',
        label: 'Customers',
        permissions: [
          'view_service_customer',
          'service_customer_view_detail_customer_data',
        ],
      },
    ],
  },
  {
    id: 'prospek',
    label: 'Prospek',
    permissions: ['view_prospek'],
    children: [
      {
        id: 'prospek_follow_up',
        label: 'Follow Up',
        permissions: [
          'view_prospek_follow_up',
          'prospek_fu_import_data',
          'prospek_fu_assign_to_cro',
          'prospek_fu_view_detail_customer_data',
          'prospek_fu_update_customer_data',
          'prospek_fu_add_follow_up',
          'prospek_fu_view_detail_history_follow_up',
          'prospek_fu_add_deal_from_follow_up',
          'prospek_fu_edit_recipient_data',
          'prospek_fu_save_family_card_number',
          'prospek_fu_update_family_member_button',
          'prospek_fu_save_updated_family_member_button',
        ],
      },
      {
        id: 'prospek_duplicate',
        label: 'Duplicate Data',
        permissions: [
          'view_prospek_duplicate_data',
          'prospek_duplicate_data_assign_to_cro',
          'prospek_duplicate_data_delete_button',
        ],
      },
      {
        id: 'prospek_customers',
        label: 'Customers',
        permissions: [
          'view_prospek_customer',
          'prospek_customer_view_detail_customer_data',
        ],
      },
    ],
  },
  {
    id: 'report',
    label: 'Report',
    permissions: [
      'view_report',
      'view_report_deal',
      'view_detail_deal',
      'add_deal',
      'save_imported_deal_photo',
      'update_deal_status',
    ],
  },
  {
    id: 'master_data',
    label: 'Master Data',
    permissions: ['view_master_data'],
    children: [
      {
        id: 'dealers',
        label: 'Dealers',
        permissions: [
          'view_dealers',
          'add_dealers',
          'edit_dealers',
          'delete_dealers',
        ],
      },
      {
        id: 'leasing',
        label: 'Leasing',
        permissions: [
          'view_leasings',
          'add_leasing',
          'edit_leasing',
          'delete_leasing',
        ],
      },
      {
        id: 'jobs',
        label: 'Jobs',
        permissions: ['view_jobs', 'add_jobs', 'edit_jobs', 'delete_jobs'],
      },
      {
        id: 'holidays',
        label: 'Holidays',
        permissions: [
          'view_holidays',
          'add_holidays',
          'edit_holidays',
          'delete_holidays',
        ],
      },
      {
        id: 'relations',
        label: 'Relations',
        permissions: [
          'view_relations',
          'add_relations',
          'edit_relations',
          'delete_relations',
        ],
      },
      {
        id: 'education_degrees',
        label: 'Education Degrees',
        permissions: [
          'view_education_degrees',
          'add_education_degrees',
          'edit_education_degrees',
          'delete_education_degrees',
        ],
      },
      {
        id: 'expenses',
        label: 'Expenses',
        permissions: [
          'view_expenses',
          'add_expenses',
          'edit_expenses',
          'delete_expenses',
        ],
      },
      {
        id: 'incomes',
        label: 'Incomes',
        permissions: [
          'view_incomes',
          'add_incomes',
          'edit_incomes',
          'delete_incomes',
        ],
      },
      {
        id: 'hobbies',
        label: 'Hobbies',
        permissions: [
          'view_hobbies',
          'add_hobbies',
          'edit_hobbies',
          'delete_hobbies',
        ],
      },
      {
        id: 'house_ownerships',
        label: 'House Ownerships',
        permissions: [
          'view_house_ownerships',
          'add_house_ownerships',
          'edit_house_ownerships',
          'delete_house_ownerships',
        ],
      },
      {
        id: 'motorcycles',
        label: 'Motorcycles',
        permissions: [
          'view_motorcycles',
          'add_motorcycle',
          'edit_motorcycle',
          'delete_motorcycle',
        ],
      },
      {
        id: 'colors',
        label: 'Colors',
        permissions: [
          'view_colors',
          'add_colors',
          'edit_colors',
          'delete_colors',
        ],
      },
      {
        id: 'follow_up_methods',
        label: 'Follow Up Methods',
        permissions: [
          'view_follow_up_methods',
          'add_follow_up_methods',
          'edit_follow_up_methods',
          'delete_follow_up_methods',
        ],
      },
      {
        id: 'follow_up_results',
        label: 'Follow Up Results',
        permissions: [
          'view_follow_up_results',
          'add_follow_up_results',
          'edit_follow_up_results',
          'delete_follow_up_results',
        ],
      },
      {
        id: 'follow_up_details',
        label: 'Follow Up Details',
        permissions: [
          'view_follow_up_details',
          'add_follow_up_details',
          'edit_follow_up_details',
          'delete_follow_up_details',
        ],
      },
      {
        id: 'status_follow_up',
        label: 'Status Follow Up',
        permissions: [
          'view_status_follow_up',
          'add_status_follow_up',
          'edit_status_follow_up',
          'delete_status_follow_up',
        ],
      },
      {
        id: 'service_types',
        label: 'Service Types',
        permissions: [
          'view_service_types',
          'add_service_types',
          'edit_service_types',
          'delete_service_types',
        ],
      },
    ],
  },
  {
    id: 'ad_user',
    label: 'User Management',
    permissions: [
      'view_user_list',
      'edit_user',
      'reset_password',
      'deactivate_user',
      'activate_user',
      'update_permission',
    ],
  },
];
