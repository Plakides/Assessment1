/*
 * Charterhouse Almaty — Y7–8 Python Foundations Attainment Assessment
 * Google Apps Script backend
 *
 * Student-facing answer keys / model solutions are NEVER returned to the browser.
 * Admin/setup helpers end with _ so google.script.run cannot invoke them.
 */

const APP_VERSION = 'y78-attainment-web-v1.0';
const RESPONSE_SHEET_NAME = 'Responses';
const MARKING_GUIDE_SHEET_NAME = 'Marking Guide';
const STORAGE_PROPERTY = 'ASSESSMENT_RESPONSE_SPREADSHEET_ID';

const YEAR_TO_ASSESSMENT = Object.freeze({
  7: 'y78_python_foundations_attainment_01',
  8: 'y78_python_foundations_attainment_01'
});

const PUBLIC_ASSESSMENT_Y78 = {
  "assessment_id": "y78_python_foundations_attainment_01",
  "title": "Year 7–8 Python Foundations Attainment Assessment",
  "year_groups": [
    7,
    8
  ],
  "duration_minutes": 30,
  "total_marks": 30,
  "student_instructions": [
    "This assessment has 30 marks. You have about 30 minutes.",
    "Section A: choose one answer to each question. 12 marks. About 10 minutes.",
    "Section B: fix the code. Press Run to test it. 8 marks. About 8 minutes.",
    "Section C: write your own code. Press Run to test it. 10 marks. About 12 minutes.",
    "You can run your code as many times as you like.",
    "Each correct part of a task gets marks. Try every task, even if your code does not fully work.",
    "Work on your own. Use only this page."
  ],
  "sections": [
    {
      "id": "A",
      "title": "Knowledge and Code Reading",
      "marks": 12,
      "suggested_minutes": 10,
      "questions": [
        {
          "id": "A01",
          "type": "mcq",
          "topic": "Output with print()",
          "difficulty": "basic",
          "marks": 1,
          "stem": "What does this program print?",
          "code": "print(\"5 + 3\")",
          "option_format": "code",
          "options": [
            {
              "id": "A",
              "text": "8"
            },
            {
              "id": "B",
              "text": "5 + 3"
            },
            {
              "id": "C",
              "text": "\"5 + 3\""
            },
            {
              "id": "D",
              "text": "53"
            }
          ]
        },
        {
          "id": "A02",
          "type": "mcq",
          "topic": "Variables: assigning and changing a value",
          "difficulty": "basic",
          "marks": 1,
          "stem": "What does this program print?",
          "code": "lives = 3\nlives = 5\nprint(lives)",
          "option_format": "code",
          "options": [
            {
              "id": "A",
              "text": "3"
            },
            {
              "id": "B",
              "text": "8"
            },
            {
              "id": "C",
              "text": "lives"
            },
            {
              "id": "D",
              "text": "5"
            }
          ]
        },
        {
          "id": "A03",
          "type": "mcq",
          "topic": "input() gives text (a string)",
          "difficulty": "basic",
          "marks": 1,
          "stem": "The user types 5, then types 5. What does print(a + b) show?",
          "code": "a = input(\"Number: \")\nb = input(\"Number: \")\nprint(a + b)",
          "option_format": "code",
          "options": [
            {
              "id": "A",
              "text": "10"
            },
            {
              "id": "B",
              "text": "5 + 5"
            },
            {
              "id": "C",
              "text": "55"
            },
            {
              "id": "D",
              "text": "10.0"
            }
          ]
        },
        {
          "id": "A04",
          "type": "mcq",
          "topic": "Casting with int()",
          "difficulty": "basic",
          "marks": 1,
          "stem": "The user types 7. Which line stores 7 as an integer (a whole number)?",
          "code": null,
          "option_format": "code",
          "options": [
            {
              "id": "A",
              "text": "n = int(input(\"Number: \"))"
            },
            {
              "id": "B",
              "text": "n = input(\"Number: \")"
            },
            {
              "id": "C",
              "text": "n = float(input(\"Number: \"))"
            },
            {
              "id": "D",
              "text": "n = input(int(\"Number: \"))"
            }
          ]
        },
        {
          "id": "A05",
          "type": "mcq",
          "topic": "Order of operations and brackets",
          "difficulty": "developing",
          "marks": 1,
          "stem": "Which line prints 20?",
          "code": null,
          "option_format": "code",
          "options": [
            {
              "id": "A",
              "text": "print(2 + 3 * 4)"
            },
            {
              "id": "B",
              "text": "print(2 + (3 * 4))"
            },
            {
              "id": "C",
              "text": "print((2 + 3) * 4)"
            },
            {
              "id": "D",
              "text": "print(2 * (3 + 4))"
            }
          ]
        },
        {
          "id": "A06",
          "type": "mcq",
          "topic": "Remainder with %",
          "difficulty": "developing",
          "marks": 1,
          "stem": "What does this program print?",
          "code": "print(17 % 5)",
          "option_format": "code",
          "options": [
            {
              "id": "A",
              "text": "3"
            },
            {
              "id": "B",
              "text": "2"
            },
            {
              "id": "C",
              "text": "3.4"
            },
            {
              "id": "D",
              "text": "0.85"
            }
          ]
        },
        {
          "id": "A07",
          "type": "mcq",
          "topic": "Syntax, runtime and logic errors",
          "difficulty": "developing",
          "marks": 1,
          "stem": "This program should multiply the number by 2. It runs and prints 8. It should print 12. What type of error is this?",
          "code": "number = 6\nanswer = number + 2\nprint(answer)",
          "option_format": "text",
          "options": [
            {
              "id": "A",
              "text": "Syntax error"
            },
            {
              "id": "B",
              "text": "Runtime error"
            },
            {
              "id": "C",
              "text": "Logic error"
            },
            {
              "id": "D",
              "text": "No error"
            }
          ]
        },
        {
          "id": "A08",
          "type": "mcq",
          "topic": "= (store) versus == (compare)",
          "difficulty": "developing",
          "marks": 1,
          "stem": "Which line checks if score is equal to 10?",
          "code": null,
          "option_format": "code",
          "options": [
            {
              "id": "A",
              "text": "if score = 10:"
            },
            {
              "id": "B",
              "text": "score = 10"
            },
            {
              "id": "C",
              "text": "if \"score\" == 10:"
            },
            {
              "id": "D",
              "text": "if score == 10:"
            }
          ]
        },
        {
          "id": "A09",
          "type": "mcq",
          "topic": "Comparison operators and boundary values",
          "difficulty": "secure",
          "marks": 1,
          "stem": "age is 12. Which condition is True?",
          "code": "age = 12",
          "option_format": "code",
          "options": [
            {
              "id": "A",
              "text": "age > 12"
            },
            {
              "id": "B",
              "text": "age >= 12"
            },
            {
              "id": "C",
              "text": "age < 12"
            },
            {
              "id": "D",
              "text": "age != 12"
            }
          ]
        },
        {
          "id": "A10",
          "type": "mcq",
          "topic": "if / else and the order the program runs",
          "difficulty": "secure",
          "marks": 1,
          "stem": "What does this program print?",
          "code": "paid = 300\nprice = 400\nif paid >= price:\n    print(\"Thank you\")\nelse:\n    print(\"Pay more\")\nprint(\"Goodbye\")",
          "option_format": "code",
          "options": [
            {
              "id": "A",
              "text": "Pay more\nGoodbye"
            },
            {
              "id": "B",
              "text": "Thank you\nGoodbye"
            },
            {
              "id": "C",
              "text": "Pay more"
            },
            {
              "id": "D",
              "text": "Thank you\nPay more\nGoodbye"
            }
          ]
        },
        {
          "id": "A11",
          "type": "mcq",
          "topic": "if / elif / else: the first True branch",
          "difficulty": "mastery",
          "marks": 1,
          "stem": "What does this program print?",
          "code": "mark = 85\nif mark >= 50:\n    print(\"Pass\")\nelif mark >= 80:\n    print(\"Merit\")\nelse:\n    print(\"Fail\")",
          "option_format": "code",
          "options": [
            {
              "id": "A",
              "text": "Pass"
            },
            {
              "id": "B",
              "text": "Merit"
            },
            {
              "id": "C",
              "text": "Pass\nMerit"
            },
            {
              "id": "D",
              "text": "Fail"
            }
          ]
        },
        {
          "id": "A12",
          "type": "mcq",
          "topic": "Combining conditions with and",
          "difficulty": "mastery",
          "marks": 1,
          "stem": "What does this program print?",
          "code": "age = 10\nticket = \"yes\"\nif age >= 12 and ticket == \"yes\":\n    print(\"Enter\")\nelse:\n    print(\"Stop\")",
          "option_format": "code",
          "options": [
            {
              "id": "A",
              "text": "Enter"
            },
            {
              "id": "B",
              "text": "Enter\nStop"
            },
            {
              "id": "C",
              "text": "False"
            },
            {
              "id": "D",
              "text": "Stop"
            }
          ]
        }
      ]
    },
    {
      "id": "B",
      "title": "Fix the Code",
      "marks": 8,
      "suggested_minutes": 8,
      "questions": [
        {
          "id": "B1",
          "type": "debug",
          "topic": "Input, data types and casting",
          "difficulty": "developing",
          "marks": 4,
          "student_prompt": "This program should ask your age and print your age next year.\nTest: type 12. The program should print 13.\n1. Run the program. Type 12. It does not work.\n2. READ → FIND → FIX → RUN.\n3. Run it again. Type 12. Check that it prints 13.",
          "starter_code": "age = input(\"Age: \")\nnext_age = age + 1\nprint(next_age)",
          "tests": [
            {
              "inputs": [
                "12"
              ],
              "expected": "13"
            },
            {
              "inputs": [
                "14"
              ],
              "expected": "15"
            }
          ]
        },
        {
          "id": "B2",
          "type": "debug",
          "topic": "Selection: boundary values and logic errors",
          "difficulty": "secure",
          "marks": 4,
          "student_prompt": "Rules:\n80 or more → GOLD\n50 to 79 → SILVER\nLess than 50 → BRONZE\n1. Run the program 4 times. Test 49, 50, 79 and 80.\n2. One result is wrong. Fix the code.\n3. Run all 4 tests again. All 4 must be correct.",
          "starter_code": "score = int(input(\"Score: \"))\n\nif score >= 80:\n    print(\"GOLD\")\nelif score > 50:\n    print(\"SILVER\")\nelse:\n    print(\"BRONZE\")",
          "tests": [
            {
              "inputs": [
                "49"
              ],
              "expected": "BRONZE"
            },
            {
              "inputs": [
                "50"
              ],
              "expected": "SILVER"
            },
            {
              "inputs": [
                "79"
              ],
              "expected": "SILVER"
            },
            {
              "inputs": [
                "80"
              ],
              "expected": "GOLD"
            }
          ]
        }
      ]
    },
    {
      "id": "C",
      "title": "Write Some Code",
      "marks": 10,
      "suggested_minutes": 12,
      "questions": [
        {
          "id": "C1",
          "type": "code",
          "topic": "Input, casting, arithmetic and output",
          "difficulty": "developing",
          "marks": 4,
          "student_prompt": "Write a program that:\n1. asks the user to type two whole numbers\n2. adds them together\n3. prints the total\nTest 1: 3 and 5 → 8\nTest 2: 10 and 2 → 12",
          "starter_code": "",
          "tests": [
            {
              "inputs": [
                "3",
                "5"
              ],
              "expected": "8"
            },
            {
              "inputs": [
                "10",
                "2"
              ],
              "expected": "12"
            }
          ]
        },
        {
          "id": "C2",
          "type": "code",
          "topic": "Input, casting, arithmetic and selection with a boundary",
          "difficulty": "mastery",
          "marks": 6,
          "student_prompt": "GAME SHOP\n1. Ask how many coins the player has.\n2. Ask how much the item costs.\n3. Calculate the coins left: coins - cost\n4. If the player has enough coins, print BOUGHT\n   If not, print NOT ENOUGH\nImportant: a player with exactly enough coins CAN buy the item.\nTest A: coins 10, cost 7 → BOUGHT\nTest B: coins 5, cost 5 → BOUGHT\nTest C: coins 4, cost 5 → NOT ENOUGH",
          "starter_code": "",
          "tests": [
            {
              "inputs": [
                "10",
                "7"
              ],
              "expected": "BOUGHT"
            },
            {
              "inputs": [
                "5",
                "5"
              ],
              "expected": "BOUGHT"
            },
            {
              "inputs": [
                "4",
                "5"
              ],
              "expected": "NOT ENOUGH"
            }
          ]
        }
      ]
    }
  ]
};

