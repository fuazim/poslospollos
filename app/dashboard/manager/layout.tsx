import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard Manager",
};

export default function ManagerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
