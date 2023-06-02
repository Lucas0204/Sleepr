import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateChargeDto } from './dtos/create-charge.dto';

@Injectable()
export class PaymentsService {
    private readonly stripe: Stripe;

    constructor(private readonly configService: ConfigService) {
        this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_API_KEY'), {
            apiVersion: '2022-11-15'
        });
    }
    
    async createCharge({ card, amount }: CreateChargeDto) {
        const paymentMethod = await this.stripe.paymentMethods.create({
            type: 'card',
            card
        });

        await this.stripe.paymentIntents.create({
            payment_method: paymentMethod.id,
            confirm: true,
            amount: amount * 100,
            currency: 'brl',
            payment_method_types: ['card']
        });
    }
}
