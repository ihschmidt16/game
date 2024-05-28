
// CONSTANTS

export const SQW = 30        // individual square width 
export const SQH = 36        // individual square height 
export const BORDSIZE = 1    // box border pixel width
export const CUR_BORDSIZE = 3    // current letter's box border pixel width
export const UNDERLINE_SIZE = 3 // pixel thickness of underline of current phrase
export const UNDERLINE_OFFSET = 3 // offset of underline of current phrase
export const LETTSPA = 2     // space between letters width
export const BOXROWS = 7     // number of box rows
export const BOXCOLS = 24    // number of box cols
export const LRSPA = (WIDTH-(BOXCOLS*SQW)-((BOXCOLS-1)*LETTSPA))/2     // left and right spacing to boxes
export const TOPSPA = 24     // top spacing to boxes
export const ROWSPA = 15     // space between boxes in rows
export const BG_COLOR = (20,20,20)     // full screen RGB background color
export const BOX_BORD_COLOR = (100,100,100)       // box border color
export const KEY_FILL_COLOR = (100,100,100)  // keyword box filled color
export const CORRECT_COLOR = (0,255,100)   //   FLASHING TEXT COLOR IF CORRECT WORD IS GUESSED
export const WRONG_COLOR = (255,0,0)     // FLASHING TEXT COLOR IF WRONG WORD IS GUESSES
export const FONT = "Artifakt Element"
export const FONTSIZE = 30
export const TEXT_COLOR = (200,200,200)           // TEXT COLOR
export const UNDERLINE_COLOR = (255, 0, 0)
export const QWERTY_TOP_TL = [WIDTH/2 - LETTSPA/2 - 10*BORDSIZE - 5*SQW, 0.75*HEIGHT]      // TOP KEYBOARD ROW TOP LEFT POSITION
export const QWERTY_MID_TL = [WIDTH/2 - 9*BORDSIZE - 4.5*SQW, 0.75*HEIGHT+(2*BORDSIZE)+SQH]      // MIDDLE KEYBOARD ROW TOP LEFT POSITION
export const QWERTY_BOT_TL = [WIDTH/2 - 7*BORDSIZE - 3.5*SQW, 0.75*HEIGHT+(4*BORDSIZE)+(2*SQH)]      // BOTTOM KEYBOARD ROW TOP LEFT POSITION
export const ALPHABET = "QWERTYUIOPASDFGHJKLZXCVBNM"
