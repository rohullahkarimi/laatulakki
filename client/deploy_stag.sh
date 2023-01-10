echo "Switching to branch master"
git checkout master

echo "Building app..."
sudo npm run build:beta

echo "Deploying files to server"
sudo scp -r build/* ec2-user@23.23.248.65:/var/www/laatulakki/client


echo "Done"