FROM python:3.10-slim-buster AS base


FROM base AS builder
WORKDIR /app
COPY requirements.txt .
RUN python3 -m venv /venv && \
    /venv/bin/pip install --upgrade pip && \
    /venv/bin/pip install -r requirements.txt


FROM base AS release
WORKDIR /app

COPY --from=builder /venv /venv
COPY ./src /app

ENV PATH="/venv/bin:$PATH"
ENV PYTHONPATH=/app

EXPOSE 8000


CMD ["python3", "app/main.py"]

