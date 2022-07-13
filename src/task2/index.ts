
export type Slot = [string, string];
export type Schedule = Slot[];

export function convertToMinutes(time: string) {
  const [hours, minutes] = time.split(':');
  return (Number(hours) * 60) + Number(minutes);
}

export function convertMinutesToString(timeInMinutes: number) {
  const hours = Math.floor(timeInMinutes / 60);
  const minutes = timeInMinutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2,'0')}`;
}

export function getSlotLength(slot: Slot) {
  return convertToMinutes(slot[1]) - convertToMinutes(slot[0]);
}

export function splitSlotsIntoDurations(slots: Slot[], durationMinutes: number): Slot[] {
  return slots.reduce((previous, slot) => {
    if (getSlotLength(slot) === durationMinutes) previous.push(slot);
    else {
      const start = convertToMinutes(slot[0]);
      const end = convertToMinutes(slot[1]);

      let currentStart = start;
      let currentEnd = 0;

      while (currentEnd < end) {
        currentEnd = currentStart + durationMinutes;
        console.log('durationMinutes', durationMinutes);
        console.log('end', end);
        console.log('currentEnd', currentEnd);

        previous.push([convertMinutesToString(currentStart), convertMinutesToString(currentEnd)]);
        currentStart = currentEnd;
      }
    }
    return previous;
  }, [] as Slot[]);
}

export function findSlotsForSchedule(schedule: Schedule, durationMinutes: number) : Slot[] {
  const startOfWorkingDay = '09:00';
  const endOfWorkingDay = '19:00';

  const gaps: Schedule = [];

  for (let i = 0; i < schedule.length; i++) {
    const thisMeeting = schedule[i];
    const nextMeeting = schedule[i+1];
  
    if (i === 0 && thisMeeting[0] != startOfWorkingDay) {
      const firstGap: Slot = [startOfWorkingDay, thisMeeting[0]];
      if (getSlotLength(firstGap) >= durationMinutes) gaps.push(firstGap);
    }
  
    if (nextMeeting) {
        const thisMeetingEnd = thisMeeting[1];
        const nextMeetingStart = nextMeeting[0];
        const newGap: Slot = [thisMeetingEnd, nextMeetingStart];
        if (getSlotLength(newGap) >= durationMinutes) gaps.push(newGap);
    }

    if (i === schedule.length - 1 && thisMeeting[1] !== endOfWorkingDay) {
      const lastGap: Slot = [thisMeeting[1], endOfWorkingDay];
      if (getSlotLength(lastGap) >= durationMinutes) gaps.push(lastGap);
    }
  }

  return splitSlotsIntoDurations(gaps, durationMinutes);
}

export function findEarliestSlot(suitableSlots: Schedule[]) {
  const slotsInAllSchedules = suitableSlots[0].filter((slotToFind) => {
    return suitableSlots.every(function(schedule) {
        return schedule.findIndex((slot) => {
          console.log('slot', slot);
          console.log('slotToFind', slotToFind);
          console.log('match?', slot[0] === slotToFind[0] && slot[1] === slotToFind[1]);
          return slot[0] === slotToFind[0] && slot[1] === slotToFind[1];
        }) !== -1;
    });
  });

  console.log('slotsInAllSchedules', slotsInAllSchedules);

  slotsInAllSchedules.sort(([startA], [startB]) => {
    return  convertToMinutes(startA) - convertToMinutes(startB);
  });
  return slotsInAllSchedules[0] ?? null; 
}

function findMeetingSlot(schedules: Schedule[], durationMinutes: number) {
    const timeslots = schedules.map((schedule) => findSlotsForSchedule(schedule, durationMinutes));
    console.log('time', timeslots);
    return findEarliestSlot(timeslots);
}

export default findMeetingSlot;