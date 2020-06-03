// 模拟的数据
export default {
  status: 200,
  code: "ok",
  data: [{
      id: 'table001',
      name: '资产',
      value: null,
      children: [{
          id: 'table0011',
          name: '流动资产',
          value: null,
          children: [
          ]
        },
        {
          id: 'table0012',
          name: '非流动资产',
          value: null,
          children: [
          ]
        },
      ]
    },
    {
      id: 'table002',
      name: '负债',
      value: null,
      children: [{
          id: 'table0021',
          name: '流动负债',
          value: null,
          children: [
          ]
        },
        {
          id: 'table0022',
          name: '非流动负债',
          value: null,
          children: [
          ]
        },
      ]
    },
    {
      id: 'table004',
      name: '合计',
      value: null,
      children: []
    },
  ]
}