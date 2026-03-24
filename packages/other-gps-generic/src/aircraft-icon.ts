/** Registers `L.aircraft` on the given Leaflet namespace (same behavior as legacy fgpanel `aircraft-icon.js`). */
export function installAircraftLayer(L: any) {
  L.AircraftIcon = L.DivIcon.extend({
    options: {
      className: 'aircraft-marker',
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    },

    initialize: function (options: { heading?: number }) {
      L.DivIcon.prototype.initialize.call(this, options);
      L.Util.setOptions(this, {
        html: L.Util.template(
          '<div class="acicon other-gps-generic-acicon" style="transform: rotate({heading}deg);"></div>',
          {
            heading: (options?.heading ?? 0).toFixed(0),
          },
        ),
      });
    },
  });

  L.aircraftIcon = function (options: { heading?: number }) {
    return new L.AircraftIcon(options);
  };

  L.Aircraft = L.Marker.extend({
    options: {
      historyLength: 100,
    },

    initialize: function (latlng: unknown, options: { heading?: number }) {
      L.Marker.prototype.initialize.call(this, latlng, options);
      this.setIcon(L.aircraftIcon(options ?? {}));
    },

    onAdd: function (layer: unknown) {
      L.Marker.prototype.onAdd.call(this, layer);
    },

    onRemove: function (layer: unknown) {
      L.Marker.prototype.onRemove.call(this, layer);
    },

    setLatLng: function (latLng: { lat: number; lng: number; heading?: number }) {
      this.setIcon(L.aircraftIcon({ heading: latLng.heading }));
      L.Marker.prototype.setLatLng.call(this, latLng);
    },
  });

  L.aircraft = function (latlng: unknown, options: { heading?: number }) {
    return new L.Aircraft(latlng, options);
  };
}