const ANSWER_KEY_Y78 = Object.freeze({
  "A01": "B",
  "A02": "D",
  "A03": "C",
  "A04": "A",
  "A05": "C",
  "A06": "B",
  "A07": "C",
  "A08": "D",
  "A09": "B",
  "A10": "A",
  "A11": "A",
  "A12": "D"
});

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Python Foundations Attainment Assessment');
}

function getBootstrap() {
  return {
    appVersion: APP_VERSION,
    availableYears: Object.keys(YEAR_TO_ASSESSMENT).map(Number).sort(),
    title: 'Python Foundations Attainment Assessment'
  };
}

function getAssessmentForYear(year) {
  const y = Number(year);
  const assessmentId = YEAR_TO_ASSESSMENT[y];
  if (!assessmentId) throw new Error('This year group is not available yet.');
  if (assessmentId !== PUBLIC_ASSESSMENT_Y78.assessment_id) {
    throw new Error('Assessment configuration error.');
  }
  // Deep copy prevents accidental mutation of the server constant.
  return JSON.parse(JSON.stringify(PUBLIC_ASSESSMENT_Y78));
}

function submitAssessment(payload) {
  validateSubmission_(payload);
  const y = Number(payload.year);
  const assessmentId = YEAR_TO_ASSESSMENT[y];
  if (!assessmentId || assessmentId !== payload.assessment_id) {
    throw new Error('Assessment/year mismatch. Please reload and try again.');
  }

  const ss = getResponseSpreadsheet_();
  const sheet = ss.getSheetByName(RESPONSE_SHEET_NAME);
  if (!sheet) throw new Error('Responses sheet is missing. Run setupAssessment_() again from the Apps Script editor.');

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    // Network retries should not create a duplicate row.
    if (submissionExists_(sheet, payload.submission_id)) {
      return { ok: true, duplicate: true, submissionId: payload.submission_id };
    }

    const objective = scoreObjective_(payload.answers || {});
    const headers = responseHeaders_();
    const rowData = {};
    const nowIso = new Date().toISOString();

    rowData['Server Timestamp'] = nowIso;
    rowData['Submission ID'] = cleanText_(payload.submission_id, 120);
    rowData['Assessment ID'] = assessmentId;
    rowData['First Name'] = cleanText_(payload.first_name, 100);
    rowData['Surname'] = cleanText_(payload.surname, 100);
    rowData['Year'] = String(y);
    rowData['Started At (client)'] = cleanText_(payload.started_at || '', 80);
    rowData['Submitted At (client)'] = cleanText_(payload.submitted_at || '', 80);
    rowData['Elapsed Seconds'] = String(Math.max(0, Math.floor(Number(payload.elapsed_seconds) || 0)));

    Object.keys(ANSWER_KEY_Y78).forEach(qid => {
      const selected = String((payload.answers || {})[qid] || '').toUpperCase();
      rowData[qid + ' Response'] = ['A','B','C','D'].includes(selected) ? selected : '';
      rowData[qid + ' Mark'] = selected && selected === ANSWER_KEY_Y78[qid] ? 1 : 0;
    });
    rowData['A Score'] = objective.score;

    ['B1','B2','C1','C2'].forEach(qid => {
      const part = ((payload.code || {})[qid]) || {};
      rowData[qid + ' Code'] = cleanText_(part.code || '', 12000);
      rowData[qid + ' Last Input'] = cleanText_(part.stdin || '', 2500);
      rowData[qid + ' Last Output'] = cleanText_(part.output || '', 20000);
      rowData[qid + ' Score'] = '';
    });

    rowData['B Total'] = '';
    rowData['C Total'] = '';
    rowData['Total'] = '';
    rowData['Grade'] = '';
    rowData['Marker Notes'] = '';

    const rowIndex = sheet.getLastRow() + 1;
    const row = headers.map(h => Object.prototype.hasOwnProperty.call(rowData, h) ? rowData[h] : '');
    const target = sheet.getRange(rowIndex, 1, 1, headers.length);
    target.setNumberFormat('@');
    target.setValues([row]);

    // Put formulas back into formula columns after writing plain-text student data.
    setMarkingFormulas_(sheet, rowIndex, headers);

    return {
      ok: true,
      duplicate: false,
      submissionId: payload.submission_id,
      receivedAt: nowIso
    };
  } finally {
    lock.releaseLock();
  }
}

