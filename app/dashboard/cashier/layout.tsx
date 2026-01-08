import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard POS",
};

export default function CashierLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
