const express = require("express");
const User = require("./models/user.model.js");
const Article = require("./models/article.model.js");
const Comment = require("./models/comment.model.js");
const database = require("./dao/db/database.js");
const userRoutes = require("./routes/user.routes.js");
const articleRoutes = require("./routes/article.routes.js");
const commentRoutes = require("./routes/comment.routes.js");
const authRoutes = require("./routes/auth.routes.js");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser");
const authenticate = require("./middlewares/authMiddleware.js");
const isAdmin = require("./middlewares/isAdminMiddleware.js");

class Server {
  constructor(port = 4000) {
    this.port = port;
    this.app = express();
    this.config();
    this.routes();
    
  }

  async config() {
      this.app.use(express.json());
      this.app.use(bodyParser.json());
      this.app.use(cookieParser());
      await database.syncModels({ alter: true });
      // Call the function to create the admin user
      await this.createAdminUser();
  }

  routes() {
    // routes
    this.app.use("/users", authenticate ,userRoutes); // gestion des permissions
    this.app.use("/articles", authenticate, isAdmin ,articleRoutes);
    this.app.use("/comments",commentRoutes);
    this.app.use("/auth", authRoutes);
  }


  async createAdminUser() {
    // Check if the admin user already exists
    const adminUser = await User.findOne({ where: { username: 'admin' } });
    if (!adminUser) {
        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash('admin', 10);

        // Create the admin user
        await User.create({
            username: 'admin',
            email: 'admin@gmail.com',
            password: hashedPassword,
            type: 'admin'
        });
        console.log('Admin user created successfully.');
    }
}

  start() {
    this.app.listen(this.port, (err) => {
      if (err) {
        console.log(`error : ${err}`);
        return;
      }
      console.log("Server is connecting on " + this.port);
    });
  }
}

module.exports = Server;
