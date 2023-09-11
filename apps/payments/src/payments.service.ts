import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { PaymentsCreateChargeDto } from './dtos/payments-create-charge.dto';
import { ClientProxy } from '@nestjs/microservices';
import { NOTIFICATIONS_SERVICE } from '@app/common';

@Injectable()
export class PaymentsService {
    private readonly stripe: Stripe;

    constructor(
        private readonly configService: ConfigService,
        @Inject(NOTIFICATIONS_SERVICE)
        private readonly notificationsService: ClientProxy
    ) {
        this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_API_KEY'), {
            apiVersion: '2022-11-15'
        });
    }
    
    async createCharge({ card, amount, email }: PaymentsCreateChargeDto) {
        const paymentMethod = await this.stripe.paymentMethods.create({
            type: 'card',
            card
        });

        const payment = await this.stripe.paymentIntents.create({
            payment_method: paymentMethod.id,
            confirm: true,
            amount: amount * 100,
            currency: 'brl',
            payment_method_types: ['card']
        });

        this.notificationsService.emit('notify_email', {
            email,
            text: `Your payment of $${amount} was completed successfully.`
        });

        return payment;
    }
}
