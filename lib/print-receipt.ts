/**
 * Receipt Printing Utility
 * Centralized function for printing thermal receipts
 */

import { COMPANY, LOGOS } from '@/lib/config/company';
import { RECEIPT_WIDTH_MM, RECEIPT_LOGO_WIDTH_MM } from '@/lib/config/constants';

// Re-export type from types folder for backward compatibility
export type { PrintReceiptData } from '@/lib/types/receipt';
import type { PrintReceiptData } from '@/lib/types/receipt';

const receiptStyles = `
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    @page {
        size: 58mm auto;
        margin: 0;
    }
    body {
        font-family: 'Lucida Console', 'Consolas', 'Monaco', monospace;
        font-size: 12px;
        font-weight: 600;
        line-height: 1.4;
        width: 58mm;
        padding: 3mm;
        background: white;
        color: black;
        -webkit-font-smoothing: none;
    }
    .header {
        text-align: center;
        margin-bottom: 8px;
    }
    .header .logo {
        width: 45mm;
        height: auto;
        margin: 0 auto 5px auto;
        display: block;
    }
    .header .title {
        font-size: 18px;
        font-weight: 900;
        letter-spacing: 1px;
    }
    .header .subtitle {
        font-size: 14px;
        font-weight: 800;
    }
    .header .tagline {
        font-size: 10px;
        font-weight: 600;
        margin-top: 3px;
    }
    .header .address {
        font-size: 10px;
        font-weight: 500;
        margin-top: 5px;
    }
    .divider {
        border-bottom: 2px dashed #000;
        margin: 6px 0;
    }
    .info-row {
        display: flex;
        justify-content: space-between;
        font-size: 11px;
        font-weight: 600;
        margin-bottom: 2px;
    }
    .info-row .bold {
        font-weight: 800;
    }
    .items-header {
        display: flex;
        justify-content: space-between;
        font-size: 11px;
        font-weight: 800;
        margin-bottom: 4px;
        text-decoration: underline;
    }
    .item {
        margin-bottom: 5px;
    }
    .item-row {
        display: flex;
        justify-content: space-between;
        font-size: 11px;
        font-weight: 700;
    }
    .item-details {
        font-size: 10px;
        font-weight: 500;
        padding-left: 6px;
    }
    .totals {
        margin-top: 6px;
    }
    .total-row {
        display: flex;
        justify-content: space-between;
        font-size: 11px;
        font-weight: 600;
        margin-bottom: 2px;
    }
    .total-row.grand {
        font-size: 14px;
        font-weight: 900;
        margin-top: 5px;
        padding-top: 5px;
        border-top: 2px solid #000;
    }
    .footer {
        text-align: center;
        margin-top: 10px;
    }
    .footer .thanks {
        font-size: 12px;
        font-weight: 800;
    }
    .footer .tagline {
        font-size: 10px;
        font-weight: 600;
        margin-top: 3px;
    }
    .footer .website {
        font-size: 9px;
        font-weight: 500;
        margin-top: 4px;
    }
    .footer .notice {
        font-size: 9px;
        font-weight: 500;
        margin-top: 6px;
    }
    .order-number {
        text-align: center;
        margin-top: 10px;
        padding-top: 6px;
        border-top: 2px dashed #000;
    }
    .order-number .number {
        font-size: 22px;
        font-weight: 900;
        letter-spacing: 2px;
    }
    .order-number .type {
        font-size: 10px;
        font-weight: 700;
    }
`;

