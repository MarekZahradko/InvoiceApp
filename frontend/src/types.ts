// Shared data types for the entire application

// person / company
export interface Person {
    _id?: number;
    name: string;
    identificationNumber: string;
    taxNumber: string;
    accountNumber: string;
    bankCode: string;
    iban: string;
    telephone: string;
    mail: string;
    street: string;
    zip: string;
    city: string;
    country: string;
    note: string;
}

// invoice
export interface Invoice {
    _id?: number;
    invoiceNumber: string;
    seller: Person | { _id: number | string } | string;
    buyer: Person | { _id: number | string } | string;
    issued: string;
    dueDate: string;
    product: string;
    price: number | string;
    vat: number | string;
    note: string;
}

// logged-in user
export interface User {
    id?: number;
    email: string;
    roles?: string[];
}

// statistics for person
export interface PersonStatisticsData {
    personName: string;
    revenue: number;
    personId: number;
    identificationNumber: string;
}

// statistics for invoices
export interface InvoiceStatisticsData {
    currentYearSum: number;
    allTimeSum: number;
    invoicesCount: number;
}
