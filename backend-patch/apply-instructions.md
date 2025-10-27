# How to apply these changes to your backend repo

1) Clone your backend repo locally (if not already):

   git clone https://github.com/ali-asghar-official/backend.git
   cd backend

2) Add the `server.example.js` contents into your repo:

- If you already have an entry file (`server.js`, `index.js`, or `app.js`) then:
  - Edit it to use `process.env.MONGODB_URI` instead of any hard-coded `mongodb://` or `mongodb+srv://` URL.
  - Use `process.env.PORT || 5000` for the port.
  - Add CORS middleware and use `ALLOWED_ORIGIN` if you want to restrict origins.

- If you don't have a clear entrypoint, copy `server.example.js` to `server.js` at the repo root.

3) Add `.env.example` to the backend root (copy the file provided), and DO NOT commit a .env file with real credentials.

4) Update `package.json` scripts to include a `start` script (see `package-scripts.txt`). Example:

  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo \"no tests\" && exit 0"
  }

5) Install missing packages (if not already installed):

   npm install express mongoose cors
   # optionally for dev
   npm install -D nodemon

6) Commit and push your changes to GitHub

   git add server.js .env.example package.json
   git commit -m "chore: prepare server for Railway/MongoDB Atlas (env-driven)"
   git push origin main

7) Deploy to Railway

- Sign in to Railway and create a new project -> Deploy from GitHub -> select this repo.
- In Railway project settings -> Variables, add:
  - MONGODB_URI = mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/yourdb?retryWrites=true&w=majority
  - PORT = 5000
  - ALLOWED_ORIGIN = https://<your-frontend>.vercel.app  (optional)
- Trigger deploy. Railway will use `npm start` to run your app.

8) Configure Frontend (Vercel)

- In your Vercel project settings (frontend), set environment variable:
  - REACT_APP_API_URL = https://<your-backend>.up.railway.app
- Redeploy the Vercel project.

9) Verify

- Visit `https://<your-backend>.up.railway.app/_health` to confirm backend is up.
- Visit your Vercel frontend URL and test product listing, product detail, add-to-cart, and payment endpoints.
- If you see CORS errors, set `ALLOWED_ORIGIN` to exactly your frontend URL.


If you'd like, I can now:
- Produce a Git patch (diff) specific to file names in your backend repo if you tell me the backend's entry file name (e.g. `server.js` or `index.js`).
- Or I can open and analyze your backend repo here (if you add it to the workspace) and create a precise PR/patch.
