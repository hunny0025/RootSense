"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getHeatmapData } from "@/lib/api";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(
    () => import("react-leaflet").then((mod) => mod.MapContainer as any),
    { ssr: false }
);
const TileLayer = dynamic(
    () => import("react-leaflet").then((mod) => mod.TileLayer as any),
    { ssr: false }
);
const Marker = dynamic(
    () => import("react-leaflet").then((mod) => mod.Marker as any),
    { ssr: false }
);
const Popup = dynamic(
    () => import("react-leaflet").then((mod) => mod.Popup as any),
    { ssr: false }
);

export default function TreeHeatmap() {
    const [mapData, setMapData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [showTrees, setShowTrees] = useState(true);

    useEffect(() => {
        getHeatmapData().then((result) => {
            if (result.success) {
                setMapData(result.data);
            }
            setLoading(false);
        });
    }, []);

    if (loading || typeof window === 'undefined') {
        return (
            <div className="border border-cyan-500/30 p-8 flex items-center justify-center h-[500px]">
                <div className="animate-pulse tracking-widest uppercase text-cyan-400 text-sm">
                    Loading map data...
                </div>
            </div>
        );
    }

    if (!mapData) {
        return (
            <div className="border border-red-500/30 p-8 flex items-center justify-center h-[500px]">
                <div className="text-red-400 text-sm uppercase tracking-widest">
                    Map data unavailable
                </div>
            </div>
        );
    }

    return (
        <div className="border border-cyan-500/30 bg-transparent">
            <div className="border-b border-cyan-500/30 p-4 flex justify-between items-center">
                <div>
                    <h3 className="text-white uppercase tracking-widest font-bold flex items-center gap-3">
                        <span className="w-1 h-6 bg-cyan-500"></span>
                        TREE DENSITY MONITORING GRID
                    </h3>
                    <p className="text-xs text-cyan-500/70 uppercase tracking-wider mt-1">
                        DATA SOURCE: {mapData.simulation_mode ? 'SIMULATION' : 'LIVE'}
                    </p>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => setShowTrees(!showTrees)}
                        className={`px-4 py-2 border text-xs uppercase tracking-widest transition-colors ${showTrees
                            ? 'border-cyan-500 bg-cyan-500/20 text-cyan-400'
                            : 'border-cyan-500/30 text-cyan-500/70 hover:border-cyan-500/60'
                            }`}
                    >
                        {showTrees ? '● TREE LAYER' : '○ TREE LAYER'}
                    </button>
                </div>
            </div>

            <div className="h-[500px] relative">
                <MapContainer
                    center={[mapData.center.lat, mapData.center.lng] as [number, number]}
                    zoom={16}
                    style={{ height: '100%', width: '100%' }}
                    className="z-0"
                >
                    <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

                    {showTrees && mapData.trees.map((tree: any, idx: number) => (
                        <Marker key={idx} position={[tree.latitude, tree.longitude] as [number, number]}>
                            <Popup>
                                <div className="text-xs">
                                    <strong>Tree Location</strong><br />
                                    Density: {(tree.density_weight * 100).toFixed(0)}%<br />
                                    Lat: {tree.latitude.toFixed(5)}<br />
                                    Lng: {tree.longitude.toFixed(5)}
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>

                <div className="absolute bottom-4 left-4 z-[1000] bg-[#0A0F14]/90 border border-cyan-500/50 px-4 py-2 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-xs text-cyan-400 uppercase tracking-wider">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span>SYSTEM ACTIVE | {mapData.trees.length} TREES MAPPED</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
