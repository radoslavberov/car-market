
# Glass - Real Estate App
## Setup Steps
1. Run `composer install` and `npm install` commands. Installs PHP & JS dependencies
2. Start a MySQL server
3. Create a `.env` file in the root directory following the `.env.example` file
	- This env file will contain both backend & frontend vars
4. Run `php artisan migrate` - Creates database table structure
5. Run `php artisan db:seed` - Fills database with seeder data
6. `php artisan serve` - Starts the Laravel server (http://127.0.0.1:8000)
7. `npm run dev` - Starts [React HMR](https://vitejs.dev/guide/features.html#hot-module-replacement) (hot reload) server.  (http://127.0.0.1:5173)
	- When the HMR (hot module replacement) React server is running, changes is the frontend code will be instantly reflected in the Laravel server, without the need to reload the page. This is helpful when developing.
	- If the HMR is **not** running, the Laravel server will use the compiled frontend code, located in `/public/build`, which is also used for production.

## Available Scripts (JS)

### `npm run dev`

Start a React HMR server using [Vite](https://vitejs.dev/).\
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### `npm run start-laravel`

Runs the Laravel server.\
The server will run on [http://localhost:8000](http://localhost:8000).
You will see any server errors in the console.

### `npm run build`

Builds the app for production to the `public` folder. This build will be used by the `app.blade.php` view.
It correctly bundles React in production mode and optimizes the build for the best performance.

Your app is ready to be deployed! :)
