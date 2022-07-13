
export type Slot = [string, string];
export type Schedule = Slot[];

function convertToMinutes(time: string) {
  const [hours, minutes] = time.split(':');
  return (Number(hours) * 60) + Number(minutes);
}

function convertMinutesToString(timeInMinutes: number) {
  const hours = Math.floor(timeInMinutes / 60);
  const minutes = timeInMinutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2,'0')}`;
}

export function findEasliestCommonSlot(schedules: Schedule[], durationMinutes: number) {
  let slotToCheckStart = convertToMinutes('09:00');
  let slotToCheckEnd = slotToCheckStart + durationMinutes;

  while (slotToCheckEnd <= convertToMinutes('19:00')) {
    const slotAvailable = schedules.every((schedule) => {
      const conflictingMeeting = schedule.find(([start, end]) => {
        return (slotToCheckStart >= convertToMinutes(start) && slotToCheckStart < convertToMinutes(end)) ||
        (slotToCheckEnd > convertToMinutes(start) && slotToCheckEnd <=  convertToMinutes(end));
      });

      return !conflictingMeeting;
    });

    if (slotAvailable) return [convertMinutesToString(slotToCheckStart), convertMinutesToString(slotToCheckEnd)];

    slotToCheckStart = slotToCheckStart + 5;
    slotToCheckEnd = slotToCheckEnd + 5;
  }
  return null;
}

export default findEasliestCommonSlot;