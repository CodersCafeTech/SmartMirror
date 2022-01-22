/* Magic Mirror Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/getting-started/configuration.html#general
 * and https://docs.magicmirror.builders/modules/configuration.html
 */
let config = {
	address: "localhost", 	// Address to listen on, can be:
							// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
							// - another specific IPv4/6 to listen on a specific interface
							// - "0.0.0.0", "::" to listen on any interface
							// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/", 	// The URL path where MagicMirror is hosted. If you are using a Reverse proxy
					// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], 	// Set [] to allow all IP addresses
															// or add a specific IPv4 of 192.168.1.5 :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
															// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, 		// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", 	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", 	// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	locale: "en-US",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 24,
	units: "metric",
	// serverOnly:  true/false/"local" ,
	// local for armv6l processors, default
	//   starts serveronly and then starts chrome browser
	// false, default for all NON-armv6l devices
	// true, force serveronly mode, because you want to.. no UI on this device

	modules: [
		{
			module: "alert",
		},
		{
			module: "updatenotification",
			position: "top_bar",
		},
		{
			module: "clock",
			position: "top_center",
		},
		{
			module: "compliments",
			position: "middle_center",
		},
		{
			module: "weather",
			position: "top_left",
			config: {
				weatherProvider: "openweathermap",
				type: "current",
				location: "New York",
				locationID: "5128581", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				apiKey: "120d62af1b93a10671b70302e478e83d"
			}
		},
		{
			module: "weather",
			position:"top_right",
			header: "Weather Forecast",
			config: {
				weatherProvider: "openweathermap",
				type: "forecast",
				location: "New York",
				locationID: "5128581", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				apiKey: "120d62af1b93a10671b70302e478e83d"
			}
		},
		{
			module: "newsfeed",
			position: "top_bar",
			config: {
				feeds: [
					{
						//title: "New York Times - US",
						url: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml"
					},
					{
						//title: "Business",
						url: "https://rss.nytimes.com/services/xml/rss/nyt/Business.xml"
					},
					{
						//title: "Technology",
						url: "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml"
					},
					{
						//title: "Sports",
						url: "https://rss.nytimes.com/services/xml/rss/nyt/Sports.xml"
					},
					{
						//title: "Science",
						url: "https://rss.nytimes.com/services/xml/rss/nyt/Science.xml"
					},
					{
						//title: "Health",
						url: "https://rss.nytimes.com/services/xml/rss/nyt/Health.xml"
					},

				],
				showAsList: true,
				/*showSourceTitle: true,
				showPublishDate: true,
				broadcastNewsFeeds: true,
				broadcastNewsUpdates: true*/
			},
		},
		
		{
			module: 'MMM-KeyBindings',
    		config: {
				evdev: { enabled: false },
        		enableKeyboard: true
			},
		},
		{
			module:"MyCovid19",
			position:"center",
			config:{
				countries:["Italy","USA","China","Spain","France"],
				// line colors can be any definition of color either a name ,or a hex string
				// one per country above, used in order,
				line_colors:['red','white','green','yellow','blue'],
				//				
				chart_type:"cumulative_cases",  // or "cumulative deaths"
				chart_title:"Cumulative Cases", // however u want to label
				// the vertical steps on the chart.. how tall u want it to be and how mant increments
				ranges:{min:0,max:8000,stepSize:1000000},
				// size of the chart in pixels
				width: 1920,
				height: 1080,
				// only used if we need to debug something
				debug:true,
			}
		},
		{
		module: "MMM-Covid19",
		position: "bottom_bar",
		config: {
			bl: "Nordrhein-Westfalen"
		  }
		},
		{
		module: 'MMM-Carousel',
		position: 'bottom_bar', // Required only for navigation controls
		config: {
			transitionInterval: 100000,
			//ignoreModules: ['compliments'],
			mode: 'slides',
			showPageIndicators: true,
			showPageControls: true,
			slides: {
				main: ['clock', 'weather','compliments','MMM-Covid19'],
				"Slide 2": ['newsfeed'],

			},
			keyBindings: { 
				enabled: true,
				enableKeyboard: true,
				mode: "DEFAULT",
				map: {
					NextSlide: "ArrowRight", 
					PrevSlide: "ArrowLeft", 
					Slide0:    "Home"
				},
				
			}},
		},
		
	]


};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
