echo "Switching to branch master"
git checkout master

echo "Building app..."
sudo npm run Build

echo "Deploying files to server"
sudo scp -r build/* ec2-user@172.31.87.47:/var/www/laatulakki/client/


echo "Done!"