import styles from '@/components/Button/Button.module.css';

interface ButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    variant?: 'default' | 'operator' | 'equals';
}

export const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled = false,
    variant = 'default',
}) => {
    return (
        <button
            className={`${styles.button} ${styles[variant]}`}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
};
