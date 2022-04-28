docker rm -f aws-cms/payment-svc

docker rmi aws-cms/payment-svc

docker image prune

docker volume prune

docker build -t aws-cms/payment-svc .
