import { readFileSync } from 'fs'
import cors from 'cors'
import Express from 'express'

const app = Express()
const PORT = 8080

app.use( Express.json() )
app.use( "/", Express.static("./static") )
app.use( cors() )

app.get("/find/:country", (req, res) => {

	const crudeData = readFileSync( "./geo.json", {
		encoding: "utf-8",
		flag: "r"
	} )

	const name = req.params.country

	const cookedData = JSON.parse( crudeData )
	const data = cookedData.features.find( d => d.properties.name == name )

	if (data == undefined) {
		res.status(404)
		res.json( { message: "data not found !!" } )
	} else {
		res.json( data )
	}
})

app.listen( PORT, () =>
	console.log(`Listening on :${PORT}`) )