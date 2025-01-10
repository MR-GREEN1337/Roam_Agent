.PHONY: frontend backend

backend:
	@echo "Starting backend"
	cd backend && poetry run uvicorn src.main:app --reload --port 8000 &

frontend:
	@echo "Starting frontend"
	cd frontend && npm run dev &