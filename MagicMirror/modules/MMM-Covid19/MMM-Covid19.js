/* Magic Mirror
 * Module: covid19
 * By SimHub
 * MIT Licensed.
 */
Module.register("MMM-Covid19", {
  // Default module config.
  defaults: {
    url:
      "https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/query?where=1%3D1&outFields=GEN,last_update,OBJECTID,BL_ID,BL,cases7_per_100k&returnGeometry=false&outSR=4326&f=json",
    bl: "Nordrhein-Westfalen"
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
    this.blHsh = {
      "Schleswig-Holstein": 1,
      Hamburg: 2,
      Niedersachsen: 3,
      Bremen: 4,
      "Nordrhein-Westfalen": 5,
      Hessen: 6,
      "Rheinland-Pfalz": 7,
      "Baden-Württemberg": 8,
      Bayern: 9,
      Saarland: 10,
      Brandenburg: 12,
      "Mecklenburg-Vorpommern": 13,
      Sachsen: 14,
      "Sachsen-Anhalt": 15,
      Thüringen: 16,
      Berlin: 11
    };

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
    // Set locale.
    this.loaded = false;
    this.getData();
  },

  async getData() {
    let _bl = this.blHsh[this.config.bl].toString();
    const res = await fetch(this.config.url);
    const out = await res.json();
    out.features.forEach((item) => {
      if (item.attributes.BL_ID !== _bl) return; // filter against default option _bl
      if (item.attributes.cases7_per_100k > 400) {
        this.color.push("rgb(255,3, 3)");
      } else {
        this.color.push("rgb(60, 179, 113)");
      }
      this.covid.push(item.attributes.cases7_per_100k.toFixed(1));
      this.labels.push(item.attributes.GEN);
    });
    // Log.info(this.covid);
    var ctx = document.getElementById("myChart").getContext("2d");
    var chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: this.labels,
        datasets: [
          {
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
