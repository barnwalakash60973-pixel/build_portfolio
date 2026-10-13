# Akash Kumar Barnwal — Portfolio

Personal portfolio site. React (Create React App) + Tailwind CSS + Framer Motion.

## Run it

```bash
npm install
npm start      # dev server on http://localhost:3000
npm test       # test suite
npm run build  # production bundle in build/
```

## Where things live

| File | What it holds |
| --- | --- |
| `src/App.js` | All content (projects, capabilities, education) and all components |
| `src/index.css` | Base styles, focus rings, marquee animation, reduced-motion rules |
| `tailwind.config.js` | Colour and type tokens (`ink`, `accent`, `line`, `paper`…) |
| `public/index.html` | Meta tags, Open Graph, font loading |
| `public/profile.png` | Profile photo, also used as the favicon and OG image |

To add a project, append an object to the `PROJECTS` array at the top of `src/App.js`.
Setting `featured: true` promotes it to the large dark card; only one project should
carry that flag.

## Deploying

Any static host works. Build with `npm run build` and serve the `build/` folder.
On Netlify or Vercel, set the build command to `npm run build` and the publish
directory to `build`.
