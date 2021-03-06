#pragma strict


var WAITDELAY : float = 0.5;

/**
 * Hilfsfunction
 */
function _GetComp (name	:	String) : Renderer {
	return gameObject.Find(name).GetComponent.<Renderer>();
}


/**
 * Toggle Control Lights and Messages
 */
function toggle (isEngineStarted) {
	if (isEngineStarted) {
		// Messages
		_GetComp("ControlPanelDisplayRightTextStart").enabled	= false;
		_GetComp("ControlPanelDisplayRightTextStop").enabled	=	true;
		yield WaitForSeconds(WAITDELAY);
		// Lights
		_GetComp("ControlPanelTogglePanel1Green").enabled 	= true;
		_GetComp("ControlPanelTogglePanel1Red").enabled 		= false;
		yield WaitForSeconds(WAITDELAY);
		_GetComp("ControlPanelTogglePanel2Green").enabled 	= true;
		_GetComp("ControlPanelTogglePanel2Red").enabled 		= false;
		yield WaitForSeconds(WAITDELAY);
		_GetComp("ControlPanelTogglePanel3Green").enabled 	= true;
		_GetComp("ControlPanelTogglePanel3Red").enabled 		= false;
		yield WaitForSeconds(WAITDELAY);
		_GetComp("ControlPanelTogglePanel4Green").enabled 	= true;
		_GetComp("ControlPanelTogglePanel4Red").enabled 		= false;
		yield WaitForSeconds(WAITDELAY);
		_GetComp("ControlPanelTogglePanel5Green").enabled 	= true;
		_GetComp("ControlPanelTogglePanel5Red").enabled 		= false;
		yield WaitForSeconds(WAITDELAY);
		// Messages
		_GetComp("ControlPanelDisplayLeftText").enabled			= true;
	} else {
		// Messages
		_GetComp("ControlPanelDisplayLeftText").enabled			= false;
		yield WaitForSeconds(WAITDELAY);
		// Lights
		_GetComp("ControlPanelTogglePanel1Green").enabled 	= false;
		_GetComp("ControlPanelTogglePanel1Red").enabled 		= true;
		yield WaitForSeconds(WAITDELAY);
		_GetComp("ControlPanelTogglePanel2Green").enabled 	= false;
		_GetComp("ControlPanelTogglePanel2Red").enabled 		= true;
		yield WaitForSeconds(WAITDELAY);
		_GetComp("ControlPanelTogglePanel3Green").enabled 	= false;
		_GetComp("ControlPanelTogglePanel3Red").enabled 		= true;
		yield WaitForSeconds(WAITDELAY);
		_GetComp("ControlPanelTogglePanel4Green").enabled 	= false;
		_GetComp("ControlPanelTogglePanel4Red").enabled 		= true;
		yield WaitForSeconds(WAITDELAY);
		_GetComp("ControlPanelTogglePanel5Green").enabled 	= false;
		_GetComp("ControlPanelTogglePanel5Red").enabled 		= true;
		yield WaitForSeconds(WAITDELAY);
		// Messages
		_GetComp("ControlPanelDisplayRightTextStart").enabled	= true;
		_GetComp("ControlPanelDisplayRightTextStop").enabled	=	false;
	}
}
