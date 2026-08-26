import type { Visitor } from "../contexts/VisitorsContext";

export function getFullName({ name, surname }: Visitor): string {
    return `${name} ${surname}`;
}
