printjson(db.people.mapReduce(
function(){
var weightFloat = parseFloat(this.weight)
var heightFloatM = parseFloat(this.height)*0.01
var BMI = (weightFloat / (heightFloatM * heightFloatM))
emit(this.nationality, {"BMI_Min": BMI, "BMI_Max": BMI}) 
},
function(key, values) {return values.reduce((a, b) => {
return {
	"BMI_Min": Math.min(a["BMI_Min"], b["BMI_Max"]),
	"BMI_Max": Math.max(a["BMI_Min"], b["BMI_Max"]),
		}	
	})
}, 
{out: {inline: 1}}
))
