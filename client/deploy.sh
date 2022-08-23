echo "Switching to branch master"
git checkout master

echo "Building app..."
npm run Build

echo "Deploying files to server"
scp -r build/* ec2-user@172.31.87.47:/var/www/laatulakki/client/


echo "Done!"