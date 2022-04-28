docker rm -f aws-cms/movies-svc

docker rmi aws-cms/movies-svc

docker image prune

docker volume prune

docker build -t aws-cms/movies-svc .
