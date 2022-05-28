db.people.aggregate([
    {$unwind : "$credit"},
    {$addFields: {balance_decimal: {$convert: { input: "$credit.balance", to: "decimal", onError: Error }}}},
    {$group: { _id: "$credit.currency" , sumBalanceByCurrency: {$sum: "$balance_decimal"}}}
]).forEach(e => printjsononeline(e))