import type { Request, Response } from "express";
import { listResponse, singleResponse } from "../../utils/index.js";
import { userService } from "./user.service.js";

export const userController = {
  async create(req: Request, res: Response) {
    res.status(201).json(singleResponse(await userService.create(req.body)));
  },
  async list(_req: Request, res: Response) {
    const users = await userService.list();
    res.json(listResponse(users));
  },
  async get(req: Request, res: Response) {
    res.json(singleResponse(await userService.get(String(req.params.id))));
  },
  async update(req: Request, res: Response) {
    res.json(singleResponse(await userService.update(String(req.params.id), req.body)));
  },
  async delete(req: Request, res: Response) {
    await userService.delete(String(req.params.id));
    res.status(204).send();
  },
  async me(req: Request, res: Response) {
    const identity = req.firebaseUser!;
    res.json(singleResponse(await userService.upsertFirebase({ firebaseUid: identity.uid, email: identity.email, name: identity.name })));
  },
};
