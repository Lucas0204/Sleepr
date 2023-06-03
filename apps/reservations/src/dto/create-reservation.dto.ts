import { CreateChargeDto } from "@app/common";
import { Type } from "class-transformer";
import { IsDate, IsString, IsNotEmpty, IsNotEmptyObject, ValidateNested } from "class-validator";

export class CreateReservationDto {
    @IsDate()
    @Type(() => Date)
    startDate: Date;

    @IsDate()
    @Type(() => Date)
    endDate: Date;

    @IsString()
    @IsNotEmpty()
    placeId: string;

    @IsString()
    @IsNotEmpty()
    invoiceId: string;

    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreateChargeDto)
    charge: CreateChargeDto;
}
