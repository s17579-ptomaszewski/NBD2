printjson(db.people.mapReduce(
function(){
var weightFloat = parseFloat(this.weight)
var heightFloatM = parseFloat(this.height)*0.01
var BMI = (weightFloat / (heightFloatM * heightFloatM))
emit(this.nationality, {"BMI": BMI, "count": 1}) 
},
function(key, values){
        return { "BMI": Array.sum(values.map(k => k["BMI"])), "count": values.length }},
		
{ out: {inline: 1},
        finalize: function(key, value){
            return {"BMIavg": (value.BMI / value.count)}},
    }
))
