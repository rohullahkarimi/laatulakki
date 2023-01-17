echo "Switching to branch master"
git checkout master

echo "Building admin stage app..."
sudo npm run build:beta

echo "Deploying admin stage files to server"
sudo scp -r build/* ec2-user@23.23.248.65:/var/www/laatulakki/stage/admin_dashboard


echo "Done"