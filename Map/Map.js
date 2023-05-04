import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import styles from './Map.module.css'
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import { useState } from 'react'



const CustomMarker = ({ markerPosition }) => {
    return (
        <Marker position={markerPosition}>
            <Popup>
                A Camel is detected here!
            </Popup>
        </Marker>
    )
}

function ChangeView({ center }) {
    const map = useMap();
    map.setView(center);
    return null;
}


const Map = ({ markerPosition }) => {


    const [zoom, setZoom] = useState(17);
    return (
        zoom &&
        <MapContainer
            className={styles.map}
            center={markerPosition}
            zoom={zoom}
            scrollWheelZoom={true}
        >
            <ChangeView center={markerPosition} zoom={zoom} />

            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=e8f98bd8df6f4ecf8417484f8161885f"
            />

            <CustomMarker
                markerPosition={markerPosition}
            />
        </MapContainer>
    )
}

export default Map;