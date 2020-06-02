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
            {
              id: 'table00111',
              name: '现金',
              value: 800.0,
              children: []
            },
            {
              id: 'table00112',
              name: '活期存款',
              value: 200.0,
              children: []
            },
          ]
        },
        {
          id: 'table0012',
          name: '非流动资产',
          value: null,
          children: [
            {
              id: 'table00121',
              name: '股票',
              value: 800.0,
              children: []
            },
            {
              id: 'table00132',
              name: '基金',
              value: 200.0,
              children: []
            },
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
            {
              id: 'table00211',
              name: '信用卡账单',
              value: 800.0,
              children: []
            },
            {
              id: 'table00212',
              name: '银行消费贷',
              value: 200.0,
              children: []
            },
          ]
        },
        {
          id: 'table0022',
          name: '非流动负债',
          value: null,
          children: [
            {
              id: 'table00221',
              name: '公积金房贷',
              value: 800.0,
              children: []
            },
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