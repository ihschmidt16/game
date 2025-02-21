
// NO COMBINED WORD LENGTHS GREATER THAN 12 LETTERS


const ALL_PHRASES = {

    '20241117': "FI-RE-START",
    // -------------------------
    '20250201': "GO THE EXTRA -MILE- -HIGH- -FIVE- OCLOCK -SHADOW- OF A -DOUBT--LESS- IS -MORE- OR LESS",
    '20250201_0': 'Another way to say "Go above and beyond"',
    '20250201_1': 'A nickname for Denver -(City)',
    '20250201_2': 'A gesture for a job well done',
    '20250201_3': 'Beard scruff',
    '20250201_4': '"Her guilt was evident beyond the _____."',
    '20250201_5': 'Beyond confident',
    '20250201_6': '"Don\'t overdo it ,_____."',
    '20250201_7': 'Approximately',
    // -------------------------
    '20250202': "BITE THE -BULLET-PROOF -PLAN- OF -ACTION-S SPEAK LOUDER THAN -WORDS- OF WISDOM",
    '20250202_0': 'Accept impending hardship',
    '20250202_1': '"Don\'t worry, I have a _____"',
    '20250202_2': '"We must develop a _____ to solve the problem"',
    '20250202_3': '"Prove it to me, because _____"',
    '20250202_4': 'What eldery people give to younger people',
    // -------------------------
    '20250203': 'ELEPHANT IN THE -ROOM- THE -READ- LIGHT-LY-RICAL GENIUS',
    '20250203_0': '"To get started, let\'s address the _____".',
    '20250203_1': '"Stop killing the vibe, _____!" (backwards word order)',
    '20250203_2': '"Don\'t mess with me! You better T_____!"',
    '20250203_3': 'Some say Eminem is this',
    // -------------------------
    '20250220': 'OUT OF THE -BLUE- COLLAR -WORKER- -BEES- THE AND -BIRDS- OF A -FEATHER- IN YOUR -CAP-TURE THE -MOMENT- OF -SILENCE- OF THE LAMBS',
    '20250220_0': 'Unforseen',
    '20250220_1': 'Someone who doesn\'t work in an office',
    '20250220_2': '"They are _____ for the company."',
    '20250220_3': 'An uncomfortable talk a dad has with his son (backwards word order)',
    '20250220_4': '"_____ stick together."',
    '20250220_5': 'An amazing accoplishment',
    '20250220_6': 'Take it all in',
    '20250220_7': 'A way to honor someone\'s passing',
    '20250220_8': 'Book with Hannibal Lecter',
    // -------------------------
    '20290816': "FI-RE-START",
    // -------------------------
    '20290817': "FI-RE-START",
    // -------------------------
    '20290818': "FI-RE-START",
    // -------------------------
    '20290819': "FI-RE-START",
    // -------------------------
    '20290820': "FI-RE-START",
    // -------------------------
    '20290821': "FI-RE-START",
    // -------------------------
    '20290822': "FI-RE-START",
    // -------------------------
    '20290823': "FI-RE-START",
    // -------------------------
    '20290824': "FI-RE-START",
    // -------------------------
    '20290825': "FI-RE-START",
    // -------------------------
    '20290826': "FI-RE-START",
    // -------------------------
    '20290827': "FI-RE-START",
    // -------------------------
    '20290828': "FI-RE-START",
    // -------------------------
    '20290829': "FI-RE-START",
    // -------------------------
    '20290830': "FI-RE-START",
    // -------------------------
    '20290831': "FI-RE-START",
    

    
    
    
    
    
    
    };
    
    function getSortedPhrases(allPhrases) {
        return Object.keys(allPhrases)
            .filter(key => !key.includes('_'))
            .sort((a, b) => a - b)
    }
    
    const sortedPhrases = getSortedPhrases(ALL_PHRASES);
    // console.log(sortedPhrases);
    
    
    export { ALL_PHRASES, sortedPhrases };