package service_test

import (
	"math"
	"testing"

	"github.com/joeariasunisimon/calculator-app/backend/internal/domain"
	"github.com/joeariasunisimon/calculator-app/backend/internal/service"
)

// helper func to compare float64 values
func floatEq(a, b float64) bool {
	return math.Abs(a-b) < 1e-9
}

func TestBinaryOperations(t *testing.T) {
	csVal := service.NewCalculatorService()
	cs := csVal

	tests := []struct {
		name     string
		a, b     float64
		expected float64
		op       func(domain.CalculatorService, float64, float64) float64
	}{
		{"Add", 1, 2, 3, func(s domain.CalculatorService, a, b float64) float64 { return s.Add(a, b) }},
		{"Subtract", 5, 3, 2, func(s domain.CalculatorService, a, b float64) float64 { return s.Subtract(a, b) }},
		{"Multiply", 4, 2.5, 10, func(s domain.CalculatorService, a, b float64) float64 { return s.Multiply(a, b) }},
		{"Power", 2, 3, 8, func(s domain.CalculatorService, a, b float64) float64 { return s.Power(a, b) }},
		{"Percentage", 200, 10, 20, func(s domain.CalculatorService, a, b float64) float64 { return s.Percentage(a, b) }},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			got := tc.op(cs, tc.a, tc.b)
			if !floatEq(got, tc.expected) {
				t.Fatalf("%s(%v, %v) = %v; want %v", tc.name, tc.a, tc.b, got, tc.expected)
			}
		})
	}
}

func TestDivide(t *testing.T) {
	csVal := service.NewCalculatorService()
	cs := csVal

	t.Run("Divide success", func(t *testing.T) {
		got, err := cs.Divide(10, 2)
		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}
		if !floatEq(got, 5) {
			t.Fatalf("Divide(10,2) = %v; want 5", got)
		}
	})

	t.Run("Divide by zero", func(t *testing.T) {
		if _, err := cs.Divide(1, 0); err == nil {
			t.Fatalf("Divide(1,0) expected error; got nil")
		}
	})
}

func TestSquareRoot(t *testing.T) {
	csVal := service.NewCalculatorService()
	cs := csVal

	t.Run("Sqrt positive", func(t *testing.T) {
		got, err := cs.SquareRoot(9)
		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}
		if !floatEq(got, 3) {
			t.Fatalf("SquareRoot(9) = %v; want 3", got)
		}
	})

	t.Run("Sqrt negative", func(t *testing.T) {
		if _, err := cs.SquareRoot(-4); err == nil {
			t.Fatalf("SquareRoot(-4) expected error; got nil")
		}
	})
}

func TestExecute_TableDriven(t *testing.T) {
	csVal := service.NewCalculatorService()
	cs := csVal

	tests := []struct {
		name      string
		operation string
		operands  []float64
		want      float64
		expectErr bool
	}{
		{"add", domain.OperationAdd, []float64{3, 4}, 7, false},
		{"subtract", domain.OperationSubtract, []float64{10, 4}, 6, false},
		{"multiply", domain.OperationMultiply, []float64{2, 3}, 6, false},
		{"divide", domain.OperationDivide, []float64{10, 2}, 5, false},
		{"divide_by_zero", domain.OperationDivide, []float64{1, 0}, 0, true},
		{"power", domain.OperationPower, []float64{2, 3}, 8, false},
		{"sqrt", domain.OperationSquareRoot, []float64{16}, 4, false},
		{"sqrt_negative", domain.OperationSquareRoot, []float64{-1}, 0, true},
		{"percentage", domain.OperationPercentage, []float64{200, 10}, 20, false},
		{"unknown", "foo", nil, 0, true},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			calc := domain.Calculation{
				Operation: tc.operation,
			}

			if len(tc.operands) > 0 {
				calc.Operand1 = &tc.operands[0]
			}
			if len(tc.operands) > 1 {
				calc.Operand2 = &tc.operands[1]
			}

			got, err := cs.Execute(calc)

			if tc.expectErr {
				if err == nil {
					t.Fatalf("Execute(%q, %v) expected error; got nil (got=%v)", tc.operation, tc.operands, got)
				}
				return
			}

			if err != nil {
				t.Fatalf("Execute(%q) unexpected error: %v", tc.operation, err)
			}
			if !floatEq(got, tc.want) {
				t.Fatalf("Execute(%q, %v) = %v; want %v", tc.operation, tc.operands, got, tc.want)
			}
		})
	}
}
