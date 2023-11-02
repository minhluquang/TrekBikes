const DUMMY_DATA = [
  {
    id: 1,
    email: 'test@test.com',
    name: 'Lữ Quang Minh',
    username: 'luquangminh',
    password: 'daylamatkhau',
    like: [],
    cart: [
      { id: 'a07c4d6ca1', qnt: 4 },
      { id: '36b9b496cb', qnt: 1 }
    ],
    bought: [
      {
        id: 'e9e7f2281e',
        qnt: 2
      },
      { id: '36b9b496cb', qnt: 2 },
      { id: '36b9b496cb', qnt: 2 }
    ],
    isProcessing: [
      { id: '36b9b496cb', qnt: 2 },
      { id: '36b9b496cb', qnt: 2 },
      {
        id: 'e9e7f2281e',
        qnt: 1
      }
    ]
  },
  {
    id: 9999999999,
    email: 'test@test.com',
    name: 'khong',
    username: 'luquangminh',
    password: 'daylamatkhau',
    like: [],
    cart: [{ id: '36b9b496cb', qnt: 1 }],
    bought: [
      {
        id: 'e9e7f2281e',
        qnt: 1
      }
    ],
    isProcessing: [{ id: '36b9b496cb', qnt: 1 }]
  },
  {
    id: 77777,
    email: 'test@test.com',
    name: 'javascript',
    username: 'luquangminh',
    password: 'khongphaimatkhau',
    like: [],
    cart: [{ id: '36b9b496cb', qnt: 1 }],
    bought: [
      {
        id: 'e9e7f2281e',
        qnt: 1
      },
      {
        id: 'e9e7f2281e',
        qnt: 1
      }
    ],
    isProcessing: [{ id: '36b9b496cb', qnt: 1 }]
  }
];

export default DUMMY_DATA;
