# Dots And Boxes

A SPA Dots & Boxes game written in vanilla javascript, accessible, with homemade routing, use Service Worker to set it up as a PWA, use a heuristic algorithm for AI and CSP for security. Project made to learn the fundamentals of JS, Routing, PWA, Security, Accessibility, and Game AI.

<https://dots-boxes.netlify.app/>

## Features

- Written in pure Vanilla Javascript.

- Homemade Routing : use of History Browser API.

- PWA : Caching through Service Worker for offline access.

- CSP for Security, and LightHouse Score of 100.

- Accessibility : light/dark mode, Contrast checked, game playable through Keyboard, LightHouse Score of 90.

- Board Size from 2x2 to 5x5.

- AI made with DCEL, minmax algorithm with Doubly Connected Edge List to hold map data, with Alpha Pruning Heuristic method.

## Bugs to fix

- draw not possible

- service worker not working

- routing, cannot go back on desktop and cannot access game on mobile

- dark mode input color

- mobile disabled input styles

- limit scores to ten bests
