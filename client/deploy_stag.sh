echo "Switching to branch master"
git checkout master

# Find the path to env-cmd using 'npm bin'
ENV_CMD_PATH="$(npm bin)/env-cmd"

echo "Building app..."
echo "ENV_CMD_PATH: $ENV_CMD_PATH"

if sudo $ENV_CMD_PATH -f .stag.env npm run build:webpack-stag; then
  echo "Build successful. Removing existing files in 'client' directory..."
  sudo rm -rf /var/www/laatulakki/stage/client/*

  echo "Deploying files to server"
  sudo scp -r dist/* ec2-user@52.51.192.51:/var/www/laatulakki/stage/client

  echo "Done"
else
  echo "Build failed. Deployment aborted."
fi

