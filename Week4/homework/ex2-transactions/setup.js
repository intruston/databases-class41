async function deleteAndFillAccounts(collection) {
  try {
    await collection.deleteMany({});

    const accountData = [
      {
        account_number: 'NL101',
        balance: 1050,
        account_changes: [
          {
            change_number: 1,
            amount: 300,
            changed_date: new Date('2022-02-01T10:00:00.000Z'),
            remark: 'Deposit'
          }
        ]
      },
      {
        account_number: 'NL102',
        balance: 600,
        account_changes: [
          {
            change_number: 1,
            amount: -222,
            changed_date: new Date('2022-02-03T12:00:00.000Z'),
            remark: 'Withdrawal'
          }
        ]
      },
      {
        account_number: 'NL103',
        balance: 7000,
        account_changes: [
          {
            change_number: 1,
            amount: 300,
            changed_date: new Date('2022-02-13T14:00:00.000Z'),
            remark: 'Deposit'
          }
        ]
      },
      {
        account_number: 'NL104',
        balance: 888,
        account_changes: [
          {
            change_number: 1,
            amount: 800,
            changed_date: new Date('2022-02-13T16:00:00.000Z'),
            remark: 'Deposit'
          }
        ]
      },
      {
        account_number: 'NL105',
        balance: 90000,
        account_changes: [
          {
            change_number: 1,
            amount: -10000,
            changed_date: new Date('2022-02-13T18:00:00.000Z'),
            remark: 'Withdrawal'
          }
        ]
      }
    ];

    await collection.insertMany(accountData);

    console.log('Collection accounts filled');
  } catch (err) {
    console.error(err);
  }
}

module.exports = deleteAndFillAccounts;
