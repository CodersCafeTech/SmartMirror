/* Magic Mirror
 * Module: covid19
 * By SimHub
 * MIT Licensed.
 */
Module.register("MMM-Covid19", {
	// Default module config.
	defaults: {
		url: "https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/query?where=1%3D1&outFields=GEN,last_update,OBJECTID,BL_ID,BL,cases7_per_100k&returnGeometry=false&outSR=4326&f=json",
		text: ""
	},

	// Define required scripts.
	getScripts: function () {
		return ["https://cdn.jsdelivr.net/npm/chart.js"];
	},

	// Define required scripts.
	getStyles: function () {
		return [this.file("MMM-Covid19.css")];
	},
	init() {
		this.labels = [];
		this.covid = [];
		this.color = [];
		this.decimation = {
			enabled: false,
			algorithm: "min-max"
		};
	},
	// Define start sequence.
	start: function () {
		// Log.info("Starting module: " + this.name);

		// Set locale.
		this.loaded = false;

		this.getData();
	},

	async getData() {
		// Log.info(this);
		const res = await fetch(this.config.url);
		const out = await res.json();
		// Log.info(out);
		out.features.forEach((item) => {
			if (item.attributes.BL_ID !== "5") return;
			if (item.attributes.cases7_per_100k > 100) {
				this.color.push("rgb(255, 99, 132)");
			} else {
				this.color.push("rgb(255, 99, 132)");
			}
			this.covid.push(item.attributes.cases7_per_100k.toFixed(1));
			this.labels.push(item.attributes.GEN);

			// return out;
		});
		// Log.info(this.covid);
		var ctx = document.getElementById("myChart").getContext("2d");
		// ctx.font = "0.3rem";
		var chart = new Chart(ctx, {
			type: "bar",
			data: {
				labels: this.labels,
				datasets: [
					{
						// label: ["Fälle letzte 7 Tage/100.000 EW - NRW ", _last_update],
						label: "",
						fontColor: "#ffffff",
						backgroundColor: this.color,
						borderColor: "rgb(255, 99, 132)",
						data: this.covid
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					y: {
						ticks: {
							color: "white"
						}
					},
					x: {
						ticks: {
							color: "white",
							source: "auto",
							// Disabled rotation for performance
							maxRotation: 0,
							autoSkip: true
						}
					}
				},

				plugins: {
					decimation: this.decimation,
					title: {
						display: true,
						text: "Covid19 Fälle letzte 7 Tage/100.000 ",
						color: "white",
						fontSize: "38px"
					},

					tooltip: {
						enabled: true,
						usePointStyle: true,
						callbacks: {
							label: function (context) {
								let id = context.dataIndex;
								let inzidenz = context.dataset.data[id];
								// var label = context.dataset.label || "";
								// Log.info(context.dataset.data[id]);
								var label = inzidenz;
								return label;
							}
						}
					}
				}
			}
		});
	},
	// Override dom generator.
	getDom: function () {
		var wrapper = document.createElement("div");
		wrapper.classList.add("HERE");
		var canvas = document.createElement("canvas");
		canvas.id = "myChart";
		wrapper.appendChild(canvas);
		// wrapper.innerHTML = this.covid;
		return wrapper;
	}
});
