import * as helper from "./types";
import { NIL as NIL_UUID } from "uuid";

export class WeekStatusClass {
  constructor(
    public id: string,
    public weeklyId: string,
    public status: string | helper.WeekStatus
  ) {}
  static clientIn(
    id: string,
    weeklyId: string,
    status: string
  ): WeekStatusClass {
    return new WeekStatusClass(
      NIL_UUID,
      weeklyId,
      helper.getWeekStatusStrToEnum(status)
    );
  }
  dbOut(): WeekStatusClass {
    return new WeekStatusClass(
      this.id,
      this.weeklyId,
      helper.getWeekStatusStrToEnum(this.status as string)
    );
  }
  dbIn(): WeekStatusClass {
    return new WeekStatusClass(
      this.id,
      this.weeklyId,
      helper.getWeekStatusEnumToStr(this.status as helper.WeekStatus)
    );
  }
  clientOut(): WeekStatusClass {
    return new WeekStatusClass(
      this.id,
      this.weeklyId,
      helper.getWeekStatusEnumToStr(this.status as helper.WeekStatus)
    );
  }
}
