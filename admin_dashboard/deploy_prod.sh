echo "Switching to branch master"
git checkout master

echo "Building app..."
if sudo npm run build:webpack-prod; then
  echo "Build successful. Removing existing files in 'client' directory..."
  sudo rm -rf /var/www/laatulakki/production/admin_dashboard/*

  echo "Deploying files to server"
  sudo scp -r dist/* ec2-user@52.51.192.51:/var/www/laatulakki/production/admin_dashboard

  echo "Done"
else
  echo "Build failed. Deployment aborted."
fi