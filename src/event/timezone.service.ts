import { Injectable } from '@nestjs/common';
import * as moment from 'moment-timezone';

@Injectable()
export class TimezoneService {
  convertToUTC(dateTime: string, timezone: string): Date {
    return moment.tz(dateTime, timezone).utc().toDate();
  }

  convertFromUTC(utcDate: Date, toTimezone: string): string {
    return moment.utc(utcDate).tz(toTimezone).format();
  }

  formatForDisplay(date: Date, timezone: string, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
    return moment.utc(date).tz(timezone).format(format);
  }

  isValidTimezone(timezone: string): boolean {
    return moment.tz.zone(timezone) !== null;
  }

  getAvailableTimezones(): string[] {
    return moment.tz.names();
  }
}