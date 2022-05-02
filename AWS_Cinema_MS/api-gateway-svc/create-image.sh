docker rm -f aws-cms/apigateway-svc

docker rmi aws-cms/apigateway-svc

docker image prune

docker volume prune

docker build -t aws-cms/apigateway-svc .
