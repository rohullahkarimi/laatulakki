echo "Switching to branch master"
git checkout master

echo "Building app..."
if sudo npm run build:webpack-stag --clear-cache; then
  echo "Build successful. Removing existing files in 'client' directory..."
  sudo rm -rf /var/www/laatulakki/stage/client/*

  echo "Deploying files to server"
  sudo scp -r dist/* ec2-user@52.51.192.51:/var/www/laatulakki/stage/client

  echo "Done"
else
  echo "Build failed. Deployment aborted."
fi

