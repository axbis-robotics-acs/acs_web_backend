// status.controller.ts
import { Controller, Sse, MessageEvent } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { StatusEventService } from './status.service';
import { Observable } from 'rxjs';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusEventService) {}

  // @Sse('stream')
  // stream(): Observable<MessageEvent> {
  //   return this.statusService.stream$.pipe(
  //     map((data) => ({ data })),
  //   );
  // }
}
