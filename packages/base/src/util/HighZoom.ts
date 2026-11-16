const HIGH_ZOOM_BREAKPOINT = 300; // px — viewport width below which numeric inputs replace clocks

const isHighZoom = () => document.body.offsetWidth < HIGH_ZOOM_BREAKPOINT;

export { isHighZoom };
