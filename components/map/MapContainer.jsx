const { default: dynamic } = require("next/dynamic");

const MapContainer = dynamic(() => import("./Map"), {
  ssr: false,
});

export default MapContainer;