function scoreObjective_(answers) {
  let score = 0;
  const itemMarks = {};
  Object.keys(ANSWER_KEY_Y78).forEach(qid => {
    const selected = String(answers[qid] || '').toUpperCase();
    const mark = selected === ANSWER_KEY_Y78[qid] ? 1 : 0;
    itemMarks[qid] = mark;
    score += mark;
  });
  return { score: score, itemMarks: itemMarks };
}

function validateSubmission_(payload) {
  if (!payload || typeof payload !== 'object') throw new Error('No submission received.');
  if (!payload.submission_id || String(payload.submission_id).length > 120) throw new Error('Invalid submission ID.');
  if (!payload.assessment_id) throw new Error('Missing assessment ID.');
  const first = String(payload.first_name || '').trim();
  const surname = String(payload.surname || '').trim();
  if (first.length < 1 || first.length > 100) throw new Error('Enter your first name.');
  if (surname.length < 1 || surname.length > 100) throw new Error('Enter your surname.');
  const y = Number(payload.year);
  if (!YEAR_TO_ASSESSMENT[y]) throw new Error('Choose a valid year group.');
  if (payload.answers && typeof payload.answers !== 'object') throw new Error('Invalid answers data.');
  if (payload.code && typeof payload.code !== 'object') throw new Error('Invalid code data.');
}

