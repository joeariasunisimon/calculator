import { useState, useCallback } from 'react';
import type { CalculatorState, CalculatorOperation } from '@/types/calculator';
import { calculatorApi } from '@/services/calculatorApi';

export const useCalculator = () => {
    const [state, setState] = useState<CalculatorState>({
        display: '0',
        previousValue: null,
        operation: null,
        newNumber: false,
        isLoading: false,
        error: null,
    });

    const handleNumberClick = useCallback((num: string) => {
        setState((prev) => {
            if (prev.newNumber) {
                return {
                    ...prev,
                    display: num,
                    newNumber: false,
                };
            }
            return {
                ...prev,
                display: prev.display === '0' ? num : prev.display + num,
            };
        });
    }, []);

    const handleDecimal = useCallback(() => {
        setState((prev) => {
            if (prev.newNumber) {
                return {
                    ...prev,
                    display: '0.',
                    newNumber: false,
                };
            }
            if (!prev.display.includes('.')) {
                return {
                    ...prev,
                    display: prev.display + '.',
                };
            }
            return prev;
        });
    }, []);

    const handleOperation = useCallback(
        async (nextOperation: CalculatorOperation) => {
            const currentValue = parseFloat(state.display);

            if (state.previousValue !== null && state.operation && !state.newNumber) {
                // Continue calculation
                setState((prev) => ({ ...prev, isLoading: true }));

                try {
                    const response = await calculatorApi.calculate({
                        operand1: state.previousValue!,
                        operand2: currentValue,
                        operation: state.operation,
                    });

                    if (response.error) {
                        setState((prev) => ({
                            ...prev,
                            display: response.error || 'Error',
                            error: response.error || null,
                            isLoading: false,
                        }));
                    } else {
                        setState((prev) => ({
                            ...prev,
                            display: response.result.toString(),
                            previousValue: response.result,
                            operation: nextOperation,
                            newNumber: true,
                            error: null,
                            isLoading: false,
                        }));
                    }
                } catch (error) {
                    setState((prev) => ({
                        ...prev,
                        error: 'Failed to calculate',
                        isLoading: false,
                    }));
                }
            } else {
                setState((prev) => ({
                    ...prev,
                    previousValue: currentValue,
                    operation: nextOperation,
                    newNumber: true,
                }));
            }
        },
        [state.display, state.previousValue, state.operation, state.newNumber]
    );

    const handleEquals = useCallback(async () => {
        if (state.previousValue !== null && state.operation) {
            const currentValue = parseFloat(state.display);
            setState((prev) => ({ ...prev, isLoading: true }));

            try {
                const response = await calculatorApi.calculate({
                    operand1: state.previousValue,
                    operand2: currentValue,
                    operation: state.operation,
                });

                if (response.error) {
                    setState((prev) => ({
                        ...prev,
                        display: response.error || 'Error',
                        error: response.error || null,
                        isLoading: false,
                    }));
                } else {
                    setState((prev) => ({
                        ...prev,
                        display: response.result.toString(),
                        previousValue: null,
                        operation: null,
                        newNumber: true,
                        error: null,
                        isLoading: false,
                    }));
                }
            } catch (error) {
                setState((prev) => ({
                    ...prev,
                    error: 'Failed to calculate',
                    isLoading: false,
                }));
            }
        }
    }, [state.display, state.previousValue, state.operation]);

    const handleClear = useCallback(() => {
        setState({
            display: '0',
            previousValue: null,
            operation: null,
            newNumber: false,
            isLoading: false,
            error: null,
        });
    }, []);

    const handleSqrt = useCallback(async () => {
        const currentValue = parseFloat(state.display);
        setState((prev) => ({ ...prev, isLoading: true }));

        try {
            const response = await calculatorApi.calculate({
                operand1: currentValue,
                operand2: 0,
                operation: 'sqrt',
            });
            if (response.error) {
                setState((prev) => ({
                    ...prev,
                    display: response.error || 'Error',
                    error: response.error || null,
                    isLoading: false,
                }));
            } else {
                setState((prev) => ({
                    ...prev,
                    display: response.result.toString(),
                    newNumber: true,
                    error: null,
                    isLoading: false,
                }));
            }
        } catch (error) {
            setState((prev) => ({
                ...prev,
                error: 'Failed to calculate',
                isLoading: false,
            }));
        }
    }, [state.display]);

    return {
        ...state,
        handleNumberClick,
        handleDecimal,
        handleOperation,
        handleEquals,
        handleClear,
        handleSqrt,
    };
};