function generateReceiptHTML(data: PrintReceiptData): string {
    const formatDate = (date: Date) => 
        date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    const formatTime = (date: Date) => 
        date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const itemsHTML = data.items.map(item => `
        <div class="item">
            <div class="item-row">
                <span>${item.name}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
            <div class="item-details">${item.quantity} x $${item.price.toFixed(2)}</div>
        </div>
    `).join('');

    const cashDetailsHTML = data.paymentMethod === 'cash' && data.cashReceived ? `
        <div class="info-row">
            <span>Cash Received:</span>
            <span>$${data.cashReceived.toFixed(2)}</span>
        </div>
        <div class="info-row">
            <span>Change:</span>
            <span class="bold">$${data.change?.toFixed(2)}</span>
        </div>
    ` : '';

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Receipt #${data.orderNumber}</title>
            <style>${receiptStyles}</style>
        </head>
        <body>
            <div class="header">
                <img class="logo" src="${typeof window !== 'undefined' ? window.location.origin : ''}/images/logos/los-pollos-logo.png" alt="Los Pollos Hermanos" />
                <div class="title">LOS POLLOS</div>
                <div class="subtitle">HERMANOS</div>
                <div class="tagline">"The Chicken Brothers"</div>
                <div class="divider"></div>
                <div class="address">
                    308 Negra Arroyo Lane<br>
                    Albuquerque, NM 87104<br>
                    Tel: (505) 555-0123
                </div>
            </div>
            
            <div class="divider"></div>
            
            <div class="info-row">
                <span>Order #:</span>
                <span class="bold">${data.orderNumber}</span>
            </div>
            <div class="info-row">
                <span>Date:</span>
                <span>${formatDate(data.date)}</span>
            </div>
            <div class="info-row">
                <span>Time:</span>
                <span>${formatTime(data.date)}</span>
            </div>
            <div class="info-row">
                <span>Customer:</span>
                <span>${data.customerName || 'Guest'}</span>
            </div>
            <div class="info-row">
                <span>Type:</span>
                <span class="bold">${data.orderType === 'dine-in' ? 'DINE IN' : 'TAKE AWAY'}</span>
            </div>
            <div class="info-row">
                <span>Cashier:</span>
                <span>${data.cashierName}</span>
            </div>
            
            <div class="divider"></div>
            
            <div class="items-header">
                <span>Item</span>
                <span>Amount</span>
            </div>
            
            ${itemsHTML}
            
            <div class="divider"></div>
            
            <div class="totals">
                <div class="total-row">
                    <span>Subtotal:</span>
                    <span>$${data.subtotal.toFixed(2)}</span>
                </div>
                <div class="total-row">
                    <span>Tax (10%):</span>
                    <span>$${data.tax.toFixed(2)}</span>
                </div>
                <div class="total-row grand">
                    <span>TOTAL:</span>
                    <span>$${data.total.toFixed(2)}</span>
                </div>
            </div>
            
            <div class="divider"></div>
            
            <div class="info-row">
                <span>Payment:</span>
                <span class="bold">${data.paymentMethod.toUpperCase()}</span>
            </div>
            ${cashDetailsHTML}
            
            <div class="divider"></div>
            
            <div class="footer">
                <div class="thanks">★ Thank You! ★</div>
                <div class="tagline">"Taste the Family Recipe"</div>
                <div class="website">Visit us at: www.lospollos.com</div>
                <div class="notice">
                    Keep this receipt for refunds<br>
                    within 24 hours of purchase
                </div>
            </div>
            
            <div class="order-number">
                <div class="number">${data.orderNumber}</div>
                <div class="type">${data.orderType === 'dine-in' ? '[ DINE IN ]' : '[ TAKE AWAY ]'}</div>
            </div>
        </body>
        </html>
    `;
}

/**
 * Opens a print window and prints the receipt
 * @param data - Receipt data to print
 * @returns boolean - true if print window opened successfully
 */
export function printReceipt(data: PrintReceiptData): boolean {
    const printWindow = window.open('', '_blank', 'width=350,height=600');
    if (!printWindow) {
        console.error('Failed to open print window. Please allow popups.');
        return false;
    }

    const receiptHTML = generateReceiptHTML(data);
    
    printWindow.document.write(receiptHTML);
    printWindow.document.close();
    printWindow.focus();
    
    // Wait for content to load then print
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 250);

    return true;
}

/**
 * Generates receipt HTML without printing (for preview purposes)
 * @param data - Receipt data
 * @returns string - HTML string
 */
export function getReceiptHTML(data: PrintReceiptData): string {
    return generateReceiptHTML(data);
}
