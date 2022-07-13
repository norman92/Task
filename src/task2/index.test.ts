import assert from 'assert';
import findMeetingSlot, { Schedule } from './';

describe.only('findAppointmentSlot', function () {
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

    it('should find the earliest appointment slot when it is at the beginning of the day', function () {
        const schedules : Schedule[] = [
            [['10:00', '11:30'], ['13:30', '15:00'], ['16:00', '17:30'], ['17:45', '19:00']], // Schedule 1
            [['09:30', '12:00'], ['14:00', '14:30'], ['17:00', '17:30']], // Schedule 2
            [['11:30', '12:15'], ['15:45', '19:00']], // Schedule 3
            [['10:00', '14:00'], ['14:30', '15:00'], ['16:00', '16:15']], // Schedule 3
        ];
        const requiredDuration = 30;
        const slot = findMeetingSlot(schedules, requiredDuration);
        assert.deepEqual(slot, ['09:00', '09:30']);
    });

    it('should find the earliest appointment slot when it is at the end of the day', function () {
        const schedules : Schedule[] = [
            [['09:00', '11:30'], ['13:30', '15:00'], ['16:00', '17:30'], ['17:45', '18:00']], // Schedule 1
            [['09:15', '12:00'], ['14:00', '14:30'], ['17:00', '17:30']], // Schedule 2
            [['11:30', '12:15'], ['15:45', '18:30']], // Schedule 3
            [['10:00', '14:00'], ['14:30', '16:00'], ['16:00', '16:15']], // Schedule 3
        ];
        const requiredDuration = 30;
        const slot = findMeetingSlot(schedules, requiredDuration);
        assert.deepEqual(slot, ['18:30', '19:00']);
    });

    it('should return null when there is no possible slot', function () {
        const schedules : Schedule[] = [
            [['09:00', '11:30'], ['13:30', '15:00'], ['16:00', '17:30'], ['17:45', '18:00']], // Schedule 1
            [['09:15', '12:00'], ['14:00', '14:30'], ['17:00', '17:30']], // Schedule 2
            [['11:30', '12:15'], ['15:45', '18:30']], // Schedule 3
            [['10:00', '14:00'], ['14:30', '16:00'], ['16:00', '16:15']], // Schedule 3
        ];
        const requiredDuration = 90;
        const slot = findMeetingSlot(schedules, requiredDuration);
        assert.equal(slot, null);
    });
});

