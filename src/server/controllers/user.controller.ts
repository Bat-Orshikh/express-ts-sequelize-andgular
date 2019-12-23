import { Response, Request } from "express";

export class UserController {

  constructor() { }

  public index(req: Request, res: Response) {
    return res.json({
      message: "Greetings from user controller"
    });
  }
}