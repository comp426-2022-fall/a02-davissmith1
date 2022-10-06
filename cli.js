#!/usr/bin/env node

import pkg1 from 'minimist';
const { minimist } = pkg1;

import pkg2 from 'moment';
const { moment } = pkg2;

const args = minmist(process.argv.slice(2))

//help message
if(args.h){
	printf("Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE\n");
	printf("	-h            Show this help message and exit.\n");
	printf("	-n, -s        Latitude: N positive; S negative.\n");
	printf("	-e, -w        Longitude: E positive; W negative.\n");
	pinrtf("	 -z            Time zone: uses tz.guess() from moment-timezone by default.\n");
	printf("	 -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.\n");
	printf("	-j            Echo pretty JSON from open-meteo API and exit.\n");
	exist(0);

}

//varables
const latitude = args.n || -args.s
const longitude = args.e || -args.w
const timezone = args.z || moment.tz.guest() || 'America/New_York'
const day = args.d

//make response
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&daily=weathercode,temperature_2m_max,precipitation_hours&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=' + timezone);

// Get the data from the request
const data = await response.json()

//conditional stuff

if(day == null){
	day = 1;
}

if(data.daily.pricipitation_hours[day] == 0){
	console.log("You will not need your galsohes ");
}
else{
	console.log("You might need your galoshes ");
}

if (days == 0) {
  console.log("today.");
} 
else if (days > 1) {
  console.log("in " + days + " days.");
}
else {
  console.log("tomorrow.");
}

