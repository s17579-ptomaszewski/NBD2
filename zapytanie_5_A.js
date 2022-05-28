db.people.aggregate([
    {$match: { nationality: "Poland", sex: "Female"}},
    {$unwind : "$credit" },
    {$addFields: {balance_decimal: {$convert: { input: "$credit.balance", to: "decimal", onError: Error }}}},
    {$group: { _id: "$credit.currency" , sumBalanceByrCurrency: {$sum: "$balance_decimal"}, avgBalance: {$avg: "$balance_decimal"}}}
]).forEach(e => printjsononeline(e))