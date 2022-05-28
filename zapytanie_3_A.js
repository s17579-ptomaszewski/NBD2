db.people.aggregate([
{ $group: { _id: "$job" } }
]).forEach(e => printjsononeline(e))