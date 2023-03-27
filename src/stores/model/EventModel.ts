import { makeAutoObservable } from 'mobx';
import { DateTime } from 'luxon';
import { rrulestr, RRule, Options, RRuleSet } from 'rrule';
import { EventDTO, EventMember, ExceptionDTO } from '@constants/interfaces';
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

  get roomId(): number {
    return this.dto.roomId;
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
    return this.dto.rrule
      ? isRRule(rrulestr(this.dto.rrule))
        ? rrulestr(this.dto.rrule).origOptions
        : (rrulestr(this.dto.rrule) as RRuleSet)._rrule[0].origOptions
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
    return this.dto.repeatEndDate ? DateTime.fromISO(this.dto.repeatEndDate) : undefined;
  }

  set repeatEndDate(date: DateTime) {
    this.dto.repeatEndDate = date ? toISO(date.toUTC()) : undefined;
  }

  get repeatStartDate(): DateTime {
    return this.dto.repeatStartDate ? DateTime.fromISO(this.dto.repeatStartDate) : undefined;
  }

  set repeatStartDate(date: DateTime) {
    this.dto.repeatStartDate = date ? toISO(date.toUTC()) : undefined;
  }

  get repeatgroupId(): number {
    return this.dto.repeatgroupId;
  }

  get eventMember(): EventMember {
    return this.dto.eventMember;
  }

  set eventMember(eventMember: EventMember) {
    this.dto.eventMember = {
      personaList: eventMember ? eventMember.personaList : [],
      roomList: eventMember ? eventMember.roomList : [],
    };
  }

  get attachments(): any[] {
    return this.dto.attachments;
  }

  get notifications(): string[] {
    return this.dto.alarmList;
  }

  set notifications(notifications: string[]) {
    this.dto.alarmList = notifications;
  }

  get exDate(): DateTime {
    return DateTime.fromISO(this.dto.exDate);
  }

  set exDate(date: DateTime) {
    this.dto.exDate = toISO(date);
  }

  get exceptionEvent(): boolean {
    return this.dto.exceptionEvent;
  }

  set subEvent(subEvent: boolean) {
    this.dto.subEvent = subEvent;
  }

  get subEvent(): boolean {
    return this.dto.subEvent;
  }
}
