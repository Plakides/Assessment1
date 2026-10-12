# Charterhouse Almaty — Y7–8 Python Attainment Assessment Web App

This package contains the first working version of the online assessment engine for the frozen Year 7–8 assessment.

## Files

- `Code.gs` — Google Apps Script backend, private answer key, Google Sheet setup, auto-marking for Section A, response storage and marking formulas.
- `Index.html` — four-page student assessment UI with browser autosave, Ace code editors and an embedded Python runner using Pyodide.
- `appsscript.json` — Apps Script manifest (Almaty timezone, V8 runtime).

Do **not** upload the private marking markdown or the original full assessment JSON into anything pupils can access. `Code.gs` contains only the Section A answer key on the server. Model solutions and B/C mark schemes are not sent to the browser.

---

# 1. Create the Apps Script project

1. Go to `script.google.com` while signed into the Google account you want to own the response spreadsheet.
2. Create a **New project**.
3. Rename it, e.g. `Charterhouse CS Attainment Assessment`.
4. Replace the default `Code.gs` with the supplied `Code.gs`.
5. Add a new **HTML** file named exactly `Index` and paste in `Index.html`.
6. In **Project Settings**, enable **Show appsscript.json manifest file in editor** if needed, then replace it with the supplied `appsscript.json`.
7. Save all files.

Recommended: use a school-controlled Google Workspace account if school policy permits this use of Google Sheets for pupil assessment data.

---

# 2. Create the private response spreadsheet

1. In the Apps Script editor, select the function `setupAssessment_` from the function dropdown.
2. Click **Run**.
3. Approve the requested Google permissions.
4. Open **Execution log**.
5. The log will contain a line beginning:
   `Assessment response spreadsheet:`
6. Open that URL.

The setup function is idempotent: running it again returns the same spreadsheet rather than creating another one.

The spreadsheet contains:

- `Responses` — one row per pupil submission.
- `Marking Guide` — quick score ranges and grade bands.

Section A is marked automatically. After marking the code, you only type values into:

- `B1 Score` (0–4)
- `B2 Score` (0–4)
- `C1 Score` (0–4)
- `C2 Score` (0–6)

`B Total`, `C Total`, `Total` and `Grade` then calculate automatically.

---

# 3. Deploy the assessment

1. Apps Script → **Deploy** → **New deployment**.
2. Select **Web app**.
3. Description: `Y7-8 Assessment v1`.
4. **Execute as:** `Me`.
5. **Who has access:** choose the least-open option that all pupils can actually use.
   - If the pupils do not have Google accounts and your Workspace policy permits it, this normally needs **Anyone**.
   - If your organisation blocks public Apps Script web apps, use the school-approved account/access option instead.
6. Click **Deploy**.
7. Copy the web app URL.

Students need only this URL. They never receive access to the Google Sheet or Apps Script source.

---

# 4. What pupils see

The app is deliberately one URL with four stages:

1. **Start** — first name, surname, Year 7 / Year 8.
2. **Section A** — 12 MCQs.
3. **Section B** — two debugging tasks with preloaded code editors and Run buttons.
4. **Section C** — two blank coding tasks and final Submit.

The assessment records elapsed time but does **not** auto-submit or lock at 30 minutes. You decide when pupils stop.

---

# 5. Autosave / network protection

Every response is saved in the browser's local storage while the pupil works.

If the page is refreshed or the browser is closed before submission, reopening the web app on the **same computer/browser** offers to resume the unfinished attempt.

After a successful submission, that local copy is deleted.

The final Submit button is retry-safe: if the connection drops after the server has already received the work, retrying with the same submission ID does not create a duplicate row.

Important on shared PCs: an unfinished previous pupil attempt will appear as a Resume/Discard box on the start page. The next pupil should choose **Discard** unless it is genuinely their own work.

---

# 6. Embedded Python runner

The code editor uses **Ace** and the Python runner uses **Pyodide**, loaded from HTTPS CDNs.

- The runner executes Python inside the browser.
- Each Run uses an isolated Python environment, so variables from one question do not leak into another.
- Test input is entered one value per line.
- The test chips fill the supplied assessment test values automatically.
- Pupils may run code as often as they like.

If Ace fails to load, the app falls back to a plain code textarea.

If Pyodide fails to load, pupil code still autosaves and can still be submitted. The Run function will show a clear runner-unavailable message rather than losing work.

Because the school network must download Pyodide, test the real deployment on a pupil PC before assessment day.

---

# 7. Security / answer-key separation

The student browser receives only:

- question text;
- MCQ options;
- starter code;
- public tests.

It does **not** receive:

- `correct_option` values;
- MCQ rationales;
- MCQ misconception notes;
- model solutions;
- B/C mark schemes;
- acceptable alternatives;
- common-error scores.

The MCQ answer key is stored only in `Code.gs` and Section A is scored server-side at submission.

The submission confirmation page does not display the pupil's score.

---

# 8. Response-sheet layout

The `Responses` sheet stores:

- server timestamp;
- submission ID;
- assessment ID;
- first name / surname / year;
- client start/submission time and elapsed seconds;
- A01–A12 selected responses and 1/0 marks;
- automatic Section A score;
- B1/B2/C1/C2 final code;
- last test input and last output for each coding task;
- B1/B2/C1/C2 marking cells;
- automatic B total / C total / overall total / A–E grade;
- marker notes.

This makes later item analysis possible because each Section A response and mark is retained separately.

---

# 9. Mandatory test before using with pupils

Use an incognito/private browser window or a different account where possible.

## Test A — normal complete submission

1. Enter `Test` / `Pupil` / Year 7.
2. Complete several MCQs.
3. Run B1 with `12`.
4. Edit the program and run again.
5. Enter some code in C1/C2.
6. Submit.
7. Confirm exactly one new row appears in `Responses`.
8. Confirm the `A Score` is populated but the student page did not reveal it.

## Test B — refresh/resume

1. Start another fake assessment.
2. Answer several questions and edit B1.
3. Refresh the browser.
4. Confirm the start page offers **Resume this assessment**.
5. Resume and check the answers/code are still present.

## Test C — marking formulas

In the fake response row enter:

- B1 Score = 4
- B2 Score = 4
- C1 Score = 4
- C2 Score = 6

Confirm `B Total`, `C Total`, `Total` and `Grade` calculate automatically.

## Test D — duplicate retry

After a successful fake submission, use browser developer tools only if comfortable, or simply verify normal network retries do not create two rows with the same `Submission ID`.

---

# 10. Before the real assessment

- Test the deployed URL on an actual school pupil PC.
- Check Ace loads.
- Check the Python runner reaches `Python runner: ready`.
- Run a simple `print("hello")` test.
- Check Google Sheet submissions appear promptly.
- Keep the private marking file off the pupil-facing site.
- Have the web app URL ready in Teams or on the board.
- Do not publish the response spreadsheet.

---

# 11. Adding Year 9 later

The backend is already structured around `YEAR_TO_ASSESSMENT` and an assessment ID.

Once the Year 9 question bank is frozen, add:

- Year 9 to the year map;
- a sanitised Year 9 public assessment object;
- the Year 9 Section A server-side answer key;
- routing in `getAssessmentForYear()` / `submitAssessment()`.

The pupil UI, Python runner, autosave, submission pipeline and spreadsheet design do not need to be rebuilt.
