import Map from "@/Map";
import { useRouter } from "next/router";

export default function MyPage() {
    const router = useRouter();

    const { lat, lng } = router.query;

    if (!lat || !lng) return (<div>loading...</div>);

    return (
        <div style={{
            height: "100vh",
            width: "100vw"
        }}
        >
            <Map className="map"
                draggable={false}
                markerPosition={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
            />
        </div>
    );
}
