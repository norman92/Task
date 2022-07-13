import assert from 'assert';
import findMeetingSlot, { Schedule, getSlotLength, findSlotsForSchedule, Slot } from './';

describe('getSlotLength', function () {
    it('should get the length of a slot', function () {
        const slot : Slot = ['09:00', '11:30'];
        const slotDuration = getSlotLength(slot);
        console.log('slotDuration', slotDuration);
        assert.deepEqual(slotDuration, 150);
    });
});

describe('findSlotsForSchedule', function () {
    it('should find all the slots between meetings', function () {
        const duration = 30;
        const schedules : Schedule = [['09:00', '11:30'], ['13:30', '15:00'], ['16:00', '17:30'], ['17:45', '19:00']];
        const slots = findSlotsForSchedule(schedules, duration);
        console.log('slots', slots);
        assert.deepEqual(slots, [['11:30', '13:30'], ['15:00', '16:00']]);
    });
});

describe('findAppointmentSlot', function () {
    it('should find the earliest appointment slot', function () {
        const schedules : Schedule[] = [
            [['09:00', '11:30'], ['13:30', '15:00'], ['16:00', '17:30'], ['17:45', '19:00']], // Schedule 1
            [['09:15', '12:00'], ['14:00', '14:30'], ['17:00', '17:30']], // Schedule 2
            [['11:30', '12:15'], ['15:45', '19:00']], // Schedule 3
            [['10:00', '14:00'], ['14:30', '15:00'], ['16:00', '16:15']], // Schedule 3
        ];
        const requiredDuration = 30;
        const slot = findMeetingSlot(schedules, requiredDuration);
        assert.deepEqual(slot, ['15:00', '15:30']);
    });
});