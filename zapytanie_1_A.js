db.people.aggregate([
{ $addFields: {
height_decimal: {$convert: { input: "$height", to: "decimal", onError: Error }},
weight_decimal: {$convert: { input: "$weight", to: "decimal", onError: Error }}}},
{ $group: { _id: "$sex", avgHeight: {$avg: "$height_decimal"}, avgWeight: {$avg: "$weight_decimal"}} }]).forEach(e => printjsononeline(e))