import { IsCreditCard, IsNotEmpty, IsNumber } from "class-validator";

export class CardDto {
    @IsNumber()
    @IsNotEmpty()
    cvc: string;

    @IsNumber()
    @IsNotEmpty()
    exp_month: number;

    @IsNumber()
    @IsNotEmpty()
    exp_year: number;

    @IsCreditCard()
    number: string;
}
