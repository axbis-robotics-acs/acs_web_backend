// status-event.service.ts
import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class StatusEventService {
  private readonly subject = new Subject<any>();

  get stream$() {
    return this.subject.asObservable();
  }

  push(data: any) {
    this.subject.next(data);
  }
}
