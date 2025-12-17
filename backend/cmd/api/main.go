package main

import (
	"context"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/joeariasunisimon/calculator-app/backend/internal/handler"
	"github.com/joeariasunisimon/calculator-app/backend/internal/middleware"
	"github.com/joeariasunisimon/calculator-app/backend/internal/service"
)

func main() {
	slog.Info("Starting API server...")

	calculatorService := service.NewCalculatorService()

	calculatorHandler := handler.NewCalculatorHandler(calculatorService)

	mux := http.NewServeMux()

	mux.HandleFunc("GET /api/v1/health", handler.HealthHandler)
	mux.HandleFunc("POST /api/v1/calculate", calculatorHandler.ProcessOperation)

	// Wrap the mux with middleware
	handlerWithMiddleware := middleware.CORS(middleware.Logger(mux))

	server := &http.Server{
		Addr:    ":3000",
		Handler: handlerWithMiddleware,
	}

	go func() {
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			slog.Error("server error", "err", err)
			os.Exit(1)
		}
	}()

	slog.Info("API server is running on port 3000")

	// graceful shutdown
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt, syscall.SIGTERM)
	<-stop

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := server.Shutdown(ctx); err != nil {
		slog.Error("shutdown error", "err", err)
	}
	slog.Info("server stopped")
}
