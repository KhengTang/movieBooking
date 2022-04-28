docker rm -f aws-cms/catalog-svc

docker rmi aws-cms/catalog-svc

docker image prune

docker volume prune

docker build -t aws-cms/catalog-svc .
