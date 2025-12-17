package types

import "github.com/joeariasunisimon/calculator-app/backend/internal/domain"

type HealthResponse struct {
	Status string `json:"status"`
}

type CalculateRequest struct {
	Operand1  *float64 `json:"operand1"`
	Operand2  *float64 `json:"operand2"`
	Operation string   `json:"operation"`
}

func (r *CalculateRequest) ToCalculation() domain.Calculation {
	return domain.Calculation{
		Operation: r.Operation,
		Operand1:  r.Operand1,
		Operand2:  r.Operand2,
	}
}

type CalculateResponse struct {
	Result float64 `json:"result"`
	Error  string  `json:"error,omitempty"`
}
