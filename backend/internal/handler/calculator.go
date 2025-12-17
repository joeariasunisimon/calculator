package handler

import (
	"encoding/json"
	"net/http"

	"github.com/joeariasunisimon/calculator-app/backend/internal/domain"
	"github.com/joeariasunisimon/calculator-app/backend/pkg/types"
)

type CalculatorHandler struct {
	service domain.CalculatorService
}

func NewCalculatorHandler(service domain.CalculatorService) *CalculatorHandler {
	return &CalculatorHandler{service: service}
}

func (h *CalculatorHandler) ProcessOperation(w http.ResponseWriter, r *http.Request) {
	var req types.CalculateRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, types.CalculateResponse{
			Error: "Invalid request payload",
		})

		return
	}

	result, err := h.service.Execute(domain.Calculation{})
	if err != nil {
		writeJSON(w, http.StatusUnprocessableEntity, types.CalculateResponse{
			Error: err.Error(),
		})

		return
	}

	writeJSON(w, http.StatusOK, types.CalculateResponse{
		Result: result,
	})
}
