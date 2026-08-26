import type { FC } from "react";
import type { Visitor } from "../contexts/VisitorsContext";
import { getNextBirthdayInfo } from "../utils/birthday";

interface BirthdayGreetingProps {
    visitor: Visitor | null;
}

export const BirthdayGreeting: FC<BirthdayGreetingProps> = ({ visitor }) => {
    if (!visitor) {
        return null;
    }

    const { day, month, nextAge } = getNextBirthdayInfo(visitor);

    return (
        <div
            style={{
                padding: "16px",
                backgroundColor: "#d9eaf5",
                border: "1px solid #9bdcff",
                borderRadius: "4px",
                marginTop: "16px",
                color: "#0065a0",
            }}
        >
            {`Dia: ${day}, mes: ${month}, proxima idade: ${nextAge}`}
        </div>
    );
};
