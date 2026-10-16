# Senthil Associates — client requirement update

## Run and build

Use Node.js 24.19 or newer (verified with 24.19). Run `npm ci`, then `npm run dev` for local development.
Run `npm run build` to generate the ready-to-host `out` folder. The supplied Next.js static-export architecture is retained. Static hosts must resolve clean URLs such as `/about` to `/about.html`. Do not open the HTML files by double-clicking them.

## Changes mapped to the client PDF

| Reference | Placement and changes |
| --- | --- |
| Page 1 — Home | Established 2002; Design Your Space Together; Madurai, Sivakasi, Devakottai, Singampunari, Dindigul and Trichy; three gently animated photographs of built projects; architecture, interiors and landscape service scopes. Existing hero animation and section order retained. |
| Page 2 — About | Existing architect profile retained; supplied Client Queries screenshot shown uncropped below the architect/team section, before the final contact call to action; explanatory topics and contact link; 25+ experience, 200+ completed projects, 500+ happy clients, 5+ ongoing projects; four requested process stages. |
| Pages 3–4 — Vengadesh | Existing project URL retained. Corrected client name and Kadachanendal location; 1815 sq.ft site, 2419 sq.ft built-up, 33 ft × 55 ft, south-facing, G+1; all supplied design observations and four reference photographs added. 3D floor-plan illustration added to Projects. |
| Page 5 — Ganesh Kumar | Added a project page with east-facing G+1 residence facts, Nagamalai Pudhukottai location, brick cladding, Vastu, materials, finishes, services, double-height living room, grill walkway, courtyard and terrace details. Exterior and interior reference images included. |
| Page 6 — Anandha Nilayam | Existing Ar. Senthil residence URL retained; Anandha Nilayam name, mixed-use description, Ellis Nagar location and all supplied floor/site facts retained. |
| Page 7 — Exterior gallery | Eight named elevations with locations; Mariyappan marked Ongoing. |
| Page 8 — Interior gallery | Eight interior views; supplied names and locations included. The uncaptioned staircase is labelled descriptively rather than assigned to an invented client. |
| Page 9 — Testimonials / press | Vengadesh Advocate, Lenin Advocate, Dr. Praveen Kumar and Devarajan featured in the existing carousel structure; supplied portraits where available; Dinamalar Kanavu Illam clipping, readable at full size. No fabricated quotations or ratings. |
| Page 10 — Contact | Corrected phone +91 98421 64380; studio address including 625016; email; existing Facebook and Instagram profiles; WhatsApp; Query Form and Career Form. |

## Preservation

Existing routes, homepage section sequence, hero image sequence, isometric journey, brand styling, motion system, project categories and original assets are retained. Gallery is an additive route. Existing project URLs remain valid. Navigation uses its existing compact menu at widths where the added links would crowd the brand. English/Tamil toggle retained, with translations added for new controls and key sections.

## Details awaiting client material

- Ganesh Kumar's site area, site dimensions and built-up areas are blank/placeholder values in the PDF. These were deliberately omitted rather than invented.
- No spoken/written testimonial quotations were supplied. Client spotlights and project descriptions are presented without quotation marks or star ratings.
- Vengadesh and Devarajan portraits were blank in the PDF; project images are used instead.
- The About biography placeholder is filled using the original website's architect information and the PDF's founding year.
- The PDF supplies both the founding year 2002 and experience statistic 25+. Both are reproduced as requested; they should be confirmed by the client if the statistic is intended to mean company age.
- Some new photographs are extracted from the supplied scanned PDF and have its resolution/greyscale appearance. Original high-resolution colour files can replace them later.

## Forms and external services

Both forms validate required fields and open a prefilled email draft addressed to Senthilassociates@yahoo.com. The visitor reviews and sends it in their email app. There is no submission backend, database or automatic email delivery, and the page never claims a message was sent. WhatsApp uses the PDF's corrected phone number. Existing maps and external stock photography require internet access.

## Build compatibility

Static generation uses one worker and keeps the build cache between runs (`cleanDistDir: false`) to avoid Windows directory cleanup/recreation failures. If you later remove routes, manually clear `.next` and `out` before rebuilding to avoid stale output. The supplied export-segment alias helper is retained.

## Verified delivery

- Production compilation and TypeScript checks passed with Node.js 24.19.0 and the supplied Next.js 16.3.7 lockfile.
- All 25 HTML pages generated; all local image and link references in generated HTML resolve.
- Required content checked in generated About, Gallery, Contact, all three detailed client projects and Testimonials pages.
- Browser checks at 390 px and 1440 px: About screenshot layout, Gallery cards and filter, image dialog and Escape close, mobile navigation, English/Tamil controls, and native required-field validation.
- No email or WhatsApp message was sent during testing.
- Existing image-sequence hero, original page order and original assets preserved.
