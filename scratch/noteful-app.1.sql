DROP TABLE IF EXISTS notes;
CREATE TABLE notes(id serial PRIMARY KEY, title text NOT NULL, content text, created DATE NOT NULL DEFAULT now());
ALTER SEQUENCE notes_id_seq RESTART 1000;
INSERT INTO notes (title, content) VALUES ('Tavares to Maple Leafs', 'Center John Tavares has signed a seven-year contract with his hometown Toronto Maple Leafs, lifting him back into the first-round fantasy conversation.'),
('Van Riemsdyk to Flyers', 'Left wing James van Riemsdyk has signed a five-year contract to rejoin the Philadelphia Flyers, where he played his first three NHL seasons.'),
('Hutton to Sabres', 'Goaltender Carter Hutton signed a three-year contract with the Buffalo Sabres, giving them a new No. 1 option for next season.'),
('Thompson deep sleeper after trade', 'Buffalo also acquired right wing Tage Thompson from the St. Louis Blues as part of its return for center Ryan O''Reilly.'),
('Neal to Flames', 'Forward James Neal signed a five-year contractwith the Calgary Flames.'),
('Green re-signs with Red Wings', 'Defenseman Mike Green will be back with the Detroit Red Wings on a two-year contract and should remain fantasy-relevant on their first power-play unit.'),
('Nichushkin back to Stars', 'Right wing Valeri Nichushkin signed a two-year contract to rejoin the Dallas Stars, strengthening their secondary scoring and improving their team fantasy depth.'),
('Mrazek to Hurricanes', 'Goaltender Petr Mrazek has signed a one-year contract with the Carolina Hurricanes.'),
('Blues sign Perron', 'Forward David Perron signed a four-year contract to return to the St. Louis Blues.'),
('Stastny to Golden Knights', 'Center Paul Stastny signed a three-year contract with the Vegas Golden Knights.');		
