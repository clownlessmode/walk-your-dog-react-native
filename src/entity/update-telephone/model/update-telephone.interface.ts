import { Meta } from "@entity/users/model/meta.interface";
import { User } from "@entity/users/model/user.interface";

export interface UpdateTelephoneDto {
    telephone: string;
  }
  
  export interface UpdateTelephoneRo {
    DEVCODE: string;
  }

  export interface UpdateUserDto {
    telephone: string;
    code: string;
  }

  export interface UpdateUserRo {
    meta: Meta
  }