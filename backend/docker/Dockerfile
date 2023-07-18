FROM python:3.11-alpine

RUN adduser --disabled-password --home /app --shell /bin/bash app
USER app
WORKDIR /app
RUN mkdir /app/api

COPY requirements.txt ./
COPY api ./api

RUN pip install --no-cache-dir -r requirements.txt

WORKDIR /app/api

ENTRYPOINT ["/app/.local/bin/flask", "run", "--host=0.0.0.0"]

EXPOSE 5000
