import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
        paddingBottom: 20,
    },
    logoSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoText: {
        marginLeft: 10,
    },
    companyName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a2e',
    },
    companySubtitle: {
        fontSize: 10,
        color: '#666',
        marginTop: 2,
    },
    reportTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a2e',
        textAlign: 'right',
    },
    reportMeta: {
        fontSize: 10,
        color: '#666',
        textAlign: 'right',
        marginTop: 4,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1a1a2e',
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: '#f8f9fa',
        padding: 8,
    },
    table: {
        width: '100%',
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingVertical: 8,
        paddingHorizontal: 4,
    },
    rowFinal: {
        flexDirection: 'row',
        borderTopWidth: 2,
        borderTopColor: '#1a1a2e',
        paddingVertical: 12,
        paddingHorizontal: 4,
        backgroundColor: '#f8f9fa',
        marginTop: 10,
    },
    colLabel: {
        width: '70%',
        fontSize: 11,
        color: '#444',
    },
    colAmount: {
        width: '30%',
        fontSize: 11,
        textAlign: 'right',
        fontWeight: 'bold',
        color: '#1a1a2e',
    },
    labelBold: {
        fontWeight: 'bold',
        color: '#1a1a2e',
    },
    amountExpense: {
        color: '#EF4444',
    },
    amountPositive: {
        color: '#10B981',
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        borderTopWidth: 1,
        borderTopColor: '#e5e5e5',
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footerText: {
        fontSize: 8,
        color: '#888',
    },
});

interface FinancialItem {
    label: string;
    amount: number;
    type: string;
}

interface FinancialReportPDFProps {
    period: string;
    data: FinancialItem[];
    generatedAt: string;
}

export const FinancialReportPDF = ({ period, data, generatedAt }: FinancialReportPDFProps) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.logoSection}>
                        {/* Placeholder for Logo if needed, using text for now to be safe */}
                        <View style={styles.logoText}>
                            <Text style={styles.companyName}>Los Pollos Hermanos</Text>
                            <Text style={styles.companySubtitle}>Business Performance Report</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.reportTitle}>FINANCIALS</Text>
                        <Text style={styles.reportMeta}>Period: {period}</Text>
                        <Text style={styles.reportMeta}>Generated: {generatedAt}</Text>
                    </View>
                </View>

                {/* Income Statement Table */}
                <Text style={styles.sectionTitle}>Income Statement</Text>
                
                <View style={styles.table}>
                     <View style={[styles.row, { borderBottomWidth: 2, borderBottomColor: '#1a1a2e' }]}>
                        <Text style={[styles.colLabel, styles.labelBold]}>Description</Text>
                        <Text style={[styles.colAmount, styles.labelBold]}>Amount (USD)</Text>
                    </View>

                    {data.map((item, index) => {
                        const isFinal = item.type === 'final';
                        const isNet = item.type === 'net';
                        
                        // Special styling for Net Profit and Gross Profit
                        if (isFinal || isNet) {
                             return (
                                <View key={index} style={styles.rowFinal}>
                                    <Text style={[styles.colLabel, styles.labelBold, { fontSize: isFinal ? 14 : 11 }]}>
                                        {item.label}
                                    </Text>
                                    <Text style={[
                                        styles.colAmount, 
                                        { fontSize: isFinal ? 14 : 11, color: item.type === 'net' ? '#1a1a2e' : '#10B981' }
                                    ]}>
                                        ${item.amount.toLocaleString()}
                                    </Text>
                                </View>
                            );
                        }

                        return (
                            <View key={index} style={styles.row}>
                                <Text style={styles.colLabel}>{item.label}</Text>
                                <Text style={[
                                    styles.colAmount,
                                    item.type === 'expense' ? styles.amountExpense : {}
                                ]}>
                                    {item.type === 'expense' ? '-' : ''}${item.amount.toLocaleString()}
                                </Text>
                            </View>
                        );
                    })}
                </View>

                {/* Notes */}
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 10, color: '#666', fontStyle: 'italic' }}>
                        * This report is generated automatically from the POS system records.
                        COGS and Operating Expenses are estimated based on standard configurations.
                    </Text>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Confidential - Internal Use Only</Text>
                    <Text style={styles.footerText}>Page 1 of 1</Text>
                </View>
            </Page>
        </Document>
    );
};
