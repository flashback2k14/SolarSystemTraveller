#pragma strict

// Variablen
var timer			: float = 0.0;
var MAX_TIME 		: float = 5.0;
var blinkLight 		: Light;
var blinkLightColor : Color;

/**
 * Setup Blink Light Color
 */
function Start () {
	if (blinkLightColor != null) {
		blinkLight.color = blinkLightColor;
	}
}

/**
 * Blink the Light
 */
function Update () {
	if (timer > MAX_TIME) {
        blinkLight.enabled = !blinkLight.enabled;
        timer = 0.0;
    } else {
    	timer++;
    }
}