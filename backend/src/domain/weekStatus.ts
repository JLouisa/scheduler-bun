import * as helper from "./types";
import { NIL as NIL_UUID } from "uuid";

export class WeekStatusClass {
  constructor(
    public id: string,
    public weeklyId: string,
    public status: string | helper.WeekStatus
  ) {}
  static new(weeklyId: string, status: string): WeekStatusClass {
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
  clientIn(): WeekStatusClass {
    return new WeekStatusClass(
      this.id,
      this.weeklyId,
      helper.getWeekStatusStrToEnum(this.status as string)
    );
  }
  clientOut(): WeekStatusClass {
    return new WeekStatusClass(
      this.id,
      this.weeklyId,
      helper.getWeekStatusEnumToStr(this.status as helper.WeekStatus)
    );
  }
  static collection(): helper.WeekStatusCollection {
    return {
      weeklyIdNext: helper.createWeekID(-1),
      weeklyIdCurrent: helper.createWeekID(0),
      weeklyIdPrev1: helper.createWeekID(1),
      weeklyIdPrev2: helper.createWeekID(2),
      weeklyIdPrev3: helper.createWeekID(3),
    };
  }
}
