docker rm -f aws-cms/booking-svc

docker rmi aws-cms/booking-svc

docker image prune

docker volume prune

docker build -t aws-cms/booking-svc .
