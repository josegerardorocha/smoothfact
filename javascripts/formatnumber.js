.pragma library

/**
 * Formata um valor como moeda em formato europeu
 * @param {number} value - Valor a formatar
 * @param {string} currency - Código da moeda (default: 'EUR')
 * @returns {string} Valor formatado (ex: '€ 1.000,00')
 */
function formatCurrency(value, currency = 'EUR') {
    if (value === null || value === undefined) return '€ 0,00'
    
    const num = parseFloat(value)
    if (isNaN(num)) return '€ 0,00'
    
    // Format with 2 decimal places and European thousand separators
    const parts = num.toFixed(2).split('.')
    const integerPart = parts[0]
    const decimalPart = parts[1]
    
    // Add thousand separators (dots in European format)
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    
    // Get currency symbol
    const symbols = {
        'EUR': '€',
        'USD': '$',
        'GBP': '£',
        'JPY': '¥'
    }
    const symbol = symbols[currency] || currency
    
    return symbol + ' ' + formattedInteger + ',' + decimalPart
}

function randomInvoiceNumber() {
    return Math.floor(Math.random() * 900000) + 100000
}

function year(dateText) {
    // Match DD/MM/YYYY
    const match = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/.exec(dateText)
    if (!match)
        return ""  // Invalid format
    return match[3] // Return year part
}