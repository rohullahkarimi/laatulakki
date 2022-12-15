echo "Switching to branch master"
git checkout master

echo "Building admin app..."
sudo npm run build

echo "Deploying admin files to server"
sudo scp -r build/* ec2-user@23.23.248.65:/var/www/laatulakki/admin_dashboard


echo "Done"