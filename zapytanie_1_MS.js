printjson(db.people.mapReduce(
function() { emit(this.sex, { "height": parseFloat(this.height), "weight": parseFloat(this.weight), "count": 1} ) },
function(key, values) { 
return { 
 "height": Array.sum(values.map(e => e["height"])), 
 "weight": Array.sum(values.map(e => e["weight"])), 
 "count": Array.sum(values.map(e => e["count"])) } },
    {
finalize: function(key, value) {
 return { "avgHeight": (value.height / value.count), "avgWeight": (value.weight / value.count) }},
        out: { inline: 1 }
    }
))