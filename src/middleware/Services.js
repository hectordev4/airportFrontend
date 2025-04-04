import { airportService } from "./airportService";
import { flightService } from "./flightService";
import { planeService } from "./planeService";

const Services = {
    airports: airportService,
    flights: flightService,
    planes: planeService,
};

export default Services;