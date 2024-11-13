import { Role } from "@entity/users/model/role.enum";
import { User } from "@entity/users/model/user.interface";

export interface PreAuthDto {
  telephone: string;
  worker?: boolean
}

export interface PreAuthRo {
  isRegistered: boolean;
  code: boolean;
  DEVCODE: string;
  workerAllowed: boolean;
}

export interface VerifyCodeDto {
  telephone: string;
  code: string;
  worker?: boolean;
}

export interface VerifyCodeRo {
  user: User | null;
  accessToken: string;
  isRegistered: boolean;
}

export interface SignUpDto {
  image: any;
  name: string;
  telephone: string;
  email: string;
  city: string;
  role: Role;
  promocode: string | null;
  start?: string;
  end?: string;
  days?: string;
  petTypes?: string[];
  services?: string[]
}

export interface SignUpRo {
  user: User;
  accessToken: string;
}
