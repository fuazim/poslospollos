'use client';

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Define styles
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        fontSize: 10,
        backgroundColor: '#ffffff',
    },
    header: {
        marginBottom: 30,
        borderBottomWidth: 2,
        borderBottomColor: '#F4A900',
        paddingBottom: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a2e',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 10,
        color: '#666666',
    },
    companyInfo: {
        marginTop: 10,
        fontSize: 9,
        color: '#888888',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1a1a2e',
        marginBottom: 10,
        backgroundColor: '#f5f5f5',
        padding: 8,
        borderRadius: 4,
    },
    table: {
        width: '100%',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#1a1a2e',
        padding: 8,
        marginBottom: 2,
    },
    tableHeaderText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 9,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
        padding: 8,
    },
    tableRowAlt: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
        padding: 8,
        backgroundColor: '#fafafa',
    },
    col1: { width: '12%' },
    col2: { width: '18%' },
    col3: { width: '25%' },
    col4: { width: '12%' },
    col5: { width: '13%' },
    col6: { width: '20%' },
    cellText: {
        fontSize: 9,
        color: '#333333',
    },
    summaryBox: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#eeeeee',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    summaryLabel: {
        fontSize: 10,
        color: '#666666',
    },
    summaryValue: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#1a1a2e',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: '#F4A900',
    },
    totalLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1a1a2e',
    },
    totalValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#F4A900',
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        textAlign: 'center',
        fontSize: 8,
        color: '#aaaaaa',
        borderTopWidth: 1,
        borderTopColor: '#eeeeee',
        paddingTop: 10,
    },
    badge: {
        padding: '2 6',
        borderRadius: 4,
        fontSize: 8,
    },
    badgeCash: {
        backgroundColor: '#d1fae5',
        color: '#059669',
    },
    badgeCard: {
        backgroundColor: '#dbeafe',
        color: '#2563eb',
    },
    badgeWallet: {
        backgroundColor: '#ede9fe',
        color: '#7c3aed',
    },
});

interface Transaction {
    id: string;
    orderNumber: string;
    date: string;
    time: string;
    customer: string;
    items: { name: string; qty: number; price: number }[];
    subtotal: number;
    tax: number;
    total: number;
    paymentMethod: string;
    cashier: string;
}

interface InvoicePDFProps {
    transactions: Transaction[];
    period?: string;
}

export const InvoicePDF = ({ transactions, period = 'All Period' }: InvoicePDFProps) => {
    const totalSubtotal = transactions.reduce((sum, t) => sum + t.subtotal, 0);
    const totalTax = transactions.reduce((sum, t) => sum + t.tax, 0);
    const grandTotal = transactions.reduce((sum, t) => sum + t.total, 0);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Los Pollos Hermanos</Text>
                    <Text style={styles.subtitle}>Transaction Invoice Report</Text>
                    <Text style={styles.companyInfo}>
                        308 Negra Arroyo Lane, Albuquerque, NM 87104 | NPWP: 01.234.567.8-901.000
                    </Text>
                    <Text style={[styles.companyInfo, { marginTop: 5 }]}>
                        Generated: {new Date().toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })} | Period: {period}
                    </Text>
                </View>

                {/* Transactions Table */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Transactions ({transactions.length})</Text>
                    
                    {/* Table Header */}
                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableHeaderText, styles.col1]}>Order #</Text>
                        <Text style={[styles.tableHeaderText, styles.col2]}>Date/Time</Text>
                        <Text style={[styles.tableHeaderText, styles.col3]}>Customer</Text>
                        <Text style={[styles.tableHeaderText, styles.col4]}>Tax</Text>
                        <Text style={[styles.tableHeaderText, styles.col5]}>Total</Text>
                        <Text style={[styles.tableHeaderText, styles.col6]}>Payment</Text>
                    </View>

                    {/* Table Rows */}
                    {transactions.map((tx, index) => (
                        <View key={tx.id} style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
                            <Text style={[styles.cellText, styles.col1]}>{tx.orderNumber}</Text>
                            <Text style={[styles.cellText, styles.col2]}>{tx.date} {tx.time}</Text>
                            <Text style={[styles.cellText, styles.col3]}>{tx.customer}</Text>
                            <Text style={[styles.cellText, styles.col4]}>${tx.tax.toFixed(2)}</Text>
                            <Text style={[styles.cellText, styles.col5, { fontWeight: 'bold' }]}>${tx.total.toFixed(2)}</Text>
                            <Text style={[styles.cellText, styles.col6]}>{tx.paymentMethod}</Text>
                        </View>
                    ))}
                </View>

                {/* Summary Box */}
                <View style={styles.summaryBox}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Total Transactions</Text>
                        <Text style={styles.summaryValue}>{transactions.length}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Subtotal</Text>
                        <Text style={styles.summaryValue}>${totalSubtotal.toFixed(2)}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Total Tax (10%)</Text>
                        <Text style={styles.summaryValue}>${totalTax.toFixed(2)}</Text>
                    </View>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Grand Total</Text>
                        <Text style={styles.totalValue}>${grandTotal.toFixed(2)}</Text>
                    </View>
                </View>

                {/* Footer */}
                <Text style={styles.footer}>
                    Los Pollos Hermanos © 2026 | This is an official transaction report. 
                    For questions, contact: support@lospollos.com
                </Text>
            </Page>
        </Document>
    );
};

// Tax Report PDF
interface TaxReportPDFProps {
    period: string;
    totalSales: number;
    totalTax: number;
    netSales: number;
    taxRate: number;
}

export const TaxReportPDF = ({ period, totalSales, totalTax, netSales, taxRate }: TaxReportPDFProps) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Los Pollos Hermanos</Text>
                    <Text style={styles.subtitle}>Tax Summary Report</Text>
                    <Text style={styles.companyInfo}>
                        308 Negra Arroyo Lane, Albuquerque, NM 87104 | NPWP: 01.234.567.8-901.000
                    </Text>
                </View>

                {/* Period */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Report Period: {period}</Text>
                </View>

                {/* Tax Summary */}
                <View style={styles.summaryBox}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Gross Sales</Text>
                        <Text style={styles.summaryValue}>${totalSales.toLocaleString()}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Tax Rate</Text>
                        <Text style={styles.summaryValue}>{taxRate}%</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Tax Collected</Text>
                        <Text style={[styles.summaryValue, { color: '#F4A900' }]}>${totalTax.toLocaleString()}</Text>
                    </View>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Net Sales (After Tax)</Text>
                        <Text style={[styles.totalValue, { color: '#10B981' }]}>${netSales.toLocaleString()}</Text>
                    </View>
                </View>

                {/* Footer */}
                <Text style={styles.footer}>
                    Los Pollos Hermanos © 2026 | Official Tax Report | Generated: {new Date().toLocaleDateString()}
                </Text>
            </Page>
        </Document>
    );
};
