/**
 * Image helper.
 *
 * Placeholders use remote stock photography (Unsplash IDs) so the site looks complete today.
 * To use your own photo, put it in /public/images/<folder>/ and set the path to
 * e.g. "/images/weddings/my-photo.jpg" anywhere in /src/data.
 * If an image fails to load, the UI shows an elegant tonal fallback — layouts never break.
 */
export const stock = (id: string, width = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=75`

/** Stock placeholder photo IDs, grouped by use. Replace freely. */
export const STOCK = {
  hero: '1519741497674-611481863552',
  about: '1511285560929-80b456fea0bc',
  wedding: ['1519741497674-611481863552', '1537633552985-df8429e8048b', '1583939003579-730e3918a45a', '1465495976277-4387d4b0b4c6'],
  prenup: ['1522673607200-164d1b6ce486', '1606216794074-735e91aa2c92'],
  birthday: ['1464349095431-e9a21285b5f3', '1492684223066-81342ee5ff30'],
  debut: ['1469371670807-013ccf25f16a', '1519225421980-715cb0215aed'],
  graduation: ['1523580846011-d3a5bc25702b'],
  baptism: ['1529634806980-85c3dd6d34ac'],
  aerial: ['1507525428034-b723cf961d3e', '1506744038136-46273834b3fb'],
}
