const fontFamilyList:Record<FontFamilyList,string> = {
  poppins:'"Poppins", sans-serif',
  montserrat : '"Montserrat", sans-serif',
  noto : '"Noto Sans TC", sans-serif',
  lato: '"Lato", "sans-serif"',
}
type FontFamilyList = 'poppins'| 'montserrat' | 'noto' | 'lato';
export default fontFamilyList;
export type {FontFamilyList};