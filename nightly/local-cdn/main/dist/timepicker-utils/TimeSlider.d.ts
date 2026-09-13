type HoursConfiguration = {
    minHour: number;
    maxHour: number;
    isTwelveHoursFormat: boolean;
};
type HourType = "hour0_23" | "hour1_24" | "hour0_11" | "hour1_12";
declare const getHours: (config: HoursConfiguration, max: number | undefined) => string[];
declare const getMinutes: (max: number | undefined, step: number) => string[];
declare const getSeconds: (max: number | undefined, step: number) => string[];
declare const getHoursConfigByFormat: (type: HourType) => HoursConfiguration;
declare const getTimeControlsByFormat: (formatArray: Array<{
    type: string;
}>, hoursConfig: HoursConfiguration) => boolean[];
export { getHours, getMinutes, getSeconds, getHoursConfigByFormat, getTimeControlsByFormat, };
export type { HourType, HoursConfiguration, };
