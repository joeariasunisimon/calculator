package domain

import (
	"errors"
	"strings"
)

const (
	OperationAdd        = "add"
	OperationSubtract   = "subtract"
	OperationMultiply   = "multiply"
	OperationDivide     = "divide"
	OperationPower      = "power"
	OperationSquareRoot = "sqrt"
	OperationPercentage = "percentage"
)

type Calculation struct {
	Operand1  *float64
	Operand2  *float64
	Operation string
}

type CalculatorService interface {
	Add(a, b float64) float64
	Subtract(a, b float64) float64
	Multiply(a, b float64) float64
	Divide(a, b float64) (float64, error)
	Power(base, exponent float64) float64
	SquareRoot(a float64) (float64, error)
	Percentage(value, percent float64) float64
	Execute(Calculation) (float64, error)
}

func (c *Calculation) Validate() error {
	if strings.TrimSpace(c.Operation) == "" {
		return errors.New("operation is required")
	}

	needsTwo := map[string]bool{
		OperationAdd:        true,
		OperationSubtract:   true,
		OperationMultiply:   true,
		OperationDivide:     true,
		OperationPower:      true,
		OperationPercentage: true,
	}

	needsOne := map[string]bool{
		OperationSquareRoot: true,
	}

	switch {
	case needsTwo[c.Operation]:
		if c.Operand1 == nil || c.Operand2 == nil {
			return errors.New("both operand1 and operand2 are required for this operation")
		}

	case needsOne[c.Operation]:
		if c.Operand1 == nil {
			return errors.New("operand1 is required for this operation")
		}

		c.Operand2 = new(float64)

	default:
		return errors.New("unsupported operation")
	}

	return nil
}
