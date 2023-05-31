echo "Switching to branch master"
git checkout master

echo "Building prod app..."
sudo npm run build

echo "Deploying files to server"
sudo scp -r build/* ec2-user@52.51.192.51:/var/www/laatulakki/production/blog

echo "Done"
