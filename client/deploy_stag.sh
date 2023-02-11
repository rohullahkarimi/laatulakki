echo "Switching to branch master"
git checkout master

echo "Building app..."
sudo npm run build:beta

echo "Deploying files to server"
sudo scp -r build/* ec2-user@52.51.192.51:/var/www/laatulakki/stage/client


echo "Done"