function cleanText_(value, maxLength) {
  let s = String(value == null ? '' : value);
  if (s.length > maxLength) s = s.slice(0, maxLength);
  return s;
}

function submissionExists_(sheet, submissionId) {
  if (sheet.getLastRow() < 2) return false;
  const headers = responseHeaders_();
  const col = headers.indexOf('Submission ID') + 1;
  const finder = sheet.getRange(2, col, sheet.getLastRow() - 1, 1)
    .createTextFinder(String(submissionId))
    .matchEntireCell(true);
  return !!finder.findNext();
}

function getResponseSpreadsheet_() {
  const id = PropertiesService.getScriptProperties().getProperty(STORAGE_PROPERTY);
  if (!id) throw new Error('Assessment storage has not been set up. Run setupAssessment_() once from the Apps Script editor.');
  return SpreadsheetApp.openById(id);
}

function responseHeaders_() {
  const headers = [
    'Server Timestamp', 'Submission ID', 'Assessment ID',
    'First Name', 'Surname', 'Year',
    'Started At (client)', 'Submitted At (client)', 'Elapsed Seconds'
  ];
  Object.keys(ANSWER_KEY_Y78).forEach(qid => {
    headers.push(qid + ' Response');
    headers.push(qid + ' Mark');
  });
  headers.push('A Score');
  ['B1','B2'].forEach(qid => {
    headers.push(qid + ' Code', qid + ' Last Input', qid + ' Last Output', qid + ' Score');
  });
  headers.push('B Total');
  ['C1','C2'].forEach(qid => {
    headers.push(qid + ' Code', qid + ' Last Input', qid + ' Last Output', qid + ' Score');
  });
  headers.push('C Total', 'Total', 'Grade', 'Marker Notes');
  return headers;
}

