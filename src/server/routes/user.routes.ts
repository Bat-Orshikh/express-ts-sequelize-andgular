import { Router } from "express";
import { UserController } from '../controllers/user.controller';

export class UserRoutes {
  private router: Router;
  private userController: UserController;

  constructor() {
    this.router = Router();
    this.userController = new UserController();
  }

  public routes(): Router {
    this.router.get("/", this.userController.index);
    return this.router;
  }
}