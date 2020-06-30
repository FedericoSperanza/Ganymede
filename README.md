# Ganymede
Ganymede App, that is connected with Themisto

Run this command shell/bash:
<br/>
npm run start:dev
<br/>

Default port 3000 on LocalHost <br/>
EndPoints <br/>
https://ganymede-api-fsperanza.herokuapp.com/
# EndPoints <br/>
 <b> / </b>   (returns hello)
	<br/>
 <b>/newOrder </b>  Type:    POST
 <br/>
 requires this json:
 <br/>
 {
    "searchString": "CellPhone"

}
	<br/>
	<br/>
 <b>/getOrders </b>  Type: GET
 <br/>
	<br/>
 <b> /getProductsByCategory </b> Type: GET
 <br/>
 Requires this json:
 <br/>
 example
 {
   "category":"Productos de Oficina"

}
<br/>