function setMarkingFormulas_(sheet, rowIndex, headers) {
  const idx = name => headers.indexOf(name) + 1;
  const a1 = col => columnToLetter_(col) + rowIndex;

  const b1 = a1(idx('B1 Score'));
  const b2 = a1(idx('B2 Score'));
  const bt = a1(idx('B Total'));
  const c1 = a1(idx('C1 Score'));
  const c2 = a1(idx('C2 Score'));
  const ct = a1(idx('C Total'));
  const as = a1(idx('A Score'));
  const total = a1(idx('Total'));

  sheet.getRange(rowIndex, idx('B Total')).setFormula(`=IF(OR(${b1}="",${b2}=""),"",SUM(${b1},${b2}))`);
  sheet.getRange(rowIndex, idx('C Total')).setFormula(`=IF(OR(${c1}="",${c2}=""),"",SUM(${c1},${c2}))`);
  sheet.getRange(rowIndex, idx('Total')).setFormula(`=IF(OR(${bt}="",${ct}=""),"",${as}+${bt}+${ct})`);
  sheet.getRange(rowIndex, idx('Grade')).setFormula(`=IF(${total}="","",IF(${total}>=24,"A",IF(${total}>=20,"B",IF(${total}>=15,"C",IF(${total}>=11,"D","E")))))`);
}

