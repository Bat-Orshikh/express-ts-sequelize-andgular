import { Router } from "express";
import { UserRoutes } from "./user.routes";

export class Routers {
  private router: Router;
  private userRoutes: UserRoutes;

  constructor() {
    this.router = Router();
    this.userRoutes = new UserRoutes();
  }

  public routes(): Router {
    this.router.use("/user", this.userRoutes.routes());

    return this.router;
  }
}