import { ReactNode } from "react";

type StatCardProps = {
    title: string;
    value: number;
    icon: ReactNode;
    variant?: "indigo" | "blue" | "pink" | "green";
};

export default function StatCard({ title, value, icon, variant }: StatCardProps) {
    return (
        <div className="stat-card">
            <div className={`stat-card-icon stat-card-icon--${variant}`}>{icon}</div>
            <div className="stat-card-info">
                <span className="stat-card-value">{value}</span>
                <span className="stat-card-title">{title}</span>
            </div>
        </div>
    )
}