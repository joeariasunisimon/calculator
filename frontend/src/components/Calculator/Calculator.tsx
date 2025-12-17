import { useCalculator } from '@/hooks/useCalculator';
import { Display } from '@/components/Display/Display';
import { ButtonGrid } from '@/components/ButtonGrid/ButtonGrid';
import styles from '@/components/Calculator/Calculator.module.css';

export const Calculator: React.FC = () => {
    const calculator = useCalculator();

    return (
        <div className={styles.calculator}>
            <h1 className={styles.title}>Calculator</h1>
            <Display value={calculator.display} error={calculator.error || undefined} />
            <ButtonGrid
                onNumberClick={calculator.handleNumberClick}
                onOperationClick={calculator.handleOperation}
                onEquals={calculator.handleEquals}
                onClear={calculator.handleClear}
                onDecimal={calculator.handleDecimal}
                onSqrt={calculator.handleSqrt}
                isLoading={calculator.isLoading}
            />
            {calculator.error && (
                <div className={styles.errorMessage}>{calculator.error}</div>
            )}
        </div>
    );
};
