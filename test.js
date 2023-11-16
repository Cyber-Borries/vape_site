//<![CDATA[

// layers to toggle
var layers = [];
layers[0] = new google.maps.KmlLayer(
  "https://www.atomicaccess.co.za/wp-content/uploads/2022/07/octotel-fibre-coverage-2022-07.kmz",
  {
    preserveViewport: true,
    map: map,
  }
);

layers[1] = new google.maps.KmlLayer(
  "https://www.atomicaccess.co.za/wp-content/uploads/2022/07/frogfoot-fibre-coverage-2022-07.kmz",
  {
    preserveViewport: true,
    map: map,
  }
);

layers[2] = new google.maps.KmlLayer(
  "https://www.atomicaccess.co.za/wp-content/uploads/2022/07/vuma-fibre-coverage-2022-07.kmz",
  {
    preserveViewport: true,
    map: map,
  }
);

// end layers to toggle
// intialize

function coveragemap() {
  const capetown = { lat: -33.9277194, lng: 18.4579393 };
  var mapOptions = {
    zoom: 12,
    center: capetown,
    zoomControl: true,
    scaleControl: true,
    streetViewControl: false,
    mapTypeControl: false,
    mapTypeId: "roadmap",
    styles: [
      {
        featureType: "administrative",
        elementType: "labels.text.fill",
        stylers: [{ color: "#444444" }],
      },
      {
        featureType: "landscape",
        elementType: "all",
        stylers: [{ color: "#f2f2f2" }],
      },
      {
        featureType: "poi",
        elementType: "all",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "road",
        elementType: "all",
        stylers: [{ saturation: -100 }, { lightness: 45 }],
      },
      {
        featureType: "road.highway",
        elementType: "all",
        stylers: [{ visibility: "simplified" }],
      },
      {
        featureType: "road.arterial",
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "transit",
        elementType: "all",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "water",
        elementType: "all",
        stylers: [{ color: "#46bcec" }, { visibility: "on" }],
      },
    ],
  };

  var map = new google.maps.Map(document.getElementById("map"), mapOptions);

  // Create the search box and link it to the UI element.

  // Create the search box and link it to the UI element.
  const input = document.getElementById("pac-input");
  const searchBox = new google.maps.places.SearchBox(input);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  let markers = [];

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        })
      );
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });

  // End Map Search Box

  loadKml = function (opts, map) {
    var layer = new google.maps.KmlLayer();
    opts.preserveViewport = true;
    if (map) {
      opts.map = map;
    }

    google.maps.event.addListener(
      layer,
      "defaultviewport_changed",
      function () {
        var map = this.getMap(),
          bounds = map.get("kmlBounds") || this.getDefaultViewport();

        bounds.union(this.getDefaultViewport());
        map.set("kmlBounds", bounds);
        map.fitBounds(bounds);
      }
    );
    layer.setOptions(opts);
    //return layer;
  };

  function toggleLayers(i) {
    if (layers[i].getMap() == null) {
      layers[i].setMap(map);
    } else {
      layers[i].setMap(null);
    }
    google.maps.event.addListener(layers[i], "status_changed", function () {
      document.getElementById("status").innerHTML +=
        "toggleLayers(" +
        i +
        ") [setMap(" +
        layers[i].getMap() +
        "] returns status: " +
        layers[i].getStatus() +
        "<br>";
    });
  }
  // end toggle layers
  google.maps.event.addDomListener(
    document.getElementById("layer_01"),
    "click",
    function (evt) {
      toggleLayers(0);
    }
  );
  google.maps.event.addDomListener(
    document.getElementById("layer_02"),
    "click",
    function (evt) {
      toggleLayers(1);
    }
  );
  google.maps.event.addDomListener(
    document.getElementById("layer_03"),
    "click",
    function (evt) {
      toggleLayers(2);
    }
  );
  // toggle layers at the beginning
  toggleLayers(0);
  toggleLayers(1);
  toggleLayers(2);
}

