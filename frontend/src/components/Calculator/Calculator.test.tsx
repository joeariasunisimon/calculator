import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Calculator } from '@/components/Calculator/Calculator';

vi.mock('@/services/calculatorApi');

describe('Calculator Component', () => {
    it('renders calculator with display and buttons', () => {
        render(<Calculator />);
        expect(screen.getByText('Calculator')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '0' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
    });

    it('displays number when clicked', () => {
        render(<Calculator />);
        const button5 = screen.getByRole('button', { name: '5' });
        fireEvent.click(button5);

        const input = screen.getByRole('textbox');
        expect(input).toHaveValue('5');
    });

    it('clears display when C is clicked', () => {
        render(<Calculator />);
        const button5 = screen.getByRole('button', { name: '5' });
        const clearButton = screen.getByRole('button', { name: 'C' });

        fireEvent.click(button5);
        fireEvent.click(clearButton);

        const input = screen.getByRole('textbox');
        expect(input).toHaveValue('0');
    });
});
