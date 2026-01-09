import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard Owner',
    description: 'Business overview and analytics for Los Pollos Hermanos owner',
};

export default function OwnerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
