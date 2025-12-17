// src/services/calculatorApi.ts
import axios from 'axios';
import type { CalculateRequest, CalculateResponse } from '@/types/calculator';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
});

export const calculatorApi = {
    async checkHealth(): Promise<boolean> {
        try {
            const response = await apiClient.get('/api/v1/health');
            return response.status === 200;
        } catch {
            return false;
        }
    },

    async calculate(request: CalculateRequest): Promise<CalculateResponse> {
        try {
            const response = await apiClient.post<CalculateResponse>(
                '/api/v1/calculate',
                request
            );
            return response.data;
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response?.data) {
                return error.response.data as CalculateResponse;
            }
            return {
                result: 0,
                error: 'Failed to connect to backend. Is the server running?',
            };
        }
    },

    // Optional convenience helpers, now all hitting the same endpoint:
    async add(a: number, b: number) {
        return this.calculate({ operand1: a, operand2: b, operation: 'add' });
    },
    async subtract(a: number, b: number) {
        return this.calculate({ operand1: a, operand2: b, operation: 'subtract' });
    },
    async multiply(a: number, b: number) {
        return this.calculate({ operand1: a, operand2: b, operation: 'multiply' });
    },
    async divide(a: number, b: number) {
        return this.calculate({ operand1: a, operand2: b, operation: 'divide' });
    },
    async power(base: number, exponent: number) {
        return this.calculate({ operand1: base, operand2: exponent, operation: 'power' });
    },
    async sqrt(value: number) {
        return this.calculate({ operand1: value, operation: 'sqrt' });
    },
    async percentage(value: number, percent: number) {
        return this.calculate({
            operand1: value,
            operand2: percent,
            operation: 'percentage',
        });
    },
};
