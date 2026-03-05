export const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    password: 'securepassword123',
  },
];

export const customers = [
  { id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa', name: 'Sarah Mitchell', email: 'sarah@mitchellco.com', imageUrl: '/customers/sarah.png' },
  { id: '3958dc9e-712f-4377-85e9-fec4b6a6442a', name: 'James Carter', email: 'james@carterltd.com', imageUrl: '/customers/james.png' },
  { id: '3958dc9e-742f-4377-85e9-fec4b6a6442a', name: 'Emily Roberts', email: 'emily@robertsinc.com', imageUrl: '/customers/emily.png' },
  { id: '76d65c26-f784-44a2-ac19-586678f7c2f2', name: 'Daniel Kim', email: 'daniel@kimventures.com', imageUrl: '/customers/daniel.png' },
  { id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9', name: 'Laura Chen', email: 'laura@chencorp.com', imageUrl: '/customers/laura.png' },
  { id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB', name: 'Marcus Thompson', email: 'marcus@thompsongroup.com', imageUrl: '/customers/marcus.png' },
];

export const invoices = [
  { customerId: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa', amount: 15500, status: 'paid', date: '2024-01-15' },
  { customerId: '3958dc9e-712f-4377-85e9-fec4b6a6442a', amount: 32000, status: 'pending', date: '2024-02-03' },
  { customerId: '3958dc9e-742f-4377-85e9-fec4b6a6442a', amount: 8900, status: 'paid', date: '2024-02-18' },
  { customerId: '76d65c26-f784-44a2-ac19-586678f7c2f2', amount: 47200, status: 'pending', date: '2024-03-05' },
  { customerId: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9', amount: 12300, status: 'paid', date: '2024-03-22' },
  { customerId: '13D07535-C59E-4157-A011-F8D2EF4E0CBB', amount: 56000, status: 'paid', date: '2024-04-10' },
  { customerId: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa', amount: 21000, status: 'pending', date: '2024-04-28' },
  { customerId: '3958dc9e-712f-4377-85e9-fec4b6a6442a', amount: 9800, status: 'paid', date: '2024-05-14' },
  { customerId: '76d65c26-f784-44a2-ac19-586678f7c2f2', amount: 34500, status: 'paid', date: '2024-06-01' },
  { customerId: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9', amount: 18700, status: 'pending', date: '2024-06-19' },
] as const;

export const revenue = [
  { month: 'Jan', revenue: 12000 },
  { month: 'Feb', revenue: 18500 },
  { month: 'Mar', revenue: 15200 },
  { month: 'Apr', revenue: 22000 },
  { month: 'May', revenue: 19800 },
  { month: 'Jun', revenue: 27500 },
  { month: 'Jul', revenue: 31000 },
  { month: 'Aug', revenue: 28400 },
  { month: 'Sep', revenue: 24600 },
  { month: 'Oct', revenue: 33200 },
  { month: 'Nov', revenue: 29800 },
  { month: 'Dec', revenue: 38000 },
];