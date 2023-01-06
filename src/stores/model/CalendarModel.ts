import { makeAutoObservable } from 'mobx';
import { CalendarDTO, EventDTO } from '@constants/interfaces';

export class CalendarModel {
  dto: Partial<CalendarDTO>;

  constructor(dto: Partial<CalendarDTO>) {
    this.dto = dto;
    makeAutoObservable(this);
  }

  get id(): number {
    return this.dto.id;
  }

  get name(): string {
    return this.dto.name;
  }

  set name(name: string) {
    this.dto.name = name;
  }

  get color(): string {
    return this.dto.color;
  }

  set color(color: string) {
    this.dto.color = color;
  }

  get checkFlag(): boolean {
    return this.dto.checkFlag;
  }

  set checkFlag(value: boolean) {
    this.dto.checkFlag = value;
  }

  get mainFlag(): boolean {
    return this.dto.mainFlag;
  }

  get eventList(): EventDTO[] {
    return this.dto.eventList;
  }

  get modDate(): string {
    return this.dto.modDate;
  }

  get modUserId(): number {
    return this.dto.modUserId;
  }

  get regDate(): string {
    return this.dto.regDate;
  }

  get regUserId(): number {
    return this.dto.regUserId;
  }

  get type(): string {
    return this.dto.type;
  }

  get url(): string {
    return this.dto.url;
  }
}
