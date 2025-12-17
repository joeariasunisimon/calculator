// Request/Response types for API communication
export interface CalculateRequest {
    operand1?: number;
    operand2?: number;
    operation: CalculatorOperation;
}

export interface CalculateResponse {
    result: number;
    error?: string;
}

export type CalculatorOperation =
    | 'add'
    | 'subtract'
    | 'multiply'
    | 'divide'
    | 'power'
    | 'sqrt'
    | 'percentage';

export interface CalculatorState {
    display: string;
    previousValue: number | null;
    operation: CalculatorOperation | null;
    newNumber: boolean;
    isLoading: boolean;
    error: string | null;
}