function columnToLetter_(column) {
  let temp = '';
  let letter = '';
  while (column > 0) {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}

/* ------------------------------------------------------------------
 * ADMIN / SETUP — run manually from the Apps Script editor only.
 * Names end with _ so student browsers cannot call them via google.script.run.
 * ------------------------------------------------------------------ */

function setupAssessment_() {
  const props = PropertiesService.getScriptProperties();
  const existingId = props.getProperty(STORAGE_PROPERTY);
  if (existingId) {
    const existing = SpreadsheetApp.openById(existingId);
    console.log('Assessment storage already exists: ' + existing.getUrl());
    return existing.getUrl();
  }

  const ss = SpreadsheetApp.create('Charterhouse Almaty - Y7-8 Python Assessment Responses');
  props.setProperty(STORAGE_PROPERTY, ss.getId());

  const sheet = ss.getSheets()[0];
  sheet.setName(RESPONSE_SHEET_NAME);
  const headers = responseHeaders_();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground('#0A2240')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setWrap(true);
  sheet.setRowHeight(1, 42);

  // Default formatting for submission rows: preserve Python code / text exactly.
  sheet.getRange(2, 1, Math.max(1, sheet.getMaxRows() - 1), headers.length).setNumberFormat('@');

  // Score validations used during later marking.
  const validation = (min, max) => SpreadsheetApp.newDataValidation()
    .requireNumberBetween(min, max)
    .setAllowInvalid(false)
    .setHelpText(`Enter a score from ${min} to ${max}.`)
    .build();
  sheet.getRange(2, headers.indexOf('B1 Score') + 1, sheet.getMaxRows() - 1, 1).setDataValidation(validation(0,4));
  sheet.getRange(2, headers.indexOf('B2 Score') + 1, sheet.getMaxRows() - 1, 1).setDataValidation(validation(0,4));
  sheet.getRange(2, headers.indexOf('C1 Score') + 1, sheet.getMaxRows() - 1, 1).setDataValidation(validation(0,4));
  sheet.getRange(2, headers.indexOf('C2 Score') + 1, sheet.getMaxRows() - 1, 1).setDataValidation(validation(0,6));

  // Practical column widths.
  headers.forEach((h, i) => {
    let width = 110;
    if (h.includes('Code')) width = 420;
    else if (h.includes('Output')) width = 320;
    else if (h.includes('Input')) width = 180;
    else if (h === 'First Name' || h === 'Surname') width = 140;
    else if (h === 'Marker Notes') width = 320;
    else if (h.includes('Timestamp') || h.includes('At (client)')) width = 180;
    else if (h.includes('Score') || h === 'Total' || h === 'Grade' || h.includes('Mark')) width = 80;
    sheet.setColumnWidth(i + 1, width);
  });
  sheet.getDataRange().setVerticalAlignment('top');
  sheet.getRange(1, 1, sheet.getMaxRows(), headers.length).createFilter();

  const guide = ss.insertSheet(MARKING_GUIDE_SHEET_NAME);
  const guideRows = [
    ['YEAR 7–8 PYTHON FOUNDATIONS ASSESSMENT', ''],
    ['What to fill in', 'Enter only B1 Score, B2 Score, C1 Score and C2 Score after marking. B Total, C Total, Total and Grade calculate automatically.'],
    ['Section A', 'Marked automatically on submission.'],
    ['B1', '0–4'],
    ['B2', '0–4'],
    ['C1', '0–4'],
    ['C2', '0–6'],
    ['A', '24–30'],
    ['B', '20–23'],
    ['C', '15–19'],
    ['D', '11–14'],
    ['E', '0–10'],
    ['Important', 'Grade bands are provisional. Review after the first cohort and apply any item moderation consistently.'],
    ['Private marking file', 'Use Y78_Attainment_Assessment_v1_MARKING.md for the detailed rubric.']
  ];
  guide.getRange(1,1,guideRows.length,2).setValues(guideRows);
  guide.getRange(1,1,1,2).setBackground('#0A2240').setFontColor('#FFFFFF').setFontWeight('bold');
  guide.setColumnWidth(1, 180);
  guide.setColumnWidth(2, 700);
  guide.getDataRange().setWrap(true).setVerticalAlignment('top');
  guide.setFrozenRows(1);

  console.log('Assessment response spreadsheet: ' + ss.getUrl());
  return ss.getUrl();
}

function storageStatus_() {
  const id = PropertiesService.getScriptProperties().getProperty(STORAGE_PROPERTY);
  if (!id) return 'Not configured';
  return SpreadsheetApp.openById(id).getUrl();
}
