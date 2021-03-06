DOCKER_REPO_NAME ?=
DOCKER_CONTAINER_NAME ?= mutual-clouds
DOCKER_IMAGE_NAME ?= ${DOCKER_REPO_NAME}${DOCKER_CONTAINER_NAME}

# Build the Docker image for this project
build:
	docker build -t ${DOCKER_IMAGE_NAME} .
	docker create --name=${DOCKER_CONTAINER_NAME} ${DOCKER_CONTAINER_NAME}:latest
	docker cp ${DOCKER_CONTAINER_NAME}:/app/ui/static/js/index.js ./app/ui/static/js/index.js
	docker rm ${DOCKER_CONTAINER_NAME}

# Run the services associated with the Django application
run:
	docker-compose up

# Stop all services associated with the Django application
down:
	docker-compose down
