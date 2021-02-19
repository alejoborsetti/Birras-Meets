import { StringMap } from "@angular/compiler/src/compiler_facade_interface";

export interface JwtResponseI {
    dataUser:{
        id: number,
        name: string,
        email: string,
        accessToken: string,
        expiresIn: string
    }
}
