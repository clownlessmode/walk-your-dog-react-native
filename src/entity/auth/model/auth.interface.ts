import { Role } from "@entity/users/model/role.enum";
import { User } from "@entity/users/model/user.interface";

export interface PreAuthDto {
  telephone: string;
}

export interface PreAuthRo {
  isRegistered: boolean;
  code: boolean;
  DEVCODE: string;
}

export interface VerifyCodeDto {
  telephone: string;
  code: string;
}

export interface VerifyCodeRo {
  user: User | null;
  accessToken: string;
}

export interface SignUpDto {
  image: any;
  name: string;
  telephone: string;
  email: string;
  city: string;
  role: Role;
  promocode: string | null
}

export interface SignUpRo {
  user: User;
  accessToken: string;
}
