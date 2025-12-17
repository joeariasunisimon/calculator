package domain

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
