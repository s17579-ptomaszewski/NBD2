printjson(db.people.mapReduce(
function() {emit(this.job, "job")},
function(key, values) { return "job" },
{ out: { inline: 1 } }))