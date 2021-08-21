import 'document-register-element';
import {GpsDetector} from "../front/GpsDetector.js";
it('getCurrentGpsPosition',async function () {
    let gpsdetector = new GpsDetector();
    let position = await gpsdetector.getCurrentPosition()
    console.log(position)
});