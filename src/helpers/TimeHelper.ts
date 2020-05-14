import * as moment from 'moment'
import { extendMoment } from 'moment-range'
import ITimeOptions from '../interfaces/ITimeOptions'
import ITimeRangeOptions from '../interfaces/ITimeRangeOptions'

class TimeHelper {
  public static withinRange (options: ITimeOptions) {
    const momentRange = extendMoment(moment)
    const format = options.format || 'hh:mm:ss'

    const time = momentRange(options.time, format)
    const startTime = momentRange(options.startTime, format)
    const endTime = momentRange(options.endTime, format)

    const range = momentRange.range(startTime, endTime)

    return time.within(range)
  }

  public static overlapsRanges (range1: ITimeRangeOptions, range2: ITimeRangeOptions) {
    const momentRange = extendMoment(moment)

    const format1 = range1.format || 'hh:mm:ss'
    const format2 = range2.format || 'hh:mm:ss'

    const startTime1 = momentRange(range1.startTime, format1)
    const endTime1 = momentRange(range1.endTime, format1)

    const startTime2 = momentRange(range2.startTime, format2)
    const endTime2 = momentRange(range2.endTime, format2)

    const timeRange1 = momentRange.range(startTime1, endTime1)
    const timeRange2 = momentRange.range(startTime2, endTime2)

    return timeRange1.overlaps(timeRange2)
  }
}

export default TimeHelper
