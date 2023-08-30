echo "Switching to branch master"
git checkout master

# Find the path to env-cmd using 'which env-cmd' and replace '/path/to/env-cmd' with the actual path
ENV_CMD_PATH=$(which env-cmd)

echo "Building app..."
if sudo $ENV_CMD_PATH -f .stag.env npm run build:webpack-stag; then
  echo "Build successful. Removing existing files in 'client' directory..."
  sudo rm -rf /var/www/laatulakki/stage/client/*

  echo "Deploying files to server"
  sudo scp -r dist/* ec2-user@52.51.192.51:/var/www/laatulakki/stage/client

  echo "Done"
else
  echo "Build failed. Deployment aborted."
fi

