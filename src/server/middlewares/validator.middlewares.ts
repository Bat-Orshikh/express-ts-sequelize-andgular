import { Response, Request, NextFunction } from "express";
import { check, validationResult, ValidationChain, query } from "express-validator";

export class Validator {
  static regex = {
    date: /([12]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01]))/
  };

  static checkNumberRules = (key: string): ValidationChain[] => {
    return [
      check(key, "cannot be blank").not().isEmpty(),
      check(key, `${key} must be integer`).isInt()
    ];
  };

  static hasQueryString = (key: string, regex: RegExp = null): ValidationChain[] => {
    const base = [
      query(key, "cannot be blank").not().isEmpty(),
      query(key, `${key} must be string`).isString()
    ];
    if (regex) base.push(query(key, "invalid format").matches(regex));

    return base;
  }

  static hasQueryInteger = (key: string): ValidationChain[] => {
    return [
      query(key, "cannot be blank").not().isEmpty(),
      query(key, `${key} must be integer`).isInt()
    ];
  }

  static validate = (req: Request, res: Response, next: NextFunction): Response | void => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors: { param: string; message: string }[] = [];
    errors.array().map(err => extractedErrors.push({ param: err.param, message: err.msg }));
    return res.status(400).json({
      "code": 400,
      "message": extractedErrors
    });
  };
}