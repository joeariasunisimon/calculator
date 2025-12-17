package handler

import (
	"encoding/json"
	"net/http"

	"github.com/joeariasunisimon/calculator-app/backend/pkg/types"
)

func HealthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	_ = json.NewEncoder(w).Encode(types.HealthResponse{Status: "ok"})
}
