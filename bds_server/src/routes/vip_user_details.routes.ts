import { Router } from "express";
import vipUserDetailsControllers from "~/controllers/vip_user_detail_controller";
import commonMiddlewares from "~/middlewares/common.middleware";

const vipUserDetails = Router();

/**
 * description: Get vip user details by user id
 * 
 */