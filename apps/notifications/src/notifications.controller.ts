import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotifyEmailDto } from './dtos/notify-email.dto';

@Controller()
export class NotificationsController {
  	constructor(private readonly notificationsService: NotificationsService) {}

	@UsePipes(new ValidationPipe())
	@EventPattern('notify_email')
	async notifyEmail(@Payload() data: NotifyEmailDto) {
		await this.notificationsService.notifyEmail({
			email: data.email,
			text: data.text
		});
	}
}
