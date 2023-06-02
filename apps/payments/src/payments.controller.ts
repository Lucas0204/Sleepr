import { Controller, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateChargeDto } from './dtos/create-charge.dto';

@Controller()
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) {}

    @MessagePattern()
    async createCharge(@Payload() data: CreateChargeDto) {
        return this.paymentsService.createCharge(data);
    }
}