google.maps.event.addDomListener(window, "load", coveragemap);

//]]>

if (window.parent && window.parent.parent) {
  window.parent.parent.postMessage(
    [
      "resultsFrame",
      {
        height: document.body.getBoundingClientRect().height,
        slug: "bmbd0e1w",
      },
    ],
    "*"
  );
}

// always overwrite window.name, in case users try to set it manually
window.name = "result";

// ******************************************************

var map, marker, infowindow;
var FTTHQuery = "//openserve.co.za/gis/apps/api/ucmTechOSFibre?";
//Define Openserve WMS layer
var openserve = new google.maps.ImageMapType({
  getTileUrl: function (coord, zoom) {
    var proj = map.getProjection();
    var zfactor = Math.pow(2, zoom);
    // get Long Lat coordinates
    var top = proj.fromPointToLatLng(
      new google.maps.Point(
        (coord.x * 256) / zfactor,
        (coord.y * 256) / zfactor
      )
    );
    var bot = proj.fromPointToLatLng(
      new google.maps.Point(
        ((coord.x + 1) * 256) / zfactor,
        ((coord.y + 1) * 256) / zfactor
      )
    );

    var deltaX = 0;
    var deltaY = 0;
    //create the Bounding box string
    var bbox =
      top.lng() +
      deltaX +
      "," +
      (bot.lat() + deltaY) +
      "," +
      (bot.lng() + deltaX) +
      "," +
      (top.lat() + deltaY);

    //FTTH WMS URL
    var url =
      "http://openserve.co.za/gis/arcgis/services/isp/FTTH_SRID4148/MapServer/WMSServer?";
    url += "&REQUEST=GetMap"; //WMS operation
    url += "&SERVICE=WMS"; //WMS service
    url += "&VERSION=1.1.1"; //WMS version
    url += "&LAYERS=0,1"; //WMS layers
    //url += "&Styles=OSPlanned-D07114,OSWorking-B41F58";  //Style for Each Layer, Choose from list below
    url += "&Styles=default,default"; //Style for Each Layer, Choose from list below
    url += "&FORMAT=image/png"; //WMS format
    url += "&BGCOLOR=0xFFFFFF";
    url += "&TRANSPARENT=TRUE";
    url += "&SRS=EPSG:4148"; //set WGS84
    url += "&BBOX=" + bbox; // set bounding box
    url += "&WIDTH=256"; //tile size in google
    url += "&HEIGHT=256";
    //url+= "&SLD=http://xxx"
    //console.log(url);
    return url; // return URL for the tile
  },
  tileSize: new google.maps.Size(256, 256),
  isPng: true,
  opacity: 0.65,
});

// Define Octotel KML Layer
var octotel = new google.maps.KmlLayer(
  "https://www.atomicaccess.co.za/wp-content/uploads/2022/07/octotel-fibre-coverage-2022-07.kmz",
  {
    preserveViewport: true,
    map: map,
  }
);

// Define Frogfoot KML Layer
var frogfoot = new google.maps.KmlLayer(
  "https://www.atomicaccess.co.za/wp-content/uploads/2022/07/frogfoot-fibre-coverage-2022-07.kmz",
  {
    preserveViewport: true,
    map: map,
  }
);

// Define Vumatel KML Layer
var vumatel = new google.maps.KmlLayer(
  "https://www.atomicaccess.co.za/wp-content/uploads/2022/07/vuma-fibre-coverage-2022-07.kmz",
  {
    preserveViewport: true,
    map: map,
  }
);

