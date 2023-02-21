async function transfer(client, accountsCollection, accountA, accountB, amount, remark) {

  try {
    await client.connect();

    const session = client.startSession();

    await session.withTransaction(async () => {
      const fromAccount = await accountsCollection.findOne({ account_number: accountA }, { session });
      const toAccount = await accountsCollection.findOne({ account_number: accountB }, { session });
      if (!fromAccount || !toAccount) {
        throw new Error('Account number not found');
      }

      if (fromAccount.balance < amount) {
        throw new Error('Insufficient balance');
      }

      const timestamp = new Date().toISOString();

      const fromAccountChanges = fromAccount.account_changes;
      const fromAccountChangeNumber = fromAccountChanges.length + 1;
      fromAccountChanges.push({ change_number: fromAccountChangeNumber, amount: -amount, changed_date: timestamp, remark: remark });

      const toAccountChanges = toAccount.account_changes;
      const toAccountChangeNumber = toAccountChanges.length + 1;
      toAccountChanges.push({ change_number: toAccountChangeNumber, amount: amount, changed_date: timestamp, remark: remark });

      await accountsCollection.updateOne({ account_number: accountA }, { $set: { balance: fromAccount.balance - amount, account_changes: fromAccountChanges } }, { session });
      await accountsCollection.updateOne({ account_number: accountB }, { $set: { balance: toAccount.balance + amount, account_changes: toAccountChanges } }, { session });
    });
    session.endSession();
    console.log(`Successfully transferred ${amount} from ${accountA} to ${accountB}`);      
  } catch (error) {
    console.error(error);
    session.endSession();
    console.log('Transaction aborted');
  }
}

module.exports = transfer;
