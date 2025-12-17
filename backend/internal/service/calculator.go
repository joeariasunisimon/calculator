package service

import (
	"errors"
	"math"

	"github.com/joeariasunisimon/calculator-app/backend/internal/domain"
)

type service struct{}

func NewCalculatorService() domain.CalculatorService {
	return &service{}
}

// Add returns the sum of two numbers
func (cs *service) Add(a, b float64) float64 {
	return a + b
}

// Subtract returns the difference of two numbers
func (cs *service) Subtract(a, b float64) float64 {
	return a - b
}

// Multiply returns the product of two numbers
func (cs *service) Multiply(a, b float64) float64 {
	return a * b
}

// Divide returns the quotient of two numbers
func (cs *service) Divide(a, b float64) (float64, error) {
	if b == 0 {
		return 0, errors.New("division by zero")
	}
	return a / b, nil
}

// Power returns base raised to the power of exponent
func (cs *service) Power(base, exponent float64) float64 {
	return math.Pow(base, exponent)
}

// SquareRoot returns the square root of a number
func (cs *service) SquareRoot(a float64) (float64, error) {
	if a < 0 {
		return 0, errors.New("cannot calculate square root of negative number")
	}
	return math.Sqrt(a), nil
}

// Percentage returns the percentage of a value
func (cs *service) Percentage(value, percent float64) float64 {
	return (value * percent) / 100
}

func (cs *service) Execute(cal domain.Calculation) (float64, error) {
	switch cal.Operation {
	case domain.OperationAdd:
		return cs.Add(*cal.Operand1, *cal.Operand2), nil
	case domain.OperationSubtract:
		return cs.Subtract(*cal.Operand1, *cal.Operand2), nil
	case domain.OperationMultiply:
		return cs.Multiply(*cal.Operand1, *cal.Operand2), nil
	case domain.OperationDivide:
		return cs.Divide(*cal.Operand1, *cal.Operand2)
	case domain.OperationPower:
		return cs.Power(*cal.Operand1, *cal.Operand2), nil
	case domain.OperationSquareRoot:
		return cs.SquareRoot(*cal.Operand1)
	case domain.OperationPercentage:
		return cs.Percentage(*cal.Operand1, *cal.Operand2), nil
	default:
		return 0, errors.New("unknown operation")
	}
}
