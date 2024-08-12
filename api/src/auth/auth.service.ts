import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { SignInResponse } from './dto/singInResponse';
import { JwtPayload } from './types/jwtPayload.type';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<User | null> {
        // ユーザの取得(user情報 || null)
        const user = await this.userService.getUser(email);
        // パスワードの検証
        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        }
        return null;
    }

    async signIn(user: User): Promise<SignInResponse> {
        const payload: JwtPayload = { email: user.email, sub: user.id };
        return { accessToken: this.jwtService.sign(payload), user };
    }
}
