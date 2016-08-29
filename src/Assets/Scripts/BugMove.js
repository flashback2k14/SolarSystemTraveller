#pragma strict

private var MERCURY = "MERCURY";
private var VENUS = "VENUS";
private var EARTH = "EARTH";
private var MOON = "MOON";
private var MARS = "MARS";
private var JUPITER = "JUPITER";
private var BELT = "BELT";

private var targets = [MERCURY, VENUS, MOON, MARS, JUPITER, BELT];

function Start () {
	var planet = Random.Range(0, targets.length);
	print(targets[planet]);
	GetComponent.<EarthRotateAroundSun>().target = GameObject.FindGameObjectWithTag(targets[planet]).transform;
}

function Update () {
	GetComponent.<Animation>().Play('laufen');
}
