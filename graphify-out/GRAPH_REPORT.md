# Graph Report - C:/Users/TempAdmin/Documents/Ngoding/Project/my-bini-kafka  (2026-07-28)

## Corpus Check
- Corpus is ~26,541 words - fits in a single context window. You may not need a graph.

## Summary
- 57 nodes · 59 edges · 8 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Dev Dependencies & Build
- App Shell & Footer
- Runtime Dependencies
- Hero Section
- Skills & Build Guide
- Profile Section
- NavBar

## God Nodes (most connected - your core abstractions)
1. `scripts` - 5 edges
2. `kafka` - 4 edges
3. `vue` - 2 edges
4. `@tailwindcss/vite` - 2 edges
5. `@vitejs/plugin-vue` - 2 edges
6. `gh-pages` - 2 edges
7. `tailwindcss` - 2 edges
8. `vite` - 2 edges
9. `private` - 1 edges
10. `dev` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (8 total, 0 thin omitted)

### Community 0 - "Dev Dependencies & Build"
Cohesion: 0.18
Nodes (11): gh-pages, devDependencies, gh-pages, tailwindcss, @tailwindcss/vite, vite, @vitejs/plugin-vue, tailwindcss (+3 more)

### Community 1 - "App Shell & Footer"
Cohesion: 0.24
Nodes (6): BASE, BASE, el, show, kafka, kafkaFacts

### Community 2 - "Runtime Dependencies"
Cohesion: 0.25
Nodes (7): dependencies, vue, name, private, type, version, vue

### Community 3 - "Hero Section"
Cohesion: 0.25
Nodes (6): BASE, heroRef, imgLoaded, px, py, visible

### Community 4 - "Skills & Build Guide"
Cohesion: 0.29
Nodes (6): activeLc, BASE, el, loop, show, skillColor

### Community 5 - "Profile Section"
Cohesion: 0.33
Nodes (4): BASE, isOpen, links, scrolled

### Community 6 - "NavBar"
Cohesion: 0.40
Nodes (5): scripts, build, deploy, dev, preview

## Knowledge Gaps
- **35 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+30 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Dev Dependencies & Build` to `Runtime Dependencies`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Why does `scripts` connect `NavBar` to `Runtime Dependencies`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _35 weakly-connected nodes found - possible documentation gaps or missing edges._