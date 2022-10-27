#!/usr/bin/env node


import minimist from "minimist";
import fetch from "node-fetch";
import moment from "moment-timezone";

const args = minimist(process.argv.slice(2))

//help message
if(args.h){
	("Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE\n");
	console.log("	-h            Show this help message and exit.\n");
	console.log("	-n, -s        Latitude: N positive; S negative.\n");
	console.log("	-e, -w        Longitude: E positive; W negative.\n");
	console.log("	 -z            Time zone: uses tz.guess() from moment-timezone by default.\n");
	console.log("	 -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.\n");
	console.log("	-j            Echo pretty JSON from open-meteo API and exit.\n");
	exit(0);
}

//varables
const latitude = args.n || -args.s
const longitude = args.e || -args.w
const timezone = args.z || moment.tz.guess() ||  'America/New_York'
const day = args.d || 1

//make response
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&daily=weathercode,temperature_2m_max,precipitation_hours&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=' + timezone);

// Get the data from the request
const data = await response.json()

//conditional stuff

if(data.daily.precipitation_hours[day] == 0){
	console.log("You will not need your galsohes ");
}
else{
	console.log("You might need your galoshes ");
}

if (day == 0) {
  console.log("today.");
} 
else if (day > 1) {
  console.log("in " + days + " days.");
}
else {
  console.log("tomorrow.");
}

