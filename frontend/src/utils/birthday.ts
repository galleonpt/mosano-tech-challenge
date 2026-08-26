import dayjs from "dayjs";
import "dayjs/locale/pt";
import "dayjs/locale/en";
import type { Visitor } from "../contexts/VisitorsContext";

export interface BirthdayInfo {
    nextAge: number;
    day: number;
    month: string;
}

export function getNextBirthdayInfo(visitor: Visitor): BirthdayInfo {
    const birthday = dayjs(visitor.birthday);
    const birthdayDay = birthday.get("date");
    const birthdayMonth = birthday.format("MMMM");
    const birthdayYear = birthday.get("year");

    const currentYear = dayjs().get("year");

    const nextAge = currentYear - birthdayYear + 1;

    return {
        nextAge,
        day: birthdayDay,
        month: birthdayMonth,
    };
}
