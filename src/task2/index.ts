
export type Slot = [string, string];
export type Schedule = Slot[];

export function convertToMinutes(time: string) {
  const [hours, minutes] = time.split(':');
  return (Number(hours) * 60) + Number(minutes);
}

export function getSlotLength(slot: Slot) {
  return convertToMinutes(slot[1]) - convertToMinutes(slot[0]);
}

export function findSlotsForSchedule(schedule: Schedule, durationMinutes: number) : Schedule {
  const startOfWorkingDay = '09:00';
  const endOfWorkingDay = '19:00';

  const slots: Schedule = [];

  for (let i = 0; i < schedule.length; i++) {
    const thisMeeting = schedule[i];
    const nextMeeting = schedule[i+1];
  
    if (i === 0 && thisMeeting[0] != startOfWorkingDay) {
      const firstSlot: Slot = [startOfWorkingDay, thisMeeting[0]];
      if (getSlotLength(firstSlot) >= durationMinutes) slots.push(firstSlot);
    }
  
    if (nextMeeting) {
        const thisMeetingEnd = thisMeeting[1];
        const nextMeetingStart = nextMeeting[0];
        const newSlot: Slot = [thisMeetingEnd, nextMeetingStart];
        if (getSlotLength(newSlot) >= durationMinutes) slots.push(newSlot);
    }

    if (i === schedule.length - 1 && thisMeeting[1] !== endOfWorkingDay) {
      const lastSlot: Slot = [thisMeeting[1], endOfWorkingDay];
      if (getSlotLength(lastSlot) >= durationMinutes) slots.push(lastSlot);
    }
  }

  return slots;
}

function findMeetingSlot(schedules: Schedule[], durationMinutes: number) {

    function findSuitableSlots(slots: Schedule) {
       return slots.filter(([start, end]) => {
          const slotLength = convertToMinutes(end) - convertToMinutes(start);
          return slotLength <= durationMinutes;
       });
    }

    function findEarliestSlot(suitableSlots: Schedule[]) {
      const slotsInAllSchedules = suitableSlots[0].filter((slot) => {
        return suitableSlots.every(function(schedule) {
            return schedule.indexOf(slot) !== -1;
        });
      });

      slotsInAllSchedules.sort(([startA], [startB]) => {
        return convertToMinutes(startB) - convertToMinutes(startA);
      });
      return slotsInAllSchedules[0] ?? null; 
    }

    const timeslots = schedules.map(findSlotsForSchedule, durationMinutes);
    const suitableSlots = timeslots.map(findSuitableSlots);
    return findEarliestSlot(suitableSlots);
}

export default findMeetingSlot;