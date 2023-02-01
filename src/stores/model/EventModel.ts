import { makeAutoObservable } from 'mobx';
import { DateTime } from 'luxon';
import { rrulestr, RRule, Options, RRuleSet } from 'rrule';
import { EventDTO, AlarmDTO, ExceptionDTO } from '@constants/interfaces';
import { isRRule, toISO } from '@/utils';

export class EventModel {
  dto: Partial<EventDTO>;
  regDate: string;

  constructor(dto: Partial<EventDTO>) {
    this.dto = dto;
    this.regDate = dto.regDate;
    makeAutoObservable(this);
  }

  get display(): 'block' {
    return 'block';
  }

  get id(): string {
    return this.dto.id?.toString();
  }

  get calId(): number {
    return this.dto.calId;
  }

  get calName(): string {
    return this.dto.calName;
  }

  get backgroundColor(): string {
    return this.dto.color || this.dto.calColor;
  }

  get color(): string {
    return this.dto.color;
  }

  set color(color: string) {
    this.dto.color = color;
  }

  get importance(): boolean {
    return this.dto.importance;
  }

  set importance(importance: boolean) {
    this.dto.importance = importance;
  }

  get title(): string {
    return this.dto.title;
  }

  set title(title: string) {
    this.dto.title = title;
  }

  get allDay(): boolean {
    return this.dto.allDay;
  }

  set allDay(allDay: boolean) {
    this.dto.allDay = allDay;
  }

  get start(): string {
    return this.dto.start;
  }

  get startDate(): DateTime {
    return DateTime.fromISO(this.dto.start);
  }

  set startDate(date: DateTime) {
    this.dto.start = toISO(date.toUTC());
  }

  get end(): string {
    return this.dto.end;
  }

  get endDate(): DateTime {
    return DateTime.fromISO(this.dto.end);
  }

  set endDate(date: DateTime) {
    this.dto.end = toISO(date.toUTC());
  }

  get modDate(): DateTime {
    return DateTime.fromISO(this.dto.modDate);
  }

  get modUserId(): number {
    return this.dto.modUserId;
  }

  // get regDate(): DateTime {
  //   return DateTime.fromISO(this.dto.regDate);
  // }

  get regUserId(): number {
    return this.dto.regUserId;
  }

  get rrule(): Partial<Options> {
    const rruleStr = rrulestr(this.dto.rrule);
    return this.dto.rrule
      ? isRRule(rruleStr)
        ? rruleStr.origOptions
        : (rruleStr as RRuleSet)._rrule[0].origOptions
      : undefined;
  }

  set rrule(rrule: Partial<Options>) {
    this.dto.rrule = new RRule(rrule).toString();
  }

  get rruleObj(): RRule | RRuleSet {
    return this.dto.rrule ? rrulestr(this.dto.rrule) : undefined;
  }

  get exceptionList(): ExceptionDTO[] {
    return this.dto.exceptionList;
  }

  get location(): string {
    return this.dto.location;
  }

  set location(location: string) {
    this.dto.location = location;
  }

  get description(): string {
    return this.dto.description;
  }

  set description(description: string) {
    this.dto.description = description;
  }

  get repeatEndDate(): DateTime {
    return this.rrule?.until ? DateTime.fromJSDate(this.rrule?.until) : undefined;
  }

  get repeatStartDate(): DateTime {
    return this.rrule?.dtstart ? DateTime.fromJSDate(this.rrule?.dtstart) : undefined;
  }

  get repeatgroupId(): number {
    return this.dto.repeatgroupId;
  }

  get participants(): any[] {
    return this.dto.participants;
  }

  get attachments(): any[] {
    return this.dto.attachments;
  }

  get notifications(): AlarmDTO[] {
    return this.dto.alarmList;
  }

  set notifications(notifications: AlarmDTO[]) {
    this.dto.alarmList = notifications;
  }

  get exDate(): DateTime {
    return DateTime.fromISO(this.dto.exDate);
  }

  set exDate(date: DateTime) {
    this.dto.exDate = toISO(date);
  }
}
