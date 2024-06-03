
// IMPORTS

import { PHRASES } from "./phrases.js"



// CONSTANTS

const WIDTH = 800     // screen pixel width
const HEIGHT = 600    // screen pixel height
const SQW = 30        // individual square width 
const SQH = 36        // individual square height 
const BORDSIZE = 1    // box border pixel width
const CUR_BORDSIZE = 3    // current letter's box border pixel width
const UNDERLINE_SIZE = 3 // pixel thickness of underline of current phrase
const UNDERLINE_OFFSET = 3 // offset of underline of current phrase
const LETTSPA = 2     // space between letters width
const BOXROWS0 = 7     // number of box rows
const BOXCOLS0 = 24    // number of box cols
const LRSPA = (WIDTH-(BOXCOLS0*SQW)-((BOXCOLS0-1)*LETTSPA))/2     // left and right spacing to boxes
const TOPSPA = 24     // top spacing to boxes
const ROWSPA = 15     // space between boxes in rows
const BG_COLOR = (20,20,20)     // full screen RGB background color
const BOX_BORD_COLOR = (100,100,100)       // box border color
const KEY_FILL_COLOR = (100,100,100)  // keyword box filled color
const CORRECT_COLOR = (0,255,100)   //   FLASHING TEXT COLOR IF CORRECT WORD IS GUESSED
const WRONG_COLOR = (255,0,0)     // FLASHING TEXT COLOR IF WRONG WORD IS GUESSES
const FONT = "Artifakt Element"
const FONTSIZE = 30
const TEXT_COLOR = (200,200,200)           // TEXT COLOR
const UNDERLINE_COLOR = (255, 0, 0)
const QWERTY_TOP_TL = [WIDTH/2 - LETTSPA/2 - 10*BORDSIZE - 5*SQW, 0.75*HEIGHT]      // TOP KEYBOARD ROW TOP LEFT POSITION
const QWERTY_MID_TL = [WIDTH/2 - 9*BORDSIZE - 4.5*SQW, 0.75*HEIGHT+(2*BORDSIZE)+SQH]      // MIDDLE KEYBOARD ROW TOP LEFT POSITION
const QWERTY_BOT_TL = [WIDTH/2 - 7*BORDSIZE - 3.5*SQW, 0.75*HEIGHT+(4*BORDSIZE)+(2*SQH)]      // BOTTOM KEYBOARD ROW TOP LEFT POSITION




// CALCS


//empty lists for strings, number IDs, x and y centers (126 characters total), keyboard
function create2DArray(rows, cols) {
    let array = [];
    for (let i = 0; i < rows; i++) {
        array.push(new Array(cols).fill(0));
    }
    return array; }
const rows = BOXROWS0;
const cols = BOXCOLS0;

var str_arr = create2DArray(rows, cols);
var set_arr = create2DArray(rows, cols);
var num_arr = create2DArray(rows, cols);
var guess_arr = create2DArray(rows, cols);
var img_x_centers = create2DArray(rows, cols);
var img_y_centers = create2DArray(rows, cols);
var img_x_corns = create2DArray(rows, cols);
var img_y_corns = create2DArray(rows, cols);
var qwerty_top = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
var qwerty_top_corns = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var qwerty_mid = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
var qwerty_mid_corns = [0, 0, 0, 0, 0, 0, 0, 0, 0]
var qwerty_bot = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
var qwerty_bot_corns = [0, 0, 0, 0, 0, 0, 0]



// needed variables
// create strings and lists of separated words (user inputs) and together words (as shown on screen)
const separated_list = PHRASES.split(" ")
const together_str = PHRASES.replace(/-/g, "")
const together_list = together_str.split(" ")



// set_arr: set number of rows/columns due word fit on lines
{ var cur_row = 0
var cur_col = 0
var final_col = 0
    
    for(let word = 0; word < together_list.length; word++) {
        var cur_word = together_list[word]
        if(cur_word.length >= BOXCOLS0 - cur_col + 1) {
            if(cur_col > final_col) {
                final_col = cur_col - 1 }
            cur_row++
            cur_col = 0 }
        for(let lett = 0; lett < cur_word.length; lett++) {
            if(cur_row == 0) {
                final_col = cur_col }
            set_arr[cur_row][cur_col] = cur_word[lett]
            if(cur_col > final_col) {
                final_col = cur_col - 1 }
            cur_col++ }
        cur_col++ 
        if(cur_row == 0) {
            final_col = cur_col -1 } 
        if(cur_col > final_col) {
            final_col = cur_col - 1 } } }


const BOXCOLS = final_col;
const BOXROWS = cur_row + 1


// str_arr: fill list with characters
{ var cur_row = 0
var cur_col = 0

for(let word = 0; word < together_list.length; word++) {
    var cur_word = together_list[word]
    if(cur_word.length >= BOXCOLS - cur_col + 1) {
        cur_row++
        cur_col = 0 }
    for(let lett = 0; lett < cur_word.length; lett++) {
        str_arr[cur_row][cur_col] = cur_word[lett]
        cur_col++ }
    cur_col++ } }




// num_arr: fill list with 0's (empty/spaces) 1's (letters not in keyword),
// 2's (letters in keyword) (4's will be letters that are guessed). Also create
// lists filled with first and last linear indexes of each phrase to be guessed 
// by the player, and lists with first and last indicies of underlines

