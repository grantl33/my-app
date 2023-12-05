import { checkValidFieldValues } from '.';

test('check for valid field values', () => {
    const validValues = checkValidFieldValues({
        resDate: "2023-12-01",
        resTime: "15:00",
        resGuests: "5",
        resOccasion: "Anniversary"
    });
    expect(validValues).toBeTruthy();
});

test('check for invalid field values', () => {
    const invalidValues1 = checkValidFieldValues({
        resDate: "2023-12-01",
        resTime: null,
        resGuests: "5",
        resOccasion: "Anniversary"
    });
    expect(invalidValues1).toBeFalsy();
    const invalidValues2 = checkValidFieldValues({
        resDate: null,
        resTime: null,
        resGuests: "5",
        resOccasion: "Anniversary"
    });
    expect(invalidValues2).toBeFalsy();
    const invalidValues3 = checkValidFieldValues({
        resDate: "",
        resTime: undefined,
        resGuests: undefined,
        resOccasion: null
    });
    expect(invalidValues3).toBeFalsy();
});