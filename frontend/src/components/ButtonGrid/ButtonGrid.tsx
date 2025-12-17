import { Button } from '@/components/Button/Button';
import styles from '@/components/ButtonGrid/ButtonGrid.module.css';
import type { CalculatorOperation } from '@/types/calculator';

interface ButtonGridProps {
    onNumberClick: (num: string) => void;
    onOperationClick: (op: CalculatorOperation) => void;
    onEquals: () => void;
    onClear: () => void;
    onDecimal: () => void;
    onSqrt: () => void;
    isLoading: boolean;
}

export const ButtonGrid: React.FC<ButtonGridProps> = ({
    onNumberClick,
    onOperationClick,
    onEquals,
    onClear,
    onDecimal,
    onSqrt,
    isLoading,
}) => {
    const buttons = [
        { label: 'C', onClick: onClear, variant: 'operator' as const },
        { label: '√', onClick: onSqrt, variant: 'operator' as const },
        { label: '%', onClick: () => onOperationClick('percentage'), variant: 'operator' as const },
        { label: '÷', onClick: () => onOperationClick('divide'), variant: 'operator' as const },
        { label: '7', onClick: () => onNumberClick('7') },
        { label: '8', onClick: () => onNumberClick('8') },
        { label: '9', onClick: () => onNumberClick('9') },
        { label: '×', onClick: () => onOperationClick('multiply'), variant: 'operator' as const },
        { label: '4', onClick: () => onNumberClick('4') },
        { label: '5', onClick: () => onNumberClick('5') },
        { label: '6', onClick: () => onNumberClick('6') },
        { label: '-', onClick: () => onOperationClick('subtract'), variant: 'operator' as const },
        { label: '1', onClick: () => onNumberClick('1') },
        { label: '2', onClick: () => onNumberClick('2') },
        { label: '3', onClick: () => onNumberClick('3') },
        { label: '+', onClick: () => onOperationClick('add'), variant: 'operator' as const },
        { label: '0', onClick: () => onNumberClick('0'), span: 2 },
        { label: '.', onClick: onDecimal },
        { label: '=', onClick: onEquals, variant: 'equals' as const },
    ];

    return (
        <div className={styles.grid}>
            {buttons.map((btn, idx) => (
                <div
                    key={idx}
                    style={{ gridColumn: (btn as any).span ? `span ${(btn as any).span}` : 'span 1' }}
                >
                    <Button
                        label={btn.label}
                        onClick={btn.onClick}
                        disabled={isLoading}
                        variant={btn.variant}
                    />
                </div>
            ))}
        </div>
    );
};