{ var cur_row = 0
var cur_col = 0
var indication_idx = 0
var last_lins1 = []
var first_lins1 = []
var underline1_1 = [[0,0]]
var on_first_lett = false

for(let word = 0; word < separated_list.length; word++) {
    var cur_word = separated_list[word]
    var num_indicators = 0;
    for(let i = 0; i < cur_word.length; i++) {
        if (cur_word[i] == '-') {
        num_indicators++ } }
    if(cur_word.indexOf("-") == -1) {
        if(cur_word.length >= BOXCOLS - cur_col + 1) {
            cur_row ++
            cur_col = 0 }
        for(let lett = 0; lett < cur_word.length; lett++) {
            num_arr[cur_row][cur_col] = 1
            cur_col ++
            if(on_first_lett) {
                first_lins1.push([cur_row, cur_col - 1])
                on_first_lett = false } } }
    else {
        if(cur_word.length - num_indicators >= BOXCOLS - cur_col + 1) {
            cur_row ++
            cur_col = 0 }
        for(let lett = 0; lett < cur_word.length; lett++) {
            if(cur_word[lett] == "-") {
                indication_idx ++
                if(indication_idx %2 == 0) {
                    last_lins1.push([cur_row, cur_col - 1])
                    on_first_lett = true }
                if(indication_idx == 1) {
                    first_lins1.push([cur_row, cur_col]) }
                if(indication_idx %2 != 0) {
                    underline1_1.push([cur_row, cur_col]) } }
            if(indication_idx %2 == 0 && cur_word[lett] != "-") {
                num_arr[cur_row][cur_col] = 1
                cur_col ++ }
            if(indication_idx %2 != 0 && cur_word[lett] != "-") {
                num_arr[cur_row][cur_col] = 2
                cur_col ++ }
            if(on_first_lett && lett != cur_word.length - 1) {
                first_lins1.push([cur_row, cur_col])
                on_first_lett = false } } }
    cur_col += 1 } }

// append final phrase linear indicies to last_lins
{ var log = true
var last_lin_idx = (BOXROWS * BOXCOLS) - 1
while(log) {
    var finalLr = Math.floor(last_lin_idx/BOXCOLS)
    var finalLc =  (last_lin_idx)%BOXCOLS
    if(num_arr[finalLr][finalLc] != 0) {
        log = false }
    else {
        last_lin_idx -- } }
last_lins1.push([finalLr,finalLc]) }


// convert underline lists of indicies to linear indicies
{var underline2_1 = last_lins1
var underline1 = []
var underline2 = []
for(let idx = 0; idx < underline1_1.length; idx++) {
    var idx1 = BOXCOLS*(underline1_1[idx])[0] + (underline1_1[idx])[1]
    var idx2 =  BOXCOLS*(underline2_1[idx])[0] + (underline2_1[idx])[1]
    underline1.push(idx1)
    underline2.push(idx2) } }


// convert first and last entry indicies to linear indicies
{ var first_lins = []
var last_lins = []
for(let idx = 0; idx < last_lins1.length; idx++) {
    var last_lin_idx = BOXCOLS*(last_lins1[idx])[0] + (last_lins1[idx][1])
    var first_lin_idx = BOXCOLS*(first_lins1[idx])[0] + (first_lins1[idx][1])
    last_lins.push(last_lin_idx)
    first_lins.push(first_lin_idx) } }


// add letters up to first phrase to be guessed to guess_arr
{ for(let lett = 0; lett < first_lins[0]; lett++) {
    var row = Math.floor(lett/BOXCOLS)
    var col = lett%BOXCOLS
    guess_arr[row][col] = str_arr[row][col] } }




// img x and y centers
{ for(let row = 0; row < BOXROWS; row++) {
    for(let col = 0; col < BOXCOLS; col++) {
        if(col != 0) {
            img_x_centers[row][col] = LRSPA + SQW/2 + col*(SQW+LETTSPA) }
        else {
            img_x_centers[row][col] = LRSPA + SQW/2 } 
        if(row != 0) {
            img_y_centers[row][col] = TOPSPA + SQH/2 + row*(SQH+ROWSPA) }
        else {
            img_y_centers[row][col] = TOPSPA + SQH/2 } } } } 




// img x and y top left corners
{ for(let row = 0; row < BOXROWS; row++) {
    for(let col = 0; col < BOXCOLS; col++) {
        if(col != 0) {
            img_x_corns[row][col] = LRSPA + col*(SQW+LETTSPA) }
        else {
            img_x_corns[row][col] = LRSPA }
        if(row != 0) {
            img_y_corns[row][col] = TOPSPA + row*(SQH+ROWSPA) }
        else {
            img_y_corns[row][col] = TOPSPA } } } }



// QWERTY keyboard x positions
{ for(let key = 0; key < 10; key++) {
    if(key == 0) {
        qwerty_top_corns[key] = QWERTY_TOP_TL[0] }
    else {
        qwerty_top_corns[key] = QWERTY_TOP_TL[0] + key*(SQW+LETTSPA) } } }

{ for(let key = 0; key < 9; key++) {
    if(key == 0) {
        qwerty_mid_corns[key] = QWERTY_MID_TL[0] }
    else {
        qwerty_mid_corns[key] = QWERTY_MID_TL[0] + key*(SQW+LETTSPA) } } }

{ for(let key = 0; key < 7; key++) {
    if(key == 0) {
        qwerty_bot_corns[key] = QWERTY_BOT_TL[0] }
    else {
        qwerty_bot_corns[key] = QWERTY_BOT_TL[0] + key*(SQW+LETTSPA) } } }


// EXPORTS

console.log(underline1, underline2)

export {BOXROWS, BOXCOLS, num_arr, str_arr, guess_arr, last_lins, first_lins, underline1, underline2}


// trying to export constants to the css file to auto calculate sizes/spacing
document.documentElement.style.setProperty('--BOXROWS', BOXROWS);
document.documentElement.style.setProperty('--BOXCOLS', BOXCOLS);


