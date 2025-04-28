Task Manager - PHP, Ajax, Bootstrap
A simple and responsive web application for daily task management.
Built using PHP (OOP), MySQL, jQuery/Ajax, and Bootstrap.
Follows SOLID principles and best coding practices.

📋 Features
Add, edit, delete tasks.

Mark tasks as completed.

Ajax-based form submissions (no page reload).

Responsive design with Bootstrap.

Object-Oriented PHP backend.

MySQL database integration.

🛠️ Technologies Used
PHP 8+

MySQL

jQuery

Ajax

Bootstrap 5

🗂️ Project Structure
pgsql
Copiar
Editar
/config/        --> Database connection
/controllers/   --> Handle requests (create, update, delete tasks)
/models/        --> Task model (business logic)
/views/         --> HTML views (Bootstrap + jQuery)
/public/        --> CSS, JS and frontend assets
/sql/           --> Database export (database.sql)
📦 Setup Instructions
Clone the repository

bash
Copiar
Editar
git clone https://github.com/yourusername/task-manager-php-ajax-bootstrap.git
Import the Database

Open your database management tool (e.g., phpMyAdmin).

Create a new database called task_manager.

Import the file located at /sql/database.sql.

Configure the Database Connection

Open /config/Database.php.

Set your database host, username, and password.

Run the Application

Start your Apache server (e.g., XAMPP, WAMP).

Open http://localhost/task-manager-php-ajax-bootstrap/public/ in your browser.

✅ Requirements
PHP 8.0 or higher

MySQL 5.7 or higher

Apache/Nginx server

Composer (optional, for autoloading)

🤝 Contributing
Contributions are welcome! Feel free to open issues or submit pull requests to improve the project.

📄 License
This project is licensed under the MIT License.

📄 Comandos Uteis
    docker exec -it task-manager-php bash
        php Command.php migrate:up TaskMigration
        php Command.php migrate:down TaskMigration

🎯 Author
Developed by [Pontes].


