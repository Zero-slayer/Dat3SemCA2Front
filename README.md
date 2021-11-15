# CPH_Skabelon_Front  

Use npm ci instead of npm install to build node modules as npm install may mutate package-lock.json

Change the URL variable in apiFacade to target your backend

Run "npm run build" to create the build folder.

Send the contents of your build folder to your droplet with "scp -r ./* user@x.x.x.x:/path/to/destination"
