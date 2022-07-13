import assert from 'assert';
import findMeetingSlot, { Schedule, getSlotLength, findSlotsForSchedule, findEarliestSlot, Slot } from './';

describe('getSlotLength', function () {
    it('should get the length of a slot', function () {
        const slot : Slot = ['09:00', '11:30'];
        const slotDuration = getSlotLength(slot);
        console.log('slotDuration', slotDuration);
        assert.deepEqual(slotDuration, 150);
    });
});

describe('findSlotsForfindEarliestSlotSchedule', function () {
    it('should find all the slots between meetings', function () {
        const duration = 30;
        const schedules : Schedule = [['09:00', '11:30'], ['13:30', '15:00'], ['16:00', '17:30'], ['17:45', '19:00']];
        const slots = findSlotsForSchedule(schedules, duration);
        assert.deepEqual(slots, [['11:30', '12:00'],['12:00', '12:30'],['12:30', '13:00'], ['13:00', '13:30'], ['15:00', '15:30'], ['15:30', '16:00']]);
    });
});

describe.only('findEarliestSlot', function () {
    it('should find the earliest slot that exists in all schedules', function () {
        const timeslots: Schedule[] = [
            [ [ '11:30', '12:00' ], [ '12:00', '12:30' ], [ '12:30', '13:00' ], [ '13:00', '13:30' ], [ '15:00', '15:30' ], [ '15:30', '16:00' ] ],
            [ [ '12:00', '12:30' ], [ '12:30', '13:00' ], [ '13:00', '13:30' ], [ '13:30', '14:00' ], [ '14:30', '15:00' ], [ '15:00', '15:30' ], [ '15:30', '16:00' ], [ '16:00', '16:30' ], [ '16:30', '17:00' ], [ '17:30', '18:00' ], [ '18:00', '18:30' ], [ '18:30', '19:00' ] ],
            // [ [ '09:00', '09:30' ], [ '09:30', '10:00' ], [ '10:00', '10:30' ], [ '10:30', '11:00' ], [ '11:00', '11:30' ], [ '12:15', '12:45' ], [ '12:45', '13:15' ], [ '13:15', '13:45' ], [ '13:45', '14:15' ], [ '14:15', '14:45' ], [ '14:45', '15:15' ], [ '15:15', '15:45' ] ],
            [ [ '09:00', '09:30' ], [ '09:30', '10:00' ], [ '14:00', '14:30' ], [ '15:00', '15:30' ], [ '15:30', '16:00' ], [ '16:15', '16:45' ], [ '16:45', '17:15' ], [ '17:15', '17:45' ], [ '17:45', '18:15' ], [ '18:15', '18:45' ], [ '18:45', '19:15' ] ]
        ];
        const slots = findEarliestSlot(timeslots);
        assert.deepEqual(slots, ['15:00', '15:30']);
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

