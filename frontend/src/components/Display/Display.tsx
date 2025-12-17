import styles from '@/components/Display/Display.module.css';

interface DisplayProps {
  value: string;
  error?: string;
}

export const Display: React.FC<DisplayProps> = ({ value, error }) => {
  return (
    <div className={styles.display}>
      <input
        type="text"
        className={styles.input}
        value={error || value}
        readOnly
        style={{ color: error ? '#ef4444' : 'inherit' }}
      />
    </div>
  );
};
