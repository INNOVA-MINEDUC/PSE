#!/bin/sh
set -e

# Use envsubst to replace variables in the template and output to config.js
# This will happen every time the container starts.
echo "Generating runtime configuration..."
envsubst < /usr/share/nginx/html/config.template.js > /usr/share/nginx/html/config.js

echo "Configuration generated:"
cat /usr/share/nginx/html/config.js

# Execute the original Nginx command
exec "$@"
