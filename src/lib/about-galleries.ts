export const JIUJITSU_PHOTO_NUMBERS = Array.from({ length: 12 }, (_, index) =>
  String(index + 1).padStart(2, '0'),
);

export const POLAROID_ROTATIONS = [
  '-rotate-3',
  'rotate-2',
  '-rotate-[1.5deg]',
  'rotate-3',
  '-rotate-[2.5deg]',
  'rotate-[1.5deg]',
];
