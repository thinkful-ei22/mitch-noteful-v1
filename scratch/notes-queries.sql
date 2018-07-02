SELECT * FROM notes;
SELECT * FROM notes LIMIT 5;
SELECT * FROM notes ORDER BY title ASC;
SELECT * FROM notes ORDER BY date DESC;
SELECT * FROM notes WHERE title = 'Mrazek to Hurricanes';
SELECT * FROM notes WHERE title LIKE '%to%';
UPDATE notes SET title = 'Mrazek to Carolina' WHERE title = 'Mrazek to Hurricanes';
INSERT INTO notes (title, content) VALUES ('Bruins Sign Halak', 'Boston Signs veteran Jaroslav Halak to 2 year deal.');
DELETE FROM notes WHERE id='11';