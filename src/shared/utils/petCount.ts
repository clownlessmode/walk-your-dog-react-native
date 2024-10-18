export function petCount (count: number) {

if (count === 0) {
  return  "Нет питомцев";
} else if (count === 1) {
    return   "1 питомец";
} else if ([2, 3, 4].includes(count)) {
  return  `${count} питомца`;
} else {
  return  `${count} питомцев`;
}
}