import { IsNotEmpty, IsNotEmptyObject, IsNumber, ValidateNested } from "class-validator";
import { CardDto } from "./card.dto";
import { Type } from "class-transformer";

export class CreateChargeDto {
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CardDto)
    card: CardDto;

    @IsNumber()
    @IsNotEmpty()
    amount: number;
}
