import Statistic from "./Statistic";

export default interface Location {
    id: string
    name: string
    open: boolean
    lastUpdated: number
    stats: { [key: string]: Statistic }
}