//Initialize Map
function initialize() {
  //Map Styles
  const capetown = { lat: -33.9277194, lng: 18.4579393 };
  var mapOptions = {
    zoom: 12,
    center: capetown,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
    scaleControl: true,
    streetViewControl: false,
    mapTypeControl: false,
    maxZoom: 18,
    minZoom: 6,
    styles: [
      {
        featureType: "administrative",
        elementType: "labels.text.fill",
        stylers: [{ color: "#444444" }],
      },
      {
        featureType: "landscape",
        elementType: "all",
        stylers: [{ color: "#f2f2f2" }],
      },
      {
        featureType: "poi",
        elementType: "all",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "road",
        elementType: "all",
        stylers: [{ saturation: -100 }, { lightness: 45 }],
      },
      {
        featureType: "road.highway",
        elementType: "all",
        stylers: [{ visibility: "simplified" }],
      },
      {
        featureType: "road.arterial",
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "transit",
        elementType: "all",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "water",
        elementType: "all",
        stylers: [{ color: "#46bcec" }, { visibility: "on" }],
      },
    ],
  };

  //Declare the map
  map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

  // Create the search box and link it to the UI element.
  var input = /** @type {HTMLInputElement} */ (
    document.getElementById("pac-input")
  );
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  //Add Frogfoot
  frogfoot.setMap(map);

  //add WMS layer
  map.overlayMapTypes.push(openserve);
  //Add Octotel
  octotel.setMap(map);

  //Add Vumatel
  vumatel.setMap(map);

  // Bias the SearchBox results towards current map's viewport.
  var defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-35, 15),
    new google.maps.LatLng(-15, 35)
  );

  var options = {
    bounds: defaultBounds,
    types: ["geocode"],
    geocoder_region: ["South Africa"],
    minLength: 5,
    region: "ZA",
  };

  var autocomplete = new google.maps.places.Autocomplete(input, options);
  autocomplete.bindTo("bounds", map);
  autocomplete.setComponentRestrictions({ country: "za" });

  infowindow = new google.maps.InfoWindow();

  marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29),
  });

  google.maps.event.addListener(autocomplete, "place_changed", function () {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17); // Why 17? Because it looks good.
    }
    marker.setIcon(
      /** @type {google.maps.Icon} */ ({
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(35, 35),
      })
    );
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = "";
    if (place.address_components) {
      address = [
        (place.address_components[0] &&
          place.address_components[0].short_name) ||
          "",
        (place.address_components[1] &&
          place.address_components[1].short_name) ||
          "",
        (place.address_components[2] &&
          place.address_components[2].short_name) ||
          "",
      ].join(" ");
    }

    infowindow.setContent("<div><strong>" + address + "</strong><br>");
    infowindow.open(map, marker);

    if (place.geometry.location) onClickCallback(place.geometry, address);
  });

  google.maps.event.addListener(map, "click", onClickCallback);
  function onClickCallback(event, address) {
    var LAT, LON;
    if (event.latLng) {
      LAT = event.latLng.lat();
      LON = event.latLng.lng();
    } else if (event.location) {
      LAT = event.location.lat();
      LON = event.location.lng();
    } else {
      alert("GeomErr:", event);
      return;
    }

    var resp = "";
    $.post(FTTHQuery, { LAT: LAT, LON: LON }, function (responseJson) {
      if (responseJson) {
        console.log("FTTH Info:", responseJson);
        ALERT = "FTTH Status : " + responseJson.FTTH_Status + "\n";
        ALERT += "MDU_Verification : " + responseJson.MDU_Verification + "\n";

        if (marker != null) {
          marker.setMap(null);
          marker = null;
        }

        marker = new google.maps.Marker({
          position: new google.maps.LatLng(LAT, LON),
          map: map,
          clickable: false,
        });

        marker.setMap(map);
        if (address === undefined) {
          if (responseJson.AddressInfo)
            address = responseJson.AddressInfo.LR_Address;
        }

        var InfoWindowContent = "<div><strong>" + address + "</strong><br>";
        InfoWindowContent +=
          "<br><strong>FTTH Status : </strong>" +
          responseJson.FTTH_Status +
          "\n";
        InfoWindowContent +=
          "<br><strong>MDU_Verification : </strong>" +
          responseJson.MDU_Verification +
          "\n";
        InfoWindowContent += "</div>";

        infowindow.setContent(InfoWindowContent);
        infowindow.open(map, marker);
      }
    });
  }
}
