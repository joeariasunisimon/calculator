import { describe, it, expect, beforeEach, vi, type Mocked } from 'vitest';
import axios from 'axios';
import { calculatorApi } from '@/services/calculatorApi';

// Mock axios with a factory to ensure create works at module load time
vi.mock('axios', async (importOriginal) => {
    const actual = await importOriginal<typeof axios>();
    const mockAxios = {
        ...actual,
        create: vi.fn(),
        get: vi.fn(),
        post: vi.fn(),
        isAxiosError: vi.fn(),
    };
    // Make create return the mock setup itself by default so apiClient works
    mockAxios.create.mockReturnValue(mockAxios as any);
    return {
        default: mockAxios,
    };
});

const mockedAxios = axios as unknown as Mocked<typeof axios>;

describe('Calculator API', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Ensure create returns the mock instance (redundant but safe)
        mockedAxios.create.mockReturnValue(mockedAxios);
        mockedAxios.isAxiosError.mockReturnValue(true);
    });

    it('should return health status', async () => {
        mockedAxios.get.mockResolvedValue({ status: 200 });

        const result = await calculatorApi.checkHealth();
        expect(result).toBe(true);
    });

    it('should handle calculate request', async () => {
        mockedAxios.post.mockResolvedValue({
            data: { result: 8, error: undefined },
        });

        const response = await calculatorApi.calculate({ operand1: 5, operand2: 3, operation: 'add' });
        expect(response.result).toBe(8);
    });

    it('should handle API errors gracefully', async () => {
        const error = new Error('Network error');
        (error as any).response = { data: { error: 'Backend error' } };
        mockedAxios.isAxiosError.mockReturnValue(true);
        mockedAxios.post.mockRejectedValue(error);

        const response = await calculatorApi.calculate({ operand1: 5, operand2: 3, operation: 'add' });
        expect(response.error).toBeDefined();
    });
});
