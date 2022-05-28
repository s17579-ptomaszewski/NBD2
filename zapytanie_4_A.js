db.people.aggregate([
{ $addFields: {
weightDecimal: {$convert: {input: "$weight", to: "decimal", onError: Error}},
heightDecimal: {$convert: {input: "$height", to: "decimal", onError: Error}}
}},
{
	$addFields: {
		BMI: {$divide: ["$weightDecimal", {$pow: [{$divide: ["$heightDecimal", 100]}, 2]}]},
	}
}, 
{$group: {_id: "$nationality", avgBMI:{$avg: "$BMI"}, minBMI:{$min: "$BMI"}, maxBMI:{$max: "$BMI"}}}]).forEach(e=> printjsononeline(e